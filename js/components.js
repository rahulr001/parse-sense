// Shared components loader for ParseSense website

// Navigation HTML
const navigationHTML = `
<nav id="navbar">
    <div class="nav-container">
        <a href="index.html" class="logo-container">
            <div class="logo-icon">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:var(--accent-mint)"/>
                            <stop offset="50%" style="stop-color:var(--primary)"/>
                            <stop offset="100%" style="stop-color:var(--accent-sage)"/>
                        </linearGradient>
                    </defs>
                    <path d="M 35 30 L 20 50 L 35 70" stroke="url(#logoGrad)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M 46 35 L 54 65" stroke="url(#logoGrad)" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M 65 30 L 80 50 L 65 70" stroke="url(#logoGrad)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="logo-text">ParseSense</span>
        </a>
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="nav-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="features.html">Features</a></li>
            <li><a href="how-it-works.html">How it Works</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="use-cases.html">Use Cases</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="https://console.parsesense.com" class="nav-cta">Console →</a></li>
        </ul>
    </div>
</nav>
`;

// Footer HTML
const footerHTML = `
<footer>
    <div class="footer-content">
        <div class="footer-brand">
            <div class="footer-logo">
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 35 30 L 20 50 L 35 70 M 46 35 L 54 65 M 65 30 L 80 50 L 65 70" stroke="url(#logoGrad)" stroke-width="8" fill="none" stroke-linecap="round"/>
                </svg>
                <span>ParseSense</span>
            </div>
            <p>Intelligent web scraping and AI data pipelines. Transform any website into structured, production-ready data instantly.</p>
            <div class="social-links">
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="GitHub">⌘</a>
            </div>
        </div>

        <div class="footer-section">
            <h4>Product</h4>
            <ul>
                <li><a href="features.html">Features</a></li>
                <li><a href="how-it-works.html">How it Works</a></li>
                <li><a href="use-cases.html">Use Cases</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="roadmap.html">Roadmap</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>Company</h4>
            <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="/careers">Careers</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>Legal</h4>
            <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/security">Security</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2026 Arithemiq. All rights reserved.</p>
    </div>
</footer>
`;

// Function to load navigation
function loadNavigation() {
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    navPlaceholder.innerHTML = navigationHTML;
    highlightActiveNav();
  }
}

// Function to load footer
function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }
}

// Highlight active navigation item
function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.remove("active");

    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (href === "index.html" && (currentPage === "" || currentPage === "/"))
    ) {
      link.classList.add("active");
    }
  });
}

// Load components when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadNavigation();
    loadFooter();
  });
} else {
  loadNavigation();
  loadFooter();
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { loadNavigation, loadFooter, highlightActiveNav };
}
