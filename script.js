document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav-links");
  if(menu&&nav){
    menu.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  }

  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const activate=()=>{
    const y=window.scrollY+110;
    let current=sections[0];
    sections.forEach(s=>{if(s.offsetTop<=y) current=s});
    links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current.id));
  };
  activate();
  window.addEventListener("scroll",activate,{passive:true});

  const year=document.getElementById("year");
  if(year) year.textContent=new Date().getFullYear();

  const career=document.getElementById("career-form");
  if(career){
    career.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d=new FormData(career);
      const subject=encodeURIComponent("Kurzbewerbung – WEISSWERK");
      const body=encodeURIComponent(
        "Guten Tag,\n\n"+
        "ich möchte mich gerne bei WEISSWERK bewerben.\n\n"+
        "Name: "+(d.get("name")||"")+"\n"+
        "Telefon: "+(d.get("phone")||"")+"\n"+
        "E-Mail: "+(d.get("email")||"")+"\n"+
        "Bereich: "+(d.get("area")||"")+"\n\n"+
        "Nachricht:\n"+(d.get("message")||"")
      );
      window.location.href="mailto:office@weiss-werk.at?subject="+subject+"&body="+body;
    });
  }

  const quote=document.getElementById("quote-form");
  if(quote){
    quote.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d=new FormData(quote);
      const subject=encodeURIComponent("Unverbindliche Angebotsanfrage – WEISSWERK");
      const body=encodeURIComponent(
        "Guten Tag,\n\n"+
        "ich möchte gerne ein unverbindliches Angebot von WEISSWERK anfragen.\n\n"+
        "Name: "+(d.get("name")||"")+"\n"+
        "Unternehmen: "+(d.get("company")||"")+"\n"+
        "E-Mail: "+(d.get("email")||"")+"\n"+
        "Telefon: "+(d.get("phone")||"")+"\n\n"+
        "Anfrage:\n"+(d.get("message")||"")
      );
      window.location.href="mailto:office@weiss-werk.at?subject="+subject+"&body="+body;
    });
  }
});