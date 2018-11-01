import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className="Footer">
    <div className="container">
      <div className="Flexbox Footer--Content">
        <div>
          <h3>Opening hours</h3>
          <p>
            Mon - Fri: 8:00am-6:00pm
            <br />
            Sat: 8:00am-1:00pm
            <br />
            Sun and After hours by appointment
          </p>
        </div>
        <div>
          <Image
            className="Footer--Logo"
            src="/images/footerLogo.svg"
            alt="footer logo passion family dental"
          />
        </div>
        <div>
          <h3>Info</h3>
          <p>
            <Link to="/about">About Us</Link>
            <Link to="/patient-info">Patient Info</Link>
            <Link to="/contact">Contact</Link>
          </p>
        </div>
      </div>
      <div className="Footer--Copy Flexbox">
        <div>
          <p>
            © Copyright {new Date().getFullYear()} Passion Damily Dental. Site
            by{' '}
            <a href="https://thriveweb.com.au/" rel="">
              Thrive Digital
            </a>
          </p>
        </div>
        <div>
          <p>
            <Link className="Link" to="/faq">
              FAQ
            </Link>
            <Link className="Link" to="/privacy">
              Privacy
            </Link>
            <Link className="Link" to="/disclaimer">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Image
      className="Figure"
      src="/images/footerFigure.svg"
      alt="footer background figure"
    />
  </footer>
)
