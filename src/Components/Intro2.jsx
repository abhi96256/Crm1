import React, { useEffect, useRef } from "react";
import "./Intro2.css";
import singleImage from "../assets/image.png";
import ellipse1 from "../assets/Ellipse 1.png";
import facebookIcon from "../assets/Facebook.png";
import twitterIcon from "../assets/Twitter.png";
import githubIcon from "../assets/Github.png";
import instagramIcon from "../assets/Instagram.png";

const Intro2 = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Section is visible! Adding animation...');
            // Add animation class to highlights when section is visible
            const highlights = entry.target.querySelectorAll('.highlight');
            console.log('Found highlights:', highlights.length);
            highlights.forEach((highlight, index) => {
              setTimeout(() => {
                highlight.classList.add('animate');
                console.log(`Added animate class to highlight ${index}`);
              }, index * 200); // Stagger the animation
            });
          } else {
            console.log('Section is not visible, removing animation...');
            // Remove animation when section is not visible
            const highlights = entry.target.querySelectorAll('.highlight');
            highlights.forEach((highlight) => {
              highlight.classList.remove('animate');
            });
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Manual scroll event as backup
    const handleScroll = () => {
      const section = featuresRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const highlights = section.querySelectorAll('.highlight');
          highlights.forEach((highlight, index) => {
            if (!highlight.classList.contains('animate')) {
              setTimeout(() => {
                highlight.classList.add('animate');
                console.log(`Manual scroll: Added animate class to highlight ${index}`);
              }, index * 200);
            }
          });
        }
      }
    };

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
      console.log('Observer started for features section');
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="intro2-container">
      {/* Features Section */}
      <div className="features-section" ref={featuresRef}>
        <div className="features-intro">
          <p className="features-text">
            You've used and Know the basics. Now it's time to <span className="highlight">Master it</span> Unlock <span className="highlight">Full potential</span>
          </p>
        </div>
        
        <div className="single-image-container">
          <img src={singleImage} alt="Feature" className="single-image" />
        </div>
        
        <div className="pipeline-section">
          <h2 className="pipeline-title">Customize Your Pipeline</h2>
          <img src="/src/assets/image 15.png" alt="Pipeline customization" className="pipeline-image" />
          
          <div className="pricing-section">
            <h2 className="pricing-title">Choose the plan that's right for you</h2>
            <p className="pricing-subtitle">Start your 7 days free trail. No credit card required v. Then choose a suitable pain.</p>
            
            <div className="pricing-cards">
              <div className="pricing-card starter">
                <h3 className="plan-name">Starter</h3>
                <p className="plan-price">Free/A week</p>
                <button className="get-started-btn">Get Started</button>
                <ul className="features-list">
                  <li>✓ Upto 2 users</li>
                  <li>✓ Limited Integration</li>
                  <li>✓ Basic interaction</li>
                </ul>
              </div>
              
              <div className="pricing-card professional">
                <div className="popular-tag">
                  <img src="/src/assets/Vector 1.png" alt="tag background" className="tag-bg" />
                  <span className="tag-text">Popular</span>
                </div>
                <h3 className="plan-name">Professional</h3>
                <p className="plan-price">₹999/A week</p>
                <button className="get-started-btn">Get Started</button>
                <ul className="features-list">
                  <li>✓ Unlimited user</li>
                  <li>✓ Full Integration</li>
                  <li>✓ Advance reporting</li>
                  <li>✓ Customizable Dashboard</li>
                </ul>
              </div>
              
              <div className="pricing-card enterprise">
                <h3 className="plan-name">Enterprise</h3>
                <p className="plan-price">₹1999/A week</p>
                <button className="get-started-btn">Get Started</button>
                <ul className="features-list">
                  <li>✓ Unlimited user</li>
                  <li>✓ Full Integration</li>
                  <li>✓ Advance reporting</li>
                  <li>✓ Customizable Dashboard</li>
                </ul>
                <button className="more-btn">More</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Section */}
        <footer className="footer">
          <h3 className="contact-title">Contact</h3>
          
          <div className="footer-upper">
            <div className="footer-left">
              <nav className="footer-nav">
                <a href="#" className="footer-link">Home</a>
                <a href="#" className="footer-link">Feature</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">About us</a>
              </nav>
            </div>
            
            <div className="footer-right">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">SCO - 105, 2nd floor world street, Faridabad, HR 121004</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">operation@maydiv.com</span>
                </div>
              </div>
              
              <div className="newsletter-signup">
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Try for free</button>
              </div>
            </div>
          </div>
          
          <div className="footer-lower">
            <div className="footer-left-lower">
              <div className="footer-terms">Term of Services</div>
              <div className="footer-copyright">All rights reserved @MAYDIV infotech</div>
            </div>
            
                          <div className="footer-right-lower">
                <div className="social-icons">
                  <div className="ellipse-container">
                    <img src={ellipse1} alt="Ellipse" className="ellipse-icon" />
                    <img src={facebookIcon} alt="Facebook" className="social-icon-inside" />
                  </div>
                  <div className="ellipse-container">
                    <img src={ellipse1} alt="Ellipse" className="ellipse-icon" />
                    <img src={twitterIcon} alt="Twitter" className="social-icon-inside" />
                  </div>
                  <div className="ellipse-container">
                    <img src={ellipse1} alt="Ellipse" className="ellipse-icon" />
                    <img src={githubIcon} alt="Github" className="social-icon-inside" />
                  </div>
                  <div className="ellipse-container">
                    <img src={ellipse1} alt="Ellipse" className="ellipse-icon" />
                    <img src={instagramIcon} alt="Instagram" className="social-icon-inside" />
                  </div>
                </div>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Intro2;
