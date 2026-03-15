import { useEffect, useState, useRef } from 'react';

import videoSrc from '../El-gante Video.mp4';
import photoSrc from '../El-gante Photo.png';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  const observerRef = useRef(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">El-gante</div>
        <a href="#purchase" className="nav-btn">Shop Now</a>
      </nav>

      <header className="hero">
        <video 
          className="hero-video" 
          autoPlay 
          muted 
          playsInline 
          loop
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title fade-up">Unveil Your Elegance</h1>
          <p className="hero-subtitle fade-up delay-1">A flat, minimal approach to modern fragrance.</p>
        </div>
      </header>

      <section className="marketing">
        <div className="container">
          <div className="marketing-grid">
            <div className="marketing-image-wrapper reveal">
              <img src={photoSrc} alt="El-gante Perfume Bottle" className="marketing-image" />
            </div>
            <div className="marketing-copy reveal">
              <h2 className="section-title">Pure. Timeless. Exquisite.</h2>
              <p className="section-text">
                El-gante strips away the unnecessary, leaving only the purest essence of sophistication. 
                Crafted for the modern individual who speaks volumes without saying a word. 
                Experience a symphony of notes that balance flat, clean aesthetics with deep, resounding character.
              </p>
              <ul className="features-list">
                <li><span>&#10003;</span> Minimalist Composition</li>
                <li><span>&#10003;</span> Long-lasting Essence</li>
                <li><span>&#10003;</span> Sustainably Sourced</li>
              </ul>
              <div id="purchase" className="cta-wrapper">
                <button className="btn-primary">Acquire El-gante</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-logo">El-gante</h3>
          <p className="footer-text">&copy; 2026 El-gante Fragrances. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App;
