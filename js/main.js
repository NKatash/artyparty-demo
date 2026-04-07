/**
 * ArtyParty — main.js
 * Vanilla JS for: mobile menu, scroll animations, navbar shadow,
 * testimonial carousel dots, WhatsApp pulse cleanup, smooth scroll,
 * hero split slideshow (arrows + swipe), lightbox gallery.
 */

'use strict';

/* =============================================================================
   1. Utility — wait for DOM to be ready
============================================================================= */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();
  initSmoothScroll();
  initTestimonialDots();
  initWhatsAppPulse();
  initHeroSplit();
  initLightbox();
  initContactForm();
});

/* =============================================================================
   2. Mobile Menu
============================================================================= */
function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.navbar__hamburger');
  const closeBtn = document.querySelector('.mobile-menu__close');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.querySelector('.mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (!hamburgerBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-visible');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-visible');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* =============================================================================
   3. Scroll Animations (IntersectionObserver)
============================================================================= */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.fade-in-up').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* =============================================================================
   4. Navbar Shadow Enhancement on Scroll
============================================================================= */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 8) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =============================================================================
   5. Smooth Scroll for Anchor Links
============================================================================= */
function initSmoothScroll() {
  const navbarHeight = 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
}

/* =============================================================================
   6. Testimonial Carousel Dot Indicators (Mobile)
============================================================================= */
function initTestimonialDots() {
  const track = document.querySelector('.testimonials__track');
  const dots = document.querySelectorAll('.testimonials__dot');

  if (!track || !dots.length) return;

  function updateDots() {
    const style = window.getComputedStyle(track);
    if (style.overflowX !== 'scroll') return;

    const cards = track.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach(function (card, index) {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach(function (dot, index) {
      dot.classList.toggle('testimonials__dot--active', index === closestIndex);
    });
  }

  track.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', updateDots, { passive: true });
}

/* =============================================================================
   7. WhatsApp Floating Button — Pulse 3 Times Then Stop
============================================================================= */
function initWhatsAppPulse() {
  const floatBtn = document.querySelector('.whatsapp-float');
  if (!floatBtn) return;

  setTimeout(function () {
    floatBtn.style.animation = 'none';
    floatBtn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.10)';
  }, 4600);
}

/* =============================================================================
   8. Hero Split Slideshow
   Cross-fade image panel, 3800ms hold, 600ms transition.
   Text panel is static — only images rotate.
   RTL-aware swipe and keyboard navigation.
============================================================================= */
function initHeroSplit() {
  const imagePanel = document.querySelector('.hero-split__image');
  if (!imagePanel) return;

  const slides = imagePanel.querySelectorAll('.hero-split__slide');
  const prevBtn = imagePanel.querySelector('.hero-split__arrow--prev');
  const nextBtn = imagePanel.querySelector('.hero-split__arrow--next');

  if (!slides.length) return;

  const TOTAL = slides.length;
  let currentIndex = 0;
  let autoTimer = null;
  let resumeTimer = null;
  let isPaused = false;
  let escapePressed = false;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Navigation ---- */
  function goToSlide(index) {
    // Wrap around
    index = ((index % TOTAL) + TOTAL) % TOTAL;

    // Outgoing slide
    slides[currentIndex].classList.remove('hero-split__slide--active');
    slides[currentIndex].setAttribute('aria-hidden', 'true');

    currentIndex = index;

    // Incoming slide
    slides[currentIndex].classList.add('hero-split__slide--active');
    slides[currentIndex].removeAttribute('aria-hidden');
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  /* ---- Auto-rotation ---- */
  function startAuto() {
    if (prefersReducedMotion || escapePressed) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 3800);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  function pauseAuto() {
    isPaused = true;
    stopAuto();
    clearTimeout(resumeTimer);
  }

  function resumeAfterDelay() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () {
      isPaused = false;
      startAuto();
    }, 500);
  }

  /* ---- Arrow buttons ---- */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      stopAuto();
      resumeAfterDelay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      stopAuto();
      resumeAfterDelay();
    });
  }

  /* ---- Hover pause (desktop) ---- */
  imagePanel.addEventListener('mouseenter', function () {
    pauseAuto();
  });

  imagePanel.addEventListener('mouseleave', function () {
    if (!escapePressed) {
      resumeAfterDelay();
    }
  });

  /* ---- Focus pause (keyboard users) ---- */
  imagePanel.addEventListener('focusin', function () {
    pauseAuto();
  });

  imagePanel.addEventListener('focusout', function (e) {
    // Resume only if focus leaves the entire image panel
    if (!imagePanel.contains(e.relatedTarget)) {
      if (!escapePressed) {
        resumeAfterDelay();
      }
    }
  });

  /* ---- Keyboard navigation (RTL-aware) ---- */
  imagePanel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      // RTL: right = previous (inline-start direction)
      prevSlide();
      stopAuto();
      resumeAfterDelay();
    } else if (e.key === 'ArrowLeft') {
      // RTL: left = next (inline-end direction)
      nextSlide();
      stopAuto();
      resumeAfterDelay();
    } else if (e.key === 'Escape') {
      // Stop auto-rotation for this session
      escapePressed = true;
      stopAuto();
    }
  });

  /* ---- Touch swipe (RTL-aware) ---- */
  var touchStartX = 0;
  var touchStartY = 0;

  imagePanel.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  imagePanel.addEventListener('touchend', function (e) {
    var deltaX = e.changedTouches[0].screenX - touchStartX;
    var deltaY = e.changedTouches[0].screenY - touchStartY;

    // Only trigger if horizontal movement is dominant and > 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe left (finger moves left) = inline-end direction = next in RTL
        nextSlide();
      } else {
        // Swipe right (finger moves right) = inline-start direction = prev in RTL
        prevSlide();
      }
      stopAuto();
      resumeAfterDelay();
    }
  }, { passive: true });

  /* ---- Start auto-rotation after 1000ms initial delay ---- */
  if (!prefersReducedMotion) {
    setTimeout(startAuto, 1000);
  }
}

/* =============================================================================
   9. Lightbox Gallery
   Call openLightbox(imageArray, startIndex) to open.
   imageArray: [{src, alt}, ...]
   Supports keyboard nav, touch swipe, ESC to close.
============================================================================= */

var lightboxState = {
  images: [],
  currentIndex: 0,
  el: null
};

function initLightbox() {
  // Build the lightbox DOM once
  if (document.getElementById('lightbox-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.className = 'lightbox';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'גלריית תמונות');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML =
    '<div class="lightbox__backdrop"></div>' +
    '<div class="lightbox__inner">' +
      '<button class="lightbox__close" aria-label="סגור גלריה">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="תמונה קודמת">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
      '</button>' +
      '<div class="lightbox__image-wrap">' +
        '<img class="lightbox__img" src="" alt="" />' +
      '</div>' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="תמונה הבאה">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
      '</button>' +
      '<div class="lightbox__counter" aria-live="polite"></div>' +
    '</div>';

  document.body.appendChild(modal);
  lightboxState.el = modal;

  // Event bindings
  const backdrop = modal.querySelector('.lightbox__backdrop');
  const closeBtn = modal.querySelector('.lightbox__close');
  const prevBtn = modal.querySelector('.lightbox__nav--prev');
  const nextBtn = modal.querySelector('.lightbox__nav--next');

  backdrop.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);

  // In RTL layout: prev button is on the left visually but means "next" directionally
  // We keep semantic: prev = go to lower index, next = go to higher index
  prevBtn.addEventListener('click', function () { lightboxNavigate(-1); });
  nextBtn.addEventListener('click', function () { lightboxNavigate(1); });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      // RTL: right arrow = previous image (lower index)
      lightboxNavigate(-1);
    } else if (e.key === 'ArrowLeft') {
      // RTL: left arrow = next image (higher index)
      lightboxNavigate(1);
    }
  });

  // Touch swipe support
  var lbTouchStartX = 0;
  var lbTouchEndX = 0;

  modal.addEventListener('touchstart', function (e) {
    lbTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', function (e) {
    lbTouchEndX = e.changedTouches[0].screenX;
    var diff = lbTouchStartX - lbTouchEndX;
    if (Math.abs(diff) > 50) {
      // In RTL: swipe left = next, swipe right = prev
      lightboxNavigate(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  // Wire up gallery trigger elements
  document.querySelectorAll('[data-lightbox-gallery]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const galleryId = this.getAttribute('data-lightbox-gallery');
      const startIndex = parseInt(this.getAttribute('data-lightbox-index') || '0', 10);
      const gallery = window.lightboxGalleries && window.lightboxGalleries[galleryId];
      if (gallery) {
        openLightbox(gallery, startIndex);
      }
    });
  });
}

function openLightbox(imageArray, startIndex) {
  if (!imageArray || !imageArray.length) return;

  lightboxState.images = imageArray;
  lightboxState.currentIndex = startIndex || 0;

  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  lightboxRenderSlide();

  modal.classList.add('lightbox--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus the close button
  const closeBtn = modal.querySelector('.lightbox__close');
  if (closeBtn) {
    setTimeout(function () { closeBtn.focus(); }, 50);
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.classList.remove('lightbox--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  lightboxState.images = [];
  lightboxState.currentIndex = 0;
}

function lightboxNavigate(direction) {
  const total = lightboxState.images.length;
  if (!total) return;
  lightboxState.currentIndex = (lightboxState.currentIndex + direction + total) % total;
  lightboxRenderSlide();
}

function lightboxRenderSlide() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const img = modal.querySelector('.lightbox__img');
  const counter = modal.querySelector('.lightbox__counter');
  const current = lightboxState.images[lightboxState.currentIndex];

  if (img && current) {
    img.src = current.src;
    img.alt = current.alt || '';
  }

  if (counter) {
    counter.textContent = (lightboxState.currentIndex + 1) + ' / ' + lightboxState.images.length;
  }

  // Hide prev/next if only one image
  const prevBtn = modal.querySelector('.lightbox__nav--prev');
  const nextBtn = modal.querySelector('.lightbox__nav--next');
  const single = lightboxState.images.length <= 1;
  if (prevBtn) prevBtn.style.display = single ? 'none' : '';
  if (nextBtn) nextBtn.style.display = single ? 'none' : '';
}

/* =============================================================================
   10. Contact Form — Client-side validation + success message
============================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-field--error').forEach(function (el) {
      el.classList.remove('form-field--error');
    });
    const existingError = form.querySelector('.form-error-banner');
    if (existingError) existingError.remove();

    // Validate required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(function (field) {
      if (!field.value.trim()) {
        const wrap = field.closest('.form-field');
        if (wrap) wrap.classList.add('form-field--error');
        valid = false;
      }
    });

    if (!valid) {
      const banner = document.createElement('p');
      banner.className = 'form-error-banner';
      banner.textContent = 'אנא מלאו את כל השדות המסומנים בכוכבית (*) ונסו שוב.';
      form.insertBefore(banner, form.firstChild);
      return;
    }

    // Show success message (no backend — static site)
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.innerHTML =
      '<p class="form-success__text">תודה! קיבלנו את ההודעה שלכם ונחזור אליכם בהקדם — בדרך כלל תוך יום עסקים.</p>';

    form.parentNode.replaceChild(successMsg, form);
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* =============================================================================
   Exported API — allows HTML pages to call openLightbox directly
============================================================================= */
window.openLightbox = openLightbox;
