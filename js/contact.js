document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Format the message
    const whatsappMessage =
      `New Contact Form Submission:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message: ${message}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Your WhatsApp number (with country code, no + or dashes)
    const whatsappNumber = "916303060469"; // change if needed

    // Final WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank");

    // Optionally reset form
    form.reset();

    // Optionally show message
    alert("You will be redirected to WhatsApp to complete the message.");
  });
});
