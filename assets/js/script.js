// ATIKUL DEV – site scripts: mobile menu + contact form validation.
(function () {
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { burger.click(); burger.focus(); }
    });
  }
  var form = document.getElementById('contact-form');
  if (!form) return;
  var msgs = { name: 'Enter your name.', email: 'Enter a valid email address.', subject: 'Enter a subject.', message: 'Enter your message.' };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, status = document.getElementById('form-status');
    ['name', 'email', 'subject', 'message'].forEach(function (id) {
      var f = form.elements[id], v = f.value.trim(), bad = !v || (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      f.setAttribute('aria-invalid', bad);
      document.getElementById('e-' + id).textContent = bad ? msgs[id] : '';
      if (bad && ok) f.focus();
      if (bad) ok = false;
    });
    if (!ok) { status.textContent = ''; return; }
    // TODO: connect a backend or email service here (e.g. fetch('YOUR_FORM_ENDPOINT', {method:'POST', body:new FormData(form)})).
    // Until then, nothing is sent.
    status.textContent = 'The form is not connected to an email service yet, so your message was not sent. Please use the email, WhatsApp or Telegram links instead.';
  });
})();
