// ACTIVE NAVIGATION
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 80;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);


// NAVBAR SHADOW
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');

  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)';
  }
});


// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});


// CLOSE MENU ON CLICK
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});


// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  });
});


// SKILL ANIMATION
function animateSkillBars(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 100);
      });

      observer.unobserve(entry.target);
    }
  });
}

const skillObserver = new IntersectionObserver(animateSkillBars, {
  threshold: 0.25
});

document.querySelectorAll('.skills-wrap').forEach(col => {
  skillObserver.observe(col);
});


// FADE ANIMATION
function addFadeObserver() {
  const elements = document.querySelectorAll(
    '.about-inner, .skills-wrap, .project-card, .contact-inner, .section-header'
  );

  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  elements.forEach(el => observer.observe(el));
}

addFadeObserver();


// CONTACT FORM
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = 'red';
      }
    });

    if (!valid) return;

    const btn = this.querySelector('.btn-send');
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Send Message';
      btn.disabled = false;
      this.reset();
      formSuccess.style.display = 'block';
    }, 1500);
  });
}
