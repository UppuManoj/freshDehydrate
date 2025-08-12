window.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("/components/navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
    });

  // Load footer
  fetch("/components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});


// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Load navbar and footer when page loads
document.addEventListener('DOMContentLoaded', function () {
  loadComponent('navbar-placeholder', '../components/navbar.html');
  loadComponent('footer-placeholder', 'components/footer.html');
});


document.addEventListener('DOMContentLoaded', function () {
  var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();
});