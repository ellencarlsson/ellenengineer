import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2>Kontakta mig</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>Har du en fråga eller vill du diskutera ett projekt?</p>
            <p>Tveka inte att höra av dig!</p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Namn" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Meddelande" rows="5" required></textarea>
            <button type="submit" className="btn btn-primary">Skicka</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
