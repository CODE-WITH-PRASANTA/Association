import React, { useState, useRef, useMemo, useEffect } from "react";
import "./ArchivePosting.css";
import axios, { IMG_URL } from "../../api/axios";

/* ---------------------------------------------------------
   Icons
--------------------------------------------------------- */
const IconImage = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.2" cy="9" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 16l4.5-4.5 3.2 3.2L15.5 10 21 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
    <path d="M20 20l-3.4-3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconEdit = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M4 20l.9-3.6L16.1 5.2a1.4 1.4 0 0 1 2 0l1.7 1.7a1.4 1.4 0 0 1 0 2L8.6 20.1 4 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14.3 6.9l2.8 2.8" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconTrash = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M5 7h14M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7M18 7l-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconCheck = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M5 13l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconX = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconBox = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3 8l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 8v8l9 4 9-4V8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 12v8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */
const emptyForm = {
  title: "",
  description: "",
  notes: "",
  count: "",
  imageFile: null,
  imagePreview: "",
};

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* ---------------------------------------------------------
   Component
--------------------------------------------------------- */
const ArchivePosting = () => {
  const [archives, setArchives] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isEditing = editingId !== null;

  // --- Fetch Items from Database ---
  const fetchArchives = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/archive");
      if (Array.isArray(response.data)) {
        setArchives(response.data);
      } else if (response.data && Array.isArray(response.data.archives)) {
        setArchives(response.data.archives);
      } else {
        setArchives([]);
      }
    } catch (err) {
      console.error("Error fetching remote archives collection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  // --- Search / Filter Implementation ---
  const filteredArchives = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return archives;
    return archives.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
    );
  }, [archives, searchTerm]);

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clean up older preview blob URL from memory to prevent leaks
    if (form.imagePreview && form.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageFile: file, imagePreview: previewUrl }));
  };

  const handleRemoveImage = () => {
    if (form.imagePreview && form.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    if (form.imagePreview && form.imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // --- Create or Update Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      let payload;
      let headers = {};

      if (form.imageFile) {
        payload = new FormData();
        payload.append("title", form.title.trim());
        payload.append("description", form.description.trim());
        payload.append("notes", form.notes.trim());
        payload.append("count", String(Number(form.count) || 0));
        payload.append("image", form.imageFile);
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        payload = {
          title: form.title.trim(),
          description: form.description.trim(),
          notes: form.notes.trim(),
          count: Number(form.count) || 0,
        };
      }

      if (isEditing) {
        await axios.put(`/archive/${editingId}`, payload, { headers });
      } else {
        await axios.post("/archive", payload, { headers });
      }
      
      resetForm();
      await fetchArchives();
    } catch (err) {
      console.error("Mutation failed during execution handling:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (archive) => {
    setEditingId(archive._id);
    setForm({
      title: archive.title || "",
      description: archive.description || "",
      notes: archive.notes || "",
      count: archive.count !== undefined ? String(archive.count) : "",
      imageFile: null,
      imagePreview: archive.image ? (archive.image.startsWith("http") ? archive.image : `${IMG_URL}/${archive.image}`) : "",
    });
    setErrors({});
  };

  const handleDeleteRequest = (id) => setConfirmDeleteId(id);
  const handleDeleteCancel = () => setConfirmDeleteId(null);
  
  const handleDeleteConfirm = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`/archive/${id}`);
      if (editingId === id) resetForm();
      setConfirmDeleteId(null);
      await fetchArchives();
    } catch (err) {
      console.error("Failed to delete record context:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ArchivePosting">
      <header className="ArchivePosting_header">
        <span className="ArchivePosting_eyebrow">Records &amp; Holdings</span>
        <h1 className="ArchivePosting_title">Archives Management</h1>
        <p className="ArchivePosting_subtitle">
          Register new archive collections and keep the ledger up to date.
        </p>
      </header>

      <div className="ArchivePosting_columns">
        {/* ---------- Left Side: Form Container ---------- */}
        <section className="ArchivePosting_formCard">
          <div className="ArchivePosting_cardHead">
            <h2>{isEditing ? "Update Archive" : "Add Archive"}</h2>
            {isEditing && <span className="ArchivePosting_editingPill">Editing Item</span>}
          </div>

          <form className="ArchivePosting_form" onSubmit={handleSubmit} noValidate>
            <div className="ArchivePosting_formGrid">
              <div className="ArchivePosting_field ArchivePosting_field--span2">
                <label htmlFor="ap-title">
                  Title <span className="ArchivePosting_required">*</span>
                </label>
                <input
                  id="ap-title"
                  type="text"
                  placeholder="Enter Archive Title"
                  value={form.title}
                  onChange={handleFieldChange("title")}
                  className={errors.title ? "is-error" : ""}
                  disabled={isLoading}
                />
                {errors.title && <span className="ArchivePosting_errorText">{errors.title}</span>}
              </div>

              <div className="ArchivePosting_field">
                <label htmlFor="ap-count">No. of Archives</label>
                <input
                  id="ap-count"
                  type="number"
                  min="0"
                  placeholder="Enter Total Count"
                  value={form.count}
                  onChange={handleFieldChange("count")}
                  disabled={isLoading}
                />
              </div>

              <div className="ArchivePosting_field">
                <label htmlFor="ap-notes">Notes</label>
                <input
                  id="ap-notes"
                  type="text"
                  placeholder="Optional Internal Notes"
                  value={form.notes}
                  onChange={handleFieldChange("notes")}
                  disabled={isLoading}
                />
              </div>

              <div className="ArchivePosting_field ArchivePosting_field--span2">
                <label htmlFor="ap-description">
                  Description <span className="ArchivePosting_required">*</span>
                </label>
                <textarea
                  id="ap-description"
                  rows={4}
                  placeholder="Enter Complete Description"
                  value={form.description}
                  onChange={handleFieldChange("description")}
                  className={errors.description ? "is-error" : ""}
                  disabled={isLoading}
                />
                {errors.description && (
                  <span className="ArchivePosting_errorText">{errors.description}</span>
                )}
              </div>

              <div className="ArchivePosting_field ArchivePosting_field--span2">
                <label>Upload Photo</label>
                <input
                  ref={fileInputRef}
                  id="ap-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={isLoading}
                  hidden
                />
                <div className="ArchivePosting_fileRow">
                  <label htmlFor="ap-image" className="ArchivePosting_fileBtn">
                    Choose File
                  </label>

                  {form.imagePreview ? (
                    <span className="ArchivePosting_fileChosen">
                      <img
                        src={form.imagePreview}
                        alt="Selected archive"
                        className="ArchivePosting_fileThumb"
                      />
                      {form.imageFile?.name || "Image loaded"}
                      <button
                        type="button"
                        className="ArchivePosting_fileClear"
                        onClick={handleRemoveImage}
                        disabled={isLoading}
                        aria-label="Remove image"
                      >
                        <IconX className="ArchivePosting_icon" />
                      </button>
                    </span>
                  ) : (
                    <span className="ArchivePosting_fileEmpty">No file chosen</span>
                  )}
                </div>
              </div>
            </div>

            <div className="ArchivePosting_formActions">
              <button 
                type="submit" 
                className="ArchivePosting_btn ArchivePosting_btn--primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : isEditing ? "Update Archive" : "Add Archive"}
              </button>
              <button
                type="button"
                className="ArchivePosting_btn ArchivePosting_btn--danger"
                onClick={resetForm}
                disabled={isLoading}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        {/* ---------- Right Side: Structured List Table ---------- */}
        <section className="ArchivePosting_listCard">
          <div className="ArchivePosting_cardHead">
            <h2>Archive List</h2>
            <div className="ArchivePosting_search">
              <IconSearch className="ArchivePosting_icon" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="ArchivePosting_tableWrap">
            <table className="ArchivePosting_table">
              <thead>
                <tr>
                  <th className="ArchivePosting_colSl">SL</th>
                  <th className="ArchivePosting_colImage">Image</th>
                  <th className="ArchivePosting_colTitle">Title</th>
                  <th className="ArchivePosting_colDesc">Description</th>
                  <th className="ArchivePosting_colCount">Archives</th>
                  <th className="ArchivePosting_colDate">Created</th>
                  <th className="ArchivePosting_colAction">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && filteredArchives.length === 0 ? (
                  <tr className="ArchivePosting_emptyRow">
                    <td colSpan={7}>
                      <div className="ArchivePosting_empty">
                        <div className="ArchivePosting_spinner" style={{ margin: "0 auto 10px" }}></div>
                        <h3>Loading archives from database...</h3>
                      </div>
                    </td>
                  </tr>
                ) : filteredArchives.length === 0 ? (
                  <tr className="ArchivePosting_emptyRow">
                    <td colSpan={7}>
                      <div className="ArchivePosting_empty">
                        <IconBox className="ArchivePosting_emptyIcon" />
                        <h3>{searchTerm ? "No matching archives" : "No archives yet"}</h3>
                        <p>
                          {searchTerm
                            ? "Try a different search query, or reset filters."
                            : "Add your first archive entry using the configuration panel on the left side."}
                        </p>
                        <span className="ArchivePosting_emptyBar">
                          <span className="ArchivePosting_emptyBarFill" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredArchives.map((archive, index) => (
                    <tr key={archive._id || index}>
                      <td data-label="SL">{index + 1}</td>
                      <td data-label="Image">
                        <div className="ArchivePosting_thumb">
                          {archive.image ? (
                            <img 
                              src={archive.image.startsWith("http") ? archive.image : `${IMG_URL}/${archive.image}`} 
                              alt={archive.title} 
                            />
                          ) : (
                            <IconImage className="ArchivePosting_icon" />
                          )}
                        </div>
                      </td>
                      <td data-label="Title">
                        <span className="ArchivePosting_rowTitle">{archive.title}</span>
                      </td>
                      <td data-label="Description">
                        <div className="ArchivePosting_rowDescContainer">
                          {archive.description || <em className="text-muted">No description specified</em>}
                        </div>
                      </td>
                      <td data-label="Archives">
                        <span className="ArchivePosting_countPill">{archive.count || 0}</span>
                      </td>
                      <td data-label="Created">{formatDate(archive.createdAt)}</td>
                      <td data-label="Action">
                        {confirmDeleteId === archive._id ? (
                          <div className="ArchivePosting_confirmRow">
                            <span>Delete?</span>
                            <button
                              type="button"
                              className="ArchivePosting_iconBtn ArchivePosting_iconBtn--confirm"
                              onClick={() => handleDeleteConfirm(archive._id)}
                              disabled={isLoading}
                              aria-label="Confirm delete"
                            >
                              <IconCheck className="ArchivePosting_icon" />
                            </button>
                            <button
                              type="button"
                              className="ArchivePosting_iconBtn"
                              onClick={handleDeleteCancel}
                              disabled={isLoading}
                              aria-label="Cancel delete"
                            >
                              <IconX className="ArchivePosting_icon" />
                            </button>
                          </div>
                        ) : (
                          <div className="ArchivePosting_actions">
                            <button
                              type="button"
                              className="ArchivePosting_iconBtn"
                              onClick={() => handleEdit(archive)}
                              disabled={isLoading}
                              aria-label={`Edit ${archive.title}`}
                            >
                              <IconEdit className="ArchivePosting_icon" />
                            </button>
                            <button
                              type="button"
                              className="ArchivePosting_iconBtn ArchivePosting_iconBtn--danger"
                              onClick={() => handleDeleteRequest(archive._id)}
                              disabled={isLoading}
                              aria-label={`Delete ${archive.title}`}
                            >
                              <IconTrash className="ArchivePosting_icon" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArchivePosting;