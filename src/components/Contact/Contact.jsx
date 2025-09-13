import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Contact.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import SocialLinks from '../SocialLinks/SocialLinks';

const Contact = ({ data, socialData }) => {
  const { title, text, subTitle } = data;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    try {
      // Submit to FormSubmit service
      const response = await fetch('https://formsubmit.co/anuraggupta14821@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Show success message
        const alertDiv = document.getElementById('st-alert');
        if (alertDiv) {
          alertDiv.innerHTML = '<div style="color: #4CAF50; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 5px; margin-bottom: 20px;">Message sent successfully! Redirecting to home page...</div>';
        }
        
        // Reset form
        e.target.reset();
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const alertDiv = document.getElementById('st-alert');
      if (alertDiv) {
        alertDiv.innerHTML = '<div style="color: #f44336; padding: 10px; background: rgba(244, 67, 54, 0.1); border-radius: 5px; margin-bottom: 20px;">Error sending message. Please try again.</div>';
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="st-dark-bg">
      <div className="st-height-b100 st-height-lg-b80"></div>
      <SectionHeading title="Contact" />
      <div className="container" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <div className="row d-flex">
          <div className="col-lg-6">
            <h3 className="st-contact-title">Just say Hello</h3>
            <div id="st-alert"></div>
            <form
              onSubmit={handleSubmit}
              className="st-contact-form"
              id="contact-form"
            >
              <div className="st-form-field">
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="st-form-field">
                <input type="text" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="st-form-field">
                <input type="text" id="subject" name="subject" placeholder="Your Subject" required />
              </div>
              <div className="st-form-field">
                <textarea cols="30" rows="10" id="msg" name="msg" placeholder="Your Message" required></textarea>
              </div>
              <button 
                className='st-btn st-style1 st-color1' 
                type="submit" 
                id="submit" 
                name="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            <div className="st-height-b0 st-height-lg-b30"></div>
          </div>
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b40"></div>
            <h3 className="st-contact-title">{title}</h3>
            <div className="st-contact-text">{text}</div>
            <div className="st-contact-info-wrap">
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-regular:envelope" />
                </div>
                <div className="st-single-info-details">
                  <h4>Email</h4>
                  <Link to="mailto:anuraggupta8309@gmail.com">anuraggupta8309@gmail.com</Link>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-solid:phone-alt" />
                </div>
                <div className="st-single-info-details">
                  <a href="tel:+919167243580">
                    <h4>Phone</h4>
                    <span>+91 91672 43580</span>
                  </a>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="mdi:location" />
                </div>
                <div className="st-single-info-details">
                  <h4>Address</h4>
                  <span>Jogeshwari West, Mumbai,<br />Maharashtra, India</span>
                </div>
              </div>
              <div className="st-social-info">
                <div className="st-social-text">{subTitle}</div>
                <SocialLinks data={socialData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b100 st-height-lg-b80"></div>
    </section>
  )
}

Contact.propTypes = {
  data: PropTypes.object,
  socialData: PropTypes.array,
}

export default Contact;
