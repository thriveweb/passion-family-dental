import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className="Footer">
    <div className="container taCenter">
      <div class="Flexbox">
        <div>
          <h4>Opening hours</h4>
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
            className="Figure"
            src="/images/footerLogo.svg"
            alt="footer logo passion family dental"
          />
        </div>
        <div>
          <h4>Info</h4>
          <Link to="/about">About Us</Link>
          <Link to="/patient-info">Patient Info</Link>
          <Link to="/contact">Contact</Link>
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
          <Link to="/faq">FAQ</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
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
