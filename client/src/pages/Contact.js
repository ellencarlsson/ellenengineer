import React, { useState } from 'react';
import '../styles/pages/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementera backend submission
    console.log('Form submitted:', formData);
    alert('Tack för ditt meddelande! (Backend kommer implementeras senare)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="page-title">Kontakta mig</h1>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Låt oss prata!</h2>
            <p>
              Har du en fråga, ett projektförslag eller vill bara säga hej?
              Fyll i formuläret så hör jag av mig så snart som möjligt.
            </p>

            <div className="social-links">
              <h3>Hitta mig här</h3>
              <a href="https://github.com/ellencarlsson" target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
              <a href="#linkedin" className="social-link">
                LinkedIn
              </a>
              <a href="mailto:din-email@example.com" className="social-link">
                Email
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Meddelande</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Skicka meddelande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
