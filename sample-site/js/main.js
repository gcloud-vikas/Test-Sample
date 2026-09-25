/* Northbeam IT sample site: navigation, smooth scroll and form validation */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var MOBILE_BREAKPOINT = 760;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close on Escape and return focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) {
        setMenu(false);
      }
    });

    // Reset state if the window grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenu(false);
    });
  }

  /* ---------- Smooth scrolling for in-page links ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href').slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;

    e.preventDefault();
    if (nav && nav.classList.contains('is-open')) setMenu(false);

    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });

    // Move focus for keyboard and screen reader users without jumping the page
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.pushState(null, '', '#' + id);
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var success = document.getElementById('form-success');
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) {
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'Your name should be at least 2 characters.';
      return '';
    },
    email: function (v) {
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_PATTERN.test(v)) return 'Enter an email address like name@company.co.uk.';
      return '';
    },
    service: function (v) {
      return v ? '' : 'Please choose what you need help with.';
    },
    message: function (v) {
      if (!v) return 'Please tell us a little about what you need.';
      if (v.length < 20) return 'Please add a bit more detail (at least 20 characters).';
      return '';
    }
  };

  function validateField(name) {
    var field = form.elements[name];
    var errorEl = document.getElementById(name + '-error');
    var message = rules[name](field.value.trim());

    errorEl.textContent = message;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
    return !message;
  }

  // Re-check a field once the user has interacted with it
  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    field.addEventListener('blur', function () {
      if (field.value.trim() || field.hasAttribute('aria-invalid')) validateField(name);
    });
    field.addEventListener('input', function () {
      if (field.hasAttribute('aria-invalid')) validateField(name);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.hidden = true;

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // No real submission; this is a demo site
    var firstName = form.elements.name.value.trim().split(/\s+/)[0];
    success.textContent =
      'Thanks, ' + firstName + '. Your message has been received. ' +
      'An engineer will reply to ' + form.elements.email.value.trim() + ' within one working day.';
    success.hidden = false;
    form.reset();
    success.focus();
  });

})();
