const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Contact form submission alert
const contactForm = document.querySelector('.contact-form');

if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent actual form submission
    alert("Your message has been sent successfully!");
    contactForm.reset(); // optional: clear the form fields
  });
}
