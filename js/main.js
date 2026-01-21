// Main JavaScript functionality for ParseSense website

// Navbar scroll effect
const navbar = document.getElementById("navbar");

if (navbar) {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".feature-card, .use-case-card, .soon-card, .slide-up"
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(el);
});

// Active navigation highlighting
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Remove active class from all
    link.classList.remove("active");

    // Add active class to current page
    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (currentPage === "index.html" && href === "/")
    ) {
      link.classList.add("active");
    }

    // Handle hash links on same page
    if (href.startsWith("#") && currentPage === "index.html") {
      link.classList.add("active");
    }
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded", setActiveNav);

// Mobile menu toggle (for future implementation)
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// Debounce utility for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
  // Add any scroll-based functionality here
}, 100);

window.addEventListener("scroll", handleScroll);

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Parallax effect for hero orbs (subtle)
if (window.innerWidth > 768) {
  window.addEventListener(
    "mousemove",
    debounce((e) => {
      const orbs = document.querySelectorAll(".hero-gradient-orb");
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        const x = (mouseX - 0.5) * 50 * speed;
        const y = (mouseY - 0.5) * 50 * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    }, 50)
  );
}

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.classList.add("reduced-motion");
}

// Lazy load images (if any are added later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("ParseSense website loaded successfully! 🚀");
