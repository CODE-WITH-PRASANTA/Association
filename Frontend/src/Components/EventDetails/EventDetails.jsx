import React, { useState } from "react";
import "./EventDetails.css";

/**
 * EventDetails
 * -----------------------------------------------------------------------
 * A single-page "press release" layout for a cinema/film-fraternity
 * announcement — built for All Indian Cine Workers Association (AICWA).
 *
 * Structure:
 *   1. .event-details__hero      – full-bleed sprocket-framed hero + title
 *   2. .event-details__body      – editorial article content
 *   3. .event-details__form      – "send your congratulations" ticket form
 *
 * All class names are namespaced with `event-details__` so this component
 * can be dropped into any project without style collisions.
 * -----------------------------------------------------------------------
 */

const Sprocket = ({ count = 14 }) => (
  <div className="event-details__sprocket" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="event-details__sprocket-hole" />
    ))}
  </div>
);

const EventDetails = () => {
  const [form, setForm] = useState({ name: "", email: "", website: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.comment) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setForm({ name: "", email: "", website: "", comment: "" });
  };

  return (
    <article className="event-details">
      {/* ============================= HERO ============================= */}
      <section className="event-details__hero">
        <Sprocket />
        <div className="event-details__hero-frame">
          <div className="event-details__hero-scene">
            <div className="event-details__spotlight event-details__spotlight--one" />
            <div className="event-details__spotlight event-details__spotlight--two" />

            <div className="event-details__slate">
              <div className="event-details__slate-top">
                <span>AICWA</span>
                <span>PRODUCTION №118</span>
              </div>
              <div className="event-details__slate-stripes" />
            </div>

            <p className="event-details__eyebrow">All Indian Cine Workers Association</p>
            <h2 className="event-details__hero-tagline">Cine Workers First</h2>
          </div>
        </div>
        <Sprocket />

        <div className="event-details__meta-row">
          <span className="event-details__date">
            <span className="event-details__date-dot" />
            26 August, 2021
          </span>
          <span className="event-details__ref">Ref. AICWA / 118 / 2021</span>
        </div>

        <h1 className="event-details__title">
          Purna Behera Takes the Chair as <span>General Secretary — Odisha</span>
        </h1>
        <p className="event-details__subtitle">
          AICWA welcomes a new torchbearer to lead, coordinate and champion the film
          fraternity across Odisha.
        </p>
      </section>

      {/* ============================= BODY ============================= */}
      <section className="event-details__body">
        <div className="event-details__divider">
          <Sprocket count={22} />
        </div>

        <div className="event-details__lede">
          <span className="event-details__drop-cap">W</span>
          <p>
            e are pleased to announce that Mr. Purna Behera has been appointed
            General Secretary – Odisha of the All Indian Cine Workers Association
            (AICWA), effective 26th August 2021. The appointment marks a new
            chapter for the Association&rsquo;s presence in the state, bringing
            fresh energy to its mission of standing beside every cine worker,
            cine artist and associate in the film fraternity.
          </p>
        </div>

        <div className="event-details__grid">
          <div className="event-details__column">
            <h3 className="event-details__heading">
              <span className="event-details__heading-mark">01</span>
              A Welcome, and a Charge
            </h3>
            <p>
              In extending the appointment, AICWA President Er. Suresh Shyamlal
              Gupta welcomed Mr. Behera into the association, noting the
              confidence placed in his ability to manage and coordinate with
              members across the Odisha film community. The role calls for
              steady hands: liaising with artists, resolving on-ground concerns,
              and keeping the Association&rsquo;s Odisha chapter connected to its
              national mission.
            </p>
            <p>
              It is a responsibility built on trust — the kind earned through
              years spent among the people who keep the reels turning long
              after the credits roll.
            </p>
          </div>

          <aside className="event-details__pullquote">
            <span className="event-details__pullquote-mark">&ldquo;</span>
            <p>
              We are confident that your contribution to the association will
              take this journey towards becoming a global leader for
              benefiting every cine worker, cine artist and associate in the
              film fraternity.
            </p>
            <footer>
              <span className="event-details__pullquote-name">Er. Suresh Shyamlal Gupta</span>
              <span className="event-details__pullquote-role">President, AICWA</span>
            </footer>
          </aside>
        </div>

        <div className="event-details__grid event-details__grid--reverse">
          <div className="event-details__column">
            <h3 className="event-details__heading">
              <span className="event-details__heading-mark">02</span>
              Why Odisha, Why Now
            </h3>
            <p>
              Odisha&rsquo;s film industry has been quietly building momentum —
              more productions, more crews, more artists stepping in front of
              and behind the camera. A dedicated General Secretary gives that
              growing community a single, accountable point of contact within
              AICWA: someone to raise concerns to, organise through, and grow
              alongside.
            </p>
            <p>
              Mr. Behera takes on the post from Sanabad, Pichikulli, in the
              Bolagarh block of Khorda district — grounding the appointment in
              the very region it is meant to serve.
            </p>
          </div>

          <div className="event-details__stat-card">
            <div className="event-details__stat-row">
              <span className="event-details__stat-label">Appointed</span>
              <span className="event-details__stat-value">26.08.2021</span>
            </div>
            <div className="event-details__stat-row">
              <span className="event-details__stat-label">Position</span>
              <span className="event-details__stat-value">General Secretary, Odisha</span>
            </div>
            <div className="event-details__stat-row">
              <span className="event-details__stat-label">Reference</span>
              <span className="event-details__stat-value">AICWA/118/2021</span>
            </div>
            <div className="event-details__stat-row">
              <span className="event-details__stat-label">Head Office</span>
              <span className="event-details__stat-value">Powai, Mumbai</span>
            </div>
          </div>
        </div>

        <div className="event-details__closing">
          <h3 className="event-details__heading">
            <span className="event-details__heading-mark">03</span>
            A Mutually Fulfilling Reel Ahead
          </h3>
          <p>
            AICWA extends its congratulations to Mr. Purna Behera and looks
            forward to an association that is, in the President&rsquo;s own
            words, mutually beneficial, pleasant and fulfilling. As the
            Odisha chapter finds its footing under new leadership, the
            Association reaffirms its founding promise — cine workers, first.
          </p>
        </div>
      </section>

      {/* ============================= FORM ============================== */}
      <section className="event-details__form-section">
        <div className="event-details__divider">
          <Sprocket count={22} />
        </div>

        <div className="event-details__ticket">
          <div className="event-details__ticket-header">
            <h3>Send Your Congratulations</h3>
            <p>Leave a message for Mr. Purna Behera and the AICWA Odisha chapter.</p>
          </div>

          <form className="event-details__form" onSubmit={handleSubmit} noValidate>
            <div className="event-details__field">
              <input
                type="text"
                name="name"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                className="event-details__input"
                required
              />
              <label className="event-details__label">Name</label>
            </div>

            <div className="event-details__field">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                className="event-details__input"
                required
              />
              <label className="event-details__label">Email</label>
            </div>

            <div className="event-details__field event-details__field--full">
              <input
                type="url"
                name="website"
                placeholder=" "
                value={form.website}
                onChange={handleChange}
                className="event-details__input"
              />
              <label className="event-details__label">Website (optional)</label>
            </div>

            <div className="event-details__field event-details__field--full event-details__field--textarea">
              <textarea
                name="comment"
                placeholder=" "
                value={form.comment}
                onChange={handleChange}
                className="event-details__input event-details__textarea"
                rows={5}
                required
              />
              <label className="event-details__label">Comment</label>
            </div>

            <button type="submit" className="event-details__submit">
              <span>Submit Now</span>
              <svg viewBox="0 0 24 24" fill="none" className="event-details__submit-icon">
                <path d="M4 12h14M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {submitted && (
              <p className="event-details__success" role="status">
                Message sent — thank you for the note!
              </p>
            )}
          </form>

          <div className="event-details__ticket-perf" aria-hidden="true" />
        </div>
      </section>
    </article>
  );
};

export default EventDetails;