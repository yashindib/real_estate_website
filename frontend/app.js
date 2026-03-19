const API_BASE_URL = "http://localhost:5000/api";

const listEl = document.getElementById("property-list");
const formEl = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

async function loadProperties() {
  listEl.innerHTML = "<p>Loading properties...</p>";
  const response = await fetch(`${API_BASE_URL}/properties?minPrice=300000`);
  const result = await response.json();

  listEl.innerHTML = "";
  result.data.forEach((property) => {
    const card = document.createElement("article");
    card.className = "property-card";
    card.innerHTML = `
      <h3>${property.title}</h3>
      <p><strong>Location:</strong> ${property.location}</p>
      <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
    `;
    listEl.appendChild(card);
  });
}

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
loadProperties();
