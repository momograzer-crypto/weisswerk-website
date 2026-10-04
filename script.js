document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(`Angebotsanfrage – WEISSWERK`);
      const body = encodeURIComponent(
        `Guten Tag,\n\n` +
        `ich möchte gerne ein Angebot von WEISSWERK anfragen.\n\n` +
        `Name: ${data.get('name') || ''}\n` +
        `Unternehmen: ${data.get('company') || ''}\n` +
        `E-Mail: ${data.get('email') || ''}\n\n` +
        `Anfrage:\n${data.get('message') || ''}\n\n` +
        `Mit freundlichen Grüßen`
      );
      window.location.href = `mailto:office@weiss-werk.at?subject=${subject}&body=${body}`;
    });
  }
});
