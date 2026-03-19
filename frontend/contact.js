const API_BASE_URL = "http://localhost:5000/api";

const formEl = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

async function submitForm(event) {
  event.preventDefault();

  statusEl.textContent = "Sending...";
  const payload = {
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  statusEl.textContent = result.message || "Request completed";
}

formEl.addEventListener("submit", submitForm);
