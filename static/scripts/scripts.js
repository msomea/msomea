// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");

// Right panel toggle
document.addEventListener("DOMContentLoaded", () => {
  const rightPanel = document.getElementById("rightPanel");
  const mobilePanelToggle = document.getElementById("mobilePanelToggle");

  if (mobilePanelToggle) {
    mobilePanelToggle.addEventListener("click", () => {
      rightPanel.classList.toggle("show");
    });
  }
});


// Scroll progress
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");
  const skillsSection = document.getElementById("skills");
  const skillsLink = document.getElementById("skillsLink");
  const animationDuration = 1200; // in ms, same as CSS transition duration

  function animateSkills() {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  function resetSkills() {
    progressBars.forEach(bar => {
      bar.style.width = "0";
    });
  }

  // Animate on scroll once as before
  let animatedOnScroll = false;
  function animateOnScroll() {
    const triggerPoint = window.innerHeight * 0.85;
    if (!animatedOnScroll && skillsSection.getBoundingClientRect().top < triggerPoint) {
      animateSkills();
      animatedOnScroll = true;
    }
  }
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Animate on skills link click (reset then animate again)
  skillsLink.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default jump, smooth scroll below instead

    // Scroll smoothly to skills section
    skillsSection.scrollIntoView({ behavior: "smooth" });

    // Reset progress bars width
    resetSkills();

    // Animate after a short delay (allow reset to apply)
    setTimeout(() => {
      animateSkills();
    }, 50); // 50ms delay works well for resetting styles
  });
});


// Scroll reveal & animations
const sections = document.querySelectorAll(".section");
const progressBars = document.querySelectorAll(".progress");
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;

  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < triggerPoint) {
      sec.classList.add("visible");
    }
  });

  const skillsSection = document.getElementById("skills");
  if (skillsSection.getBoundingClientRect().top < triggerPoint) {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  const achievementsSection = document.getElementById("achievements");
  if (!counterStarted && achievementsSection.getBoundingClientRect().top < triggerPoint) {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let startTime = null;
      const duration = 3000;

      function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * target);

        counter.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(update);
    });
    counterStarted = true;
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Contact form with EmailJS (placeholder)
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("formStatus").innerText = "✅ Message sent (demo)";
  this.reset();
});

// Carousel in Graphic design
document.querySelectorAll('.carousel').forEach(carousel => {
  const imagesContainer = carousel.querySelector('.carousel-images');
  const images = imagesContainer.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -(currentIndex * 100);
    imagesContainer.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });
});
