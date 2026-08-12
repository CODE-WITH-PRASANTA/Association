import React, { useRef, useState } from 'react'
import './Contact.css'

/* Reusable "clapperboard" mark — used as the section eyebrow logo and
   again as the confirmation icon once a message is sent, so the two
   moments feel like one idea (open the scene / that's a wrap). */
const ClapperMark = ({ className = '', clapped = false }) => (
  <span className={`clapper ${clapped ? 'clapper--clapped' : ''} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 28 24" width="18" height="18" fill="none">
      <g className="clapper__top">
        <path d="M2 8 25 4l1 4-23 4-1-4Z" fill="currentColor" />
        <path d="M4.5 7.4 8 5.6l2.6 2-3.6 1.4-2.5-1.6Z" fill="#0a0a0e" opacity=".55" />
        <path d="M11.5 6 15 4.3l2.6 2-3.6 1.4-2.5-1.7Z" fill="#0a0a0e" opacity=".55" />
        <path d="M18.5 4.6 21.6 3l2.4 2-3.4 1.3-2.1-1.7Z" fill="#0a0a0e" opacity=".55" />
      </g>
      <path
        d="M2 9.5h23a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 20V9.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  </span>
)

const initialForm = { name: '', phone: '', email: '', subject: '', message: '' }

const Contact = ({
  name = 'Nevine Acotanza',
  role = 'Chief Operating Officer',
  bio = 'I am available for collaborations across the industry. Reach out through the desk below or connect directly on set.',
  phone = '+91 99374 68228',
  email = 'ocwa@yahoo.com',
  image = '',
  socials = {
    whatsapp: 'https://wa.me/9937468228',
    call: 'tel:+01234567890',
    youtube: 'https://www.youtube.com/@nanditacreation-h8s',
  },
  onSubmitMessage,
}) => {
  const frameRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleMouseMove = (e) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const maxTilt = 10
    setTilt({
      rx: (0.5 - py) * maxTilt * 2,
      ry: (px - 0.5) * maxTilt * 2,
    })
    setGlow({ x: px * 100, y: py * 100 })
  }

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0 })
    setGlow({ x: 50, y: 50 })
  }

  const handleChange = (e) => {
    const { name: field, value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (data) => {
    const next = {}
    if (!data.name.trim()) next.name = 'Enter your name'
    if (!data.email.trim()) {
      next.email = 'Enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Enter a valid email'
    }
    if (!data.message.trim()) next.message = 'Add a short message'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      if (onSubmitMessage) {
        await onSubmitMessage(form)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1100))
      }
      setStatus('sent')
      setForm(initialForm)
      setTimeout(() => setStatus('idle'), 3200)
    } catch (err) {
      setStatus('error')
      setErrors((prev) => ({ ...prev, form: 'Something went wrong. Please try again.' }))
    }
  }

  const isSending = status === 'sending'
  const isSent = status === 'sent'

  return (
    <section className="contact">
      <div className="contact__backdrop" aria-hidden="true">
        <span className="contact__beam contact__beam--one"></span>
        <span className="contact__beam contact__beam--two"></span>
      </div>

      <header className="contact__header">
        <p className="contact__eyebrow">
          <ClapperMark className="contact__eyebrow-mark" />
          Contact
        </p>
        <h2 className="contact__title">
          Let&rsquo;s Connect <span className="contact__title-accent">On Set</span>
        </h2>
      </header>

      <div className="contact__grid">
        {/* Profile Card */}
        <div className="contact__profile">
          <div
            ref={frameRef}
            className="contact__profile-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              '--glow-x': `${glow.x}%`,
              '--glow-y': `${glow.y}%`,
            }}
          >
            <span className="contact__sprockets contact__sprockets--top" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </span>

            <div className="contact__profile-image-wrap">
              {image ? (
                <img src={image} alt={name} className="contact__profile-image" />
              ) : (
                <div className="contact__profile-image contact__profile-image--placeholder">
                  <span className="reel" aria-hidden="true">
                    <svg viewBox="0 0 100 100" width="64" height="64">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" opacity=".55" />
                      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
                      {[0, 72, 144, 216, 288].map((deg) => {
                        const rad = (deg * Math.PI) / 180
                        const cx = 50 + Math.cos(rad) * 27
                        const cy = 50 + Math.sin(rad) * 27
                        return <circle key={deg} cx={cx} cy={cy} r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
                      })}
                    </svg>
                  </span>
                  <span className="reel-caption">Portrait coming soon</span>
                </div>
              )}
              <span className="contact__profile-shine" aria-hidden="true"></span>
            </div>

            <span className="contact__sprockets contact__sprockets--bottom" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i>
            </span>
          </div>

          <div className="contact__profile-info">
            <h3 className="contact__name">{name}</h3>
            <p className="contact__role">{role}</p>
            <p className="contact__bio">{bio}</p>

            <ul className="contact__meta">
              <li className="contact__meta-item">
                <span className="contact__meta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <path
                      d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{phone}</span>
              </li>
              <li className="contact__meta-item">
                <span className="contact__meta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span>{email}</span>
              </li>
            </ul>

            <div className="contact__socials">
              <p className="contact__socials-label">Connect With Me</p>
              <div className="contact__socials-row">
                {/* WhatsApp */}
                {socials.whatsapp && (
                  <a
                    className="contact__social-link contact__social-link--whatsapp"
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.333 5.002L2 22l5.129-1.343a9.98 9.98 0 0 0 4.883 1.28h.004c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.038-5.174-2.924-7.06A9.92 9.92 0 0 0 12.012 2zm0 18.286h-.003a8.3 8.3 0 0 1-4.237-1.164l-.304-.18-3.148.824.84-3.067-.198-.315a8.29 8.29 0 0 1-1.272-4.398c0-4.577 3.724-8.3 8.302-8.3 2.217 0 4.301.864 5.867 2.43 1.567 1.567 2.429 3.651 2.428 5.868 0 4.578-3.724 8.302-8.285 8.302zm4.551-6.216c-.25-.125-1.478-.729-1.707-.812-.229-.084-.396-.125-.562.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063a6.85 6.85 0 0 1-2.01-1.238 7.55 7.55 0 0 1-1.392-1.733c-.146-.25-.015-.385.11-.509.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.429l-.48-.008c-.166 0-.437.063-.666.313-.229.25-.875.854-.875 2.083 0 1.229.896 2.417 1.02 2.583.125.167 1.763 2.693 4.272 3.776.597.257 1.064.411 1.428.526.6.19 1.146.163 1.577.099.48-.071 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.167-.479-.292z"/>
                    </svg>
                  </a>
                )}

                {/* Direct Call */}
                {socials.call && (
                  <a
                    className="contact__social-link contact__social-link--call"
                    href={socials.call}
                    aria-label="Call Direct"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </a>
                )}

                {/* YouTube */}
                {socials.youtube && (
                  <a
                    className="contact__social-link contact__social-link--youtube"
                    href={socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Channel"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="contact__form-panel">
          <span className="contact__form-glow" aria-hidden="true"></span>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">Your Name</label>
                <input
                  className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Purna Chandra Behera"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isSending}
                />
                <span className="contact__field-line" aria-hidden="true"></span>
                {errors.name && <p className="contact__error">{errors.name}</p>}
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-phone">Phone Number</label>
                <input
                  className="contact__input"
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 99374 68228"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isSending}
                />
                <span className="contact__field-line" aria-hidden="true"></span>
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-email">Email</label>
              <input
                className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isSending}
              />
              <span className="contact__field-line" aria-hidden="true"></span>
              {errors.email && <p className="contact__error">{errors.email}</p>}
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-subject">Subject</label>
              <input
                className="contact__input"
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Membership enquiry"
                value={form.subject}
                onChange={handleChange}
                disabled={isSending}
              />
              <span className="contact__field-line" aria-hidden="true"></span>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">Your Message</label>
              <textarea
                className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={handleChange}
                disabled={isSending}
              ></textarea>
              <span className="contact__field-line" aria-hidden="true"></span>
              {errors.message && <p className="contact__error">{errors.message}</p>}
            </div>

            <button
              className={`contact__submit ${isSent ? 'contact__submit--sent' : ''}`}
              type="submit"
              disabled={isSending}
            >
              {isSent ? (
                <>
                  <ClapperMark clapped className="contact__submit-icon" />
                  <span>That&rsquo;s a Wrap — Sent!</span>
                </>
              ) : isSending ? (
                <>
                  <span className="contact__spinner" aria-hidden="true"></span>
                  <span>Sending&hellip;</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="contact__submit-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            {errors.form && <p className="contact__error contact__error--form">{errors.form}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact