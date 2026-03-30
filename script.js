// Smooth Scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Typing
new Typed("#typing", {
  strings: ["Python Developer", "Django Developer", "Web Developer"],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

// Theme
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// Scroll Animations
ScrollReveal().reveal('.card', {
  delay: 200,
  distance: '50px',
  origin: 'bottom',
  duration: 1000
});

// Particles
particlesJS("particles-js", {
  particles: { number: { value: 60 }, move: { speed: 2 } }
});

// EmailJS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    message: document.querySelector("textarea").value
  }).then(()=> alert("Message Sent!"));
});
