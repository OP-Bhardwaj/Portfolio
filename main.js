const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #0F4E50;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});


/* ============================================================
   CONTACT FORM  —  email + WhatsApp delivery
   ------------------------------------------------------------
   "Send Message"      -> emails you at MY_EMAIL via FormSubmit
   "Send on WhatsApp"  -> opens WhatsApp chat to MY_WHATSAPP
                          with the typed details pre-filled
   ============================================================ */

const MY_EMAIL    = "opbhardwaj88@gmail.com";
const MY_WHATSAPP = "919306407069";              // country code + number, digits only
const FORM_ENDPOINT = "https://formsubmit.co/ajax/" + MY_EMAIL;

(function initContactForm() {
  const form      = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const mailInput = document.getElementById("cf-email");
  const msgInput  = document.getElementById("cf-message");
  const sendBtn   = document.getElementById("btn-send");
  const waBtn     = document.getElementById("btn-whatsapp");
  const statusEl  = document.getElementById("form-status");
  const sendLabel = sendBtn ? sendBtn.querySelector(".btn-label") : null;

  /* ---------- status banner ---------- */
  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status";
    if (message) statusEl.classList.add("is-visible", "is-" + kind);
  }

  function clearStatus() {
    setStatus("", "info");
  }

  /* ---------- validation ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function markInvalid(field) {
    if (field) {
      field.classList.add("input-error");
      field.focus();
    }
  }

  function clearInvalid() {
    [nameInput, mailInput, msgInput].forEach(f => {
      if (f) f.classList.remove("input-error");
    });
  }

  // Returns the trimmed values, or null if something is missing/malformed.
  function readForm() {
    clearInvalid();

    const values = {
      name:    (nameInput && nameInput.value  || "").trim(),
      email:   (mailInput && mailInput.value  || "").trim(),
      message: (msgInput  && msgInput.value   || "").trim()
    };

    if (!values.name) {
      setStatus("Please enter your name.", "error");
      markInvalid(nameInput);
      return null;
    }
    if (!EMAIL_RE.test(values.email)) {
      setStatus("Please enter a valid email address so I can reply to you.", "error");
      markInvalid(mailInput);
      return null;
    }
    if (values.message.length < 10) {
      setStatus("Please write a message of at least 10 characters.", "error");
      markInvalid(msgInput);
      return null;
    }

    clearStatus();
    return values;
  }

  // Clear the error highlight as soon as the visitor starts fixing the field.
  [nameInput, mailInput, msgInput].forEach(field => {
    if (field) {
      field.addEventListener("input", () => field.classList.remove("input-error"));
    }
  });

  /* ---------- sending state ---------- */
  function setSending(isSending) {
    if (!sendBtn) return;
    sendBtn.disabled = isSending;
    if (waBtn) waBtn.disabled = isSending;

    const icon = sendBtn.querySelector("i");
    if (icon) {
      icon.className = isSending
        ? "fa-solid fa-spinner"
        : "fa-solid fa-paper-plane";
    }
    if (sendLabel) {
      sendLabel.textContent = isSending ? "Sending..." : "Send Message";
    }
  }

  /* ---------- 1. EMAIL: submit via FormSubmit ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = readForm();
    if (!values) return;

    // Bot filled the hidden honeypot - silently pretend success.
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) {
      setStatus("Thanks! Your message has been sent.", "success");
      form.reset();
      return;
    }

    setSending(true);
    setStatus("Sending your message...", "info");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name:      values.name,
          email:     values.email,
          message:   values.message,
          _subject:  "New portfolio message from " + values.name,
          _template: "table",
          _captcha:  "false"
        })
      });

      const data = await response.json().catch(() => ({}));
      const success = response.ok &&
        String(data.success).toLowerCase() === "true";

      if (success) {
        setStatus(
          "Thanks " + values.name + "! Your message has been sent — I'll get back to you at " +
          values.email + " soon.",
          "success"
        );
        form.reset();
      } else if (data.message) {
        // FormSubmit's own explanation, e.g. the first-time activation notice.
        setStatus(data.message, "info");
      } else {
        throw new Error("Unexpected response from the mail service");
      }
    } catch (err) {
      // Offline, blocked, or opened straight from the file system.
      setStatus(
        "Sorry, the message couldn't be sent right now. Please email me directly at " +
        MY_EMAIL + ", or use the WhatsApp button.",
        "error"
      );
      console.error("Contact form error:", err);
    } finally {
      setSending(false);
    }
  });

  /* ---------- 2. WHATSAPP: open a pre-filled chat ---------- */
  function buildWhatsAppUrl(values) {
    const lines = [
      "Hi OP, I found you through your portfolio.",
      "",
      "Name: "    + values.name,
      "Email: "   + values.email,
      "",
      "Message:",
      values.message
    ];
    return "https://wa.me/" + MY_WHATSAPP +
           "?text=" + encodeURIComponent(lines.join("\n"));
  }

  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const values = readForm();
      if (!values) return;

      window.open(buildWhatsAppUrl(values), "_blank", "noopener");
      setStatus(
        "Opening WhatsApp — just press send in the chat and your message reaches me.",
        "success"
      );
    });
  }
})();
