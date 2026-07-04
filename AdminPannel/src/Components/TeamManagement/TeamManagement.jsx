import React, { useState } from "react";
import "./TeamManagement.css";
import {
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";

const TeamManagement = () => {
  const initialForm = {
    name: "",
    designation: "",
    regdNo: "",
    address: "",
    mobile: "",
    photo: null,
    preview: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [teamList, setTeamList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      photo: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.designation ||
      !formData.regdNo ||
      !formData.address ||
      !formData.mobile ||
      !formData.preview
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...teamList];
      updated[editIndex] = formData;
      setTeamList(updated);
      alert("Team member updated successfully.");
    } else {
      setTeamList([...teamList, formData]);
      alert("Team member added successfully.");
    }

    resetForm();
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this team member?")) {
      const updated = teamList.filter((_, i) => i !== index);
      setTeamList(updated);

      if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEdit = (index) => {
    setFormData(teamList[index]);
    setEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Pagination
  const totalPages = Math.ceil(teamList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = teamList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="TeamManagement">

      <div className="TeamManagement-header">

        <h2>
          <FaUsers />
          Team Management
        </h2>

      </div>

      <div className="TeamManagement-container">

        {/* ===========================
             LEFT FORM
        ============================ */}

        <div className="TeamManagement-formSection">

          <div className="TeamManagement-formCard">

            <h3>
              {editIndex !== null
                ? "Update Team Member"
                : "Add Team Member"}
            </h3>

            <form
              className="TeamManagement-form"
              onSubmit={handleSubmit}
            >

              <div className="TeamManagement-row">

                <div className="TeamManagement-inputGroup">

                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

                <div className="TeamManagement-inputGroup">

                  <label>Designation</label>

                  <input
                    type="text"
                    name="designation"
                    placeholder="Enter Designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="TeamManagement-row">

                <div className="TeamManagement-inputGroup">

                  <label>Registration No</label>

                  <input
                    type="text"
                    name="regdNo"
                    placeholder="Enter Registration Number"
                    value={formData.regdNo}
                    onChange={handleChange}
                  />

                </div>

                <div className="TeamManagement-inputGroup">

                  <label>Mobile Number</label>

                  <input
                    type="text"
                    maxLength="10"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="TeamManagement-inputGroup">

                <label>Address</label>

                <textarea
                  rows="5"
                  name="address"
                  placeholder="Enter Complete Address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              <div className="TeamManagement-inputGroup">

                <label>Upload Photo</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </div>

              {formData.preview && (

                <div className="TeamManagement-imagePreview">

                  <img
                    src={formData.preview}
                    alt="preview"
                  />

                </div>

              )}

              <div className="TeamManagement-btnGroup">

                <button
                  className="TeamManagement-submitBtn"
                  type="submit"
                >
                  {editIndex !== null
                    ? "Update Team Member"
                    : "Add Team Member"}
                </button>

                <button
                  type="button"
                  className="TeamManagement-resetBtn"
                  onClick={resetForm}
                >
                  Reset
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* ===========================
             RIGHT TABLE
        ============================ */}

        <div className="TeamManagement-tableSection">

          <div className="TeamManagement-tableCard">

            <h3>Team Members List</h3>

            <div className="TeamManagement-tableWrapper">

              <table className="TeamManagement-table">

                <thead>

                  <tr>

                    <th>Photo</th>

                    <th>Name</th>

                    <th>Designation</th>

                    <th>Regd No</th>

                    <th>Address</th>

                    <th>Mobile</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {currentData.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="TeamManagement-noData"
                      >
                        No Team Members Available
                      </td>

                    </tr>

                  ) : (
                    currentData.map((member, index) => {
                      const actualIndex =
                        startIndex + index;

                      return (
                                                <tr key={actualIndex}>

                          <td>

                            <img
                              src={member.preview}
                              alt={member.name}
                              className="TeamManagement-tableImage"
                            />

                          </td>

                          <td>{member.name}</td>

                          <td>{member.designation}</td>

                          <td>{member.regdNo}</td>

                          <td>{member.address}</td>

                          <td>{member.mobile}</td>

                          <td>

                            <div className="TeamManagement-actionButtons">

                              <button
                                className="TeamManagement-editBtn"
                                onClick={() => handleEdit(actualIndex)}
                              >
                                <FaEdit />
                              </button>

                              <button
                                className="TeamManagement-deleteBtn"
                                onClick={() => handleDelete(actualIndex)}
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    })
                  )}

                </tbody>

              </table>

            </div>

            {/* =============================
                  PAGINATION
            ============================== */}

            {teamList.length > 0 && (

              <div className="TeamManagement-pagination">

                <button
                  className="TeamManagement-pageBtn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  <FaChevronLeft />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => (
                    <button
                      key={i}
                      className={`TeamManagement-pageBtn ${
                        currentPage === i + 1
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(i + 1)
                      }
                    >
                      {i + 1}
                    </button>
                  )
                )}

                <button
                  className="TeamManagement-pageBtn"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  <FaChevronRight />
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default TeamManagement;