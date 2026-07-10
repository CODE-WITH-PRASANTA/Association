import React from "react";
import { Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./TopBar.css";

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FaFacebookF,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://twitter.com",
    Icon: FaTwitter,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: FaLinkedinIn,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com",
    Icon: FaYoutube,
  },
];

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar__sheen" aria-hidden="true"></div>

      <div className="topbar__container">
        {/* Contact Section */}
        <ul className="topbar__contact">
          <li className="topbar__contact-item">
            <a
              className="topbar__contact-link"
              href="mailto:ocwa@yahoo. com"
            >
              <span className="topbar__contact-icon">
                <Mail size={14} strokeWidth={2.2} />
              </span>
              <span className="topbar__contact-text">
                ocwa@yahoo. com
              </span>
            </a>
          </li>

          <li className="topbar__divider" aria-hidden="true"></li>

          <li className="topbar__contact-item">
            <a
              className="topbar__contact-link"
              href="tel:+919937468228"
            >
              <span className="topbar__contact-icon">
                <Phone size={14} strokeWidth={2.2} />
              </span>
              <span className="topbar__contact-text">
                +91 9937468228
              </span>
            </a>
          </li>
        </ul>

        {/* Center Text */}
        <p className="topbar__tagline">
          <span className="topbar__tagline-text">
            All Odisha Cine Workers Association
          </span>
        </p>

        {/* Social Icons */}
        <ul className="topbar__social">
          {socialLinks.map(({ id, label, href, Icon }) => (
            <li key={id} className="topbar__social-item">
              <a
                className={`topbar__social-link topbar__social-link--${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="topbar__sprockets" aria-hidden="true"></div>
    </div>
  );
};

export default TopBar;