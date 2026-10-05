document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuToggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.querySelector('.menu-toggle-label').textContent = open ? 'Schließen' : 'Menü';
    };
    window.matchMedia('(min-width: 981px)').addEventListener('change', (event) => {
      if (event.matches) setOpen(false);
    });
    menuToggle.addEventListener('click', () => {
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        menuToggle.focus();
      }
    });
  }

  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 3) * 70}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const mobileCta = document.querySelector('.mobile-cta');
  const ctaHideTargets = document.querySelectorAll('#kontakt, .footer');
  if (mobileCta && ctaHideTargets.length && 'IntersectionObserver' in window) {
    const visibleTargets = new Set();
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      });
      mobileCta.classList.toggle('hidden', visibleTargets.size > 0);
    }, { threshold: 0.15 });
    ctaHideTargets.forEach(target => ctaObserver.observe(target));
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
