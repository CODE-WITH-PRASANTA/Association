import React, { useState } from 'react';
import './OCWA.css';

/* -------------------------------------------------------------------------
   Small inline icon set — kept dependency-free so this component drops into
   any React project without needing an icon library installed.
------------------------------------------------------------------------- */
const Icon = ({ name }) => {
  const paths = {
    functions: 'M4 4h16v4H4zM4 10h10v4H4zM4 16h16v4H4z',
    membership: 'M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z',
    benefits: 'M20 6L9 17l-5-5',
    eligibility: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    fees: 'M4 4h16v16H4z M4 9h16 M9 4v16',
    contact: 'M3 5h18v14H3z M3 5l9 8 9-8',
  };
  return (
    <svg className="ocwa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
};

const ChevronRight = () => (
  <svg className="ocwa-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/* -------------------------------------------------------------------------
   Section content — each section is its own component so it can be reused,
   tested or moved independently of the tab-switcher shell.
------------------------------------------------------------------------- */

const HiveCluster = () => {
  const guilds = [
    { label: 'Lyricists\n& Singers', pos: 'top' },
    { label: 'Cameraman &\nCinematography', pos: 'upper-right' },
    { label: 'Script\nWriters', pos: 'lower-right' },
    { label: 'Makeup\nArtists', pos: 'bottom' },
    { label: 'Debut\nArtists', pos: 'lower-left' },
    { label: 'Spot Boys\n& Crew', pos: 'upper-left' },
  ];
  return (
    <div className="hive" role="img" aria-label="OCWA represents lyricists, singers, cameramen, script writers, makeup artists, debut artists, spot boys and crew of Odisha's film industry">
      <div className="hive__cell hive__cell--center">
        <span>OCWA</span>
      </div>
      {guilds.map((g) => (
        <div className={`hive__cell hive__cell--${g.pos}`} key={g.pos}>
          <span>{g.label.split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</span>
        </div>
      ))}
    </div>
  );
};

const FunctionsSection = () => (
  <section className="ocwa-functions" aria-labelledby="functions-heading">
    <p className="ocwa-eyebrow">What We Do</p>
    <h2 id="functions-heading" className="ocwa-heading">Functions of OCWA</h2>
    <p className="ocwa-lead">
      The Odisha Cine Workers Association (OCWA) is a cohesive, member-first body that
      perennially safeguards the interests, income and dignity of everyone who keeps
      Odisha's film industry — Ollywood — running. From lead performers to lyricists,
      spot boys, cinematographers, musicians, singers and script writers — OCWA unites the
      full spectrum of Odia cinema workers under one professional association built to
      protect their rights.
    </p>
    <p className="ocwa-lead">
      Our core mandate is simple: nurture fellowship and unity among members while
      establishing clear, enforceable professional relations between employer and employee
      across every production, studio and network active in Odisha's entertainment industry.
    </p>

    <HiveCluster />

    <div className="ocwa-callout">
      <p>
        <strong>OCWA</strong> works to bridge the gap between Odia cinema artists, production
        houses, producers, directors, studios, TV networks and web/OTT platforms — stepping
        in whenever a contract or agreement is infringed or disputed, and guiding both sides
        toward a fair, workable resolution.
      </p>
    </div>

    <div className="ocwa-grid ocwa-grid--3">
      <div className="ocwa-mini-card">
        <h3>Contract Protection</h3>
        <p>We review and safeguard member agreements so pay, credit and working terms are honoured in full.</p>
      </div>
      <div className="ocwa-mini-card">
        <h3>Dispute Resolution</h3>
        <p>A dedicated grievance cell mediates conflicts between artists, crew and production houses swiftly.</p>
      </div>
      <div className="ocwa-mini-card">
        <h3>Industry Representation</h3>
        <p>OCWA represents its members' collective voice before studios, guilds and policy makers in Odisha.</p>
      </div>
    </div>
  </section>
);

const MembershipSection = () => (
  <section className="ocwa-membership" aria-labelledby="membership-heading">
    <p className="ocwa-eyebrow">Join The Guild</p>
    <h2 id="membership-heading" className="ocwa-heading">OCWA Membership</h2>
    <p className="ocwa-lead">
      When you're part of <strong>OCWA</strong>, you're part of the strongest full-service
      cultural and film association in Odisha. Our professionals negotiate robust collective
      agreements for Ollywood performers and crew, standing together to make sure engagers
      deliver the pay and protections that were promised — and that every worker's voice is
      heard across Odisha's entertainment industry.
    </p>

    <div className="ocwa-steps">
      <div className="ocwa-step">
        <span className="ocwa-step__num">01</span>
        <div>
          <h3>Submit Your Application</h3>
          <p>Complete the OCWA membership form with your professional details and area of work.</p>
        </div>
      </div>
      <div className="ocwa-step">
        <span className="ocwa-step__num">02</span>
        <div>
          <h3>Verification</h3>
          <p>Our team verifies your industry credentials, work history and supporting documents.</p>
        </div>
      </div>
      <div className="ocwa-step">
        <span className="ocwa-step__num">03</span>
        <div>
          <h3>Approval &amp; ID Card</h3>
          <p>Once approved, you receive your official OCWA membership card and welcome kit.</p>
        </div>
      </div>
      <div className="ocwa-step">
        <span className="ocwa-step__num">04</span>
        <div>
          <h3>Active Membership</h3>
          <p>Access negotiated agreements, welfare support and the full OCWA member network.</p>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => {
  const benefits = [
    { title: 'Legal & Contract Support', text: 'Free guidance on contract terms, disputes and infringement claims.' },
    { title: 'Collective Bargaining', text: 'Stronger pay and working-condition negotiations backed by a united body.' },
    { title: 'Official Recognition', text: 'An OCWA membership card recognised across Odisha studios, sets and productions.' },
    { title: 'Welfare & Emergency Aid', text: 'Support access during medical emergencies, injury or loss of work.' },
    { title: 'Industry Networking', text: 'Direct connections with producers, directors, studios and fellow Odia artists.' },
    { title: 'Grievance Redressal', text: 'A dedicated cell to mediate and resolve workplace disputes fairly.' },
  ];
  return (
    <section className="ocwa-benefits" aria-labelledby="benefits-heading">
      <p className="ocwa-eyebrow">Why Join</p>
      <h2 id="benefits-heading" className="ocwa-heading">Benefits of OCWA</h2>
      <p className="ocwa-lead">
        Membership is designed to give every Odisha cinema worker — on camera and behind it —
        real, usable protection and career advantages, not just a certificate on the wall.
      </p>
      <div className="ocwa-grid ocwa-grid--3">
        {benefits.map((b) => (
          <div className="benefit-card" key={b.title}>
            <Icon name="benefits" />
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const EligibilitySection = () => {
  const groups = [
    'Actors & Performers', 'Lyricists & Singers', 'Musicians & Composers',
    'Script & Dialogue Writers', 'Cameramen & Cinematographers', 'Spot Boys & Set Crew',
    'Makeup Artists & Stylists', 'Choreographers', 'Assistant Directors',
  ];
  return (
    <section className="ocwa-eligibility" aria-labelledby="eligibility-heading">
      <p className="ocwa-eyebrow">Eligibility</p>
      <h2 id="eligibility-heading" className="ocwa-heading">Who Can Join OCWA?</h2>
      <p className="ocwa-lead">
        OCWA welcomes anyone working within Odisha's cinema, television and digital
        entertainment ecosystem. If you contribute to a production in any of the roles
        below, you are eligible to apply.
      </p>
      <ul className="eligibility-list">
        {groups.map((g) => (
          <li key={g}><Icon name="eligibility" />{g}</li>
        ))}
      </ul>
      <div className="ocwa-callout">
        <p>
          Applicants should be able to show proof of active work in the industry —
          a production credit, call sheet, contract or employer reference is usually enough
          to begin the verification process.
        </p>
      </div>
    </section>
  );
};

const FeesSection = () => (
  <section className="ocwa-fees" aria-labelledby="fees-heading">
    <p className="ocwa-eyebrow">Getting Started</p>
    <h2 id="fees-heading" className="ocwa-heading">Fees &amp; Documents</h2>
    <p className="ocwa-lead">
      Membership is kept accessible so cost is never a barrier to protection. Here's what
      you'll need on hand before you apply.
    </p>

    <div className="fee-table" role="table" aria-label="Membership fee structure">
      <div className="fee-table__row fee-table__row--head" role="row">
        <span role="columnheader">Membership Type</span>
        <span role="columnheader">Registration</span>
        <span role="columnheader">Annual Renewal</span>
      </div>
      <div className="fee-table__row" role="row">
        <span data-label="Membership Type">General Member</span>
        <span data-label="Registration">₹1,500</span>
        <span data-label="Annual Renewal">₹500 / year</span>
      </div>
      <div className="fee-table__row" role="row">
        <span data-label="Membership Type">Crew &amp; Technical</span>
        <span data-label="Registration">₹1,000</span>
        <span data-label="Annual Renewal">₹350 / year</span>
      </div>
      <div className="fee-table__row" role="row">
        <span data-label="Membership Type">Senior Artist</span>
        <span data-label="Registration">₹2,000</span>
        <span data-label="Annual Renewal">₹750 / year</span>
      </div>
    </div>

    <h3 className="ocwa-subheading">Documents Required</h3>
    <ul className="doc-list">
      <li>Government-issued photo ID (Aadhaar / PAN / Passport)</li>
      <li>Proof of current address</li>
      <li>Two recent passport-size photographs</li>
      <li>Proof of industry work (contract, credit, call sheet or employer letter)</li>
      <li>Completed OCWA membership application form</li>
    </ul>
  </section>
);

const ContactSection = () => (
  <section className="ocwa-contact" aria-labelledby="contact-heading">
    <p className="ocwa-eyebrow">Get In Touch</p>
    <h2 id="contact-heading" className="ocwa-heading">Contact OCWA</h2>
    <p className="ocwa-lead">
      Have a question about membership, a workplace dispute, or a partnership enquiry?
      Reach out — our team responds to every member and prospective member personally.
    </p>

    <div className="contact-grid">
      <div className="contact-card">
        <h3>Head Office</h3>
        <p>Sanabad,Begunia, District-Khordha, Odisha - 752064, BBSR.</p>
      </div>
      <div className="contact-card">
        <h3>Email</h3>
        <p>ocwa@yahoo. com</p>
      </div>
      <div className="contact-card">
        <h3>Phone</h3>
        <p>+91 99374 68228</p>
      </div>
      <div className="contact-card">
        <h3>Office Hours</h3>
        <p>24HR</p>
      </div>
    </div>

    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <div className="contact-form__row">
        <label>
          Full Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows="4" placeholder="How can we help?" required />
      </label>
      <button type="submit" className="ocwa-btn ocwa-btn--primary">Send Message</button>
    </form>
  </section>
);

/* -------------------------------------------------------------------------
   Tab configuration + shell
------------------------------------------------------------------------- */
const TABS = [
  { id: 'functions', label: 'Functions of OCWA', icon: 'functions', Component: FunctionsSection },
  { id: 'membership', label: 'Membership', icon: 'membership', Component: MembershipSection },
  { id: 'benefits', label: 'Benefits of OCWA', icon: 'benefits', Component: BenefitsSection },
  { id: 'eligibility', label: 'Who Can Join OCWA?', icon: 'eligibility', Component: EligibilitySection },
  { id: 'fees', label: 'Fees & Documents', icon: 'fees', Component: FeesSection },
  { id: 'contact', label: 'Contact OCWA', icon: 'contact', Component: ContactSection },
];

const OCWA = () => {
  const [activeTab, setActiveTab] = useState('functions');
  const Active = TABS.find((t) => t.id === activeTab)?.Component ?? FunctionsSection;

  return (
    <div className="ocwa">
      <header className="ocwa__hero">
        <div className="ocwa__hero-inner">
          <p className="ocwa__hero-eyebrow">Odisha Cine Workers Association</p>
          <h1 className="ocwa__hero-title">OCWA</h1>
          <p className="ocwa__hero-sub">
            Protecting the rights, contracts and livelihoods of Ollywood's actors, lyricists,
            singers, crew, cinematographers and script writers — one united guild for Odisha's
            film industry.
          </p>
        </div>
      </header>

      <div className="ocwa__layout">
        <main className="ocwa__content">
          <Active />
        </main>

        <nav className="ocwa__nav" aria-label="OCWA information sections">
          <ul className="ocwa__nav-list">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  className={`ocwa__nav-item${activeTab === tab.id ? ' ocwa__nav-item--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? 'true' : undefined}
                >
                  <Icon name={tab.icon} />
                  <span>{tab.label}</span>
                  <ChevronRight />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OCWA;