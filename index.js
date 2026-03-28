// এই স্ক্রিপ্টটি লাইট/ডার্ক মোড এবং ভাষা পরিবর্তনের কাজ করে।
// Lucide icons সচল করার ফাংশন
const initIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log('Lucide icons initialized');
  } else {
    console.error('Lucide library not found');
  }
};

// DOM লোড হওয়ার পর আইকন ইনইট করা
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIcons);
} else {
  initIcons();
}

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// থিম পরিবর্তন (Light/Dark Mode)
themeToggle?.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.replace('dark-mode', 'light-mode');
    sunIcon?.classList.add('d-none');
    moonIcon?.classList.remove('d-none');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    sunIcon?.classList.remove('d-none');
    moonIcon?.classList.add('d-none');
    localStorage.setItem('theme', 'dark');
  }
});

// ভাষা পরিবর্তন (Bengali/English)
langToggle?.addEventListener('click', () => {
  const currentLang = document.documentElement.getAttribute('lang') || 'bn';
  const nextLang = currentLang === 'bn' ? 'en' : 'bn';
  document.documentElement.setAttribute('lang', nextLang);
  localStorage.setItem('lang', nextLang);
});

// আগে থেকে সেভ করা থিম এবং ভাষা লোড করা
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.replace('dark-mode', 'light-mode');
  sunIcon?.classList.add('d-none');
  moonIcon?.classList.remove('d-none');
}

const savedLang = localStorage.getItem('lang');
if (savedLang) {
  document.documentElement.setAttribute('lang', savedLang);
}

// কন্টাক্ট ফর্ম সাবমিট (WhatsApp Redirect)
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('contact-name')?.value;
  const email = document.getElementById('contact-email')?.value;
  const subject = document.getElementById('contact-subject')?.value;
  const message = document.getElementById('contact-message')?.value;

  const btn = contactForm.querySelector('button[type="submit"]');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Redirecting...';
    btn.setAttribute('disabled', 'true');
    
    // WhatsApp কনফিগারেশন
    const phoneNumber = '8801743812478'; // আপনার হোয়াটসঅ্যাপ নম্বর
    const whatsappMessage = `*New Inquiry from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      // হোয়াটসঅ্যাপে রিডাইরেক্ট করা
      window.open(whatsappUrl, '_blank');
      
      btn.innerHTML = originalText;
      btn.removeAttribute('disabled');
      contactForm.reset();
    }, 1000);
  }
});