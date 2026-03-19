const API_BASE_URL = "http://localhost:5000/api";
const propertyPanel = document.getElementById("property-panel");

async function loadPropertyDetails() {
  const params = new URLSearchParams(window.location.search);
  const propertyId = Number(params.get("id"));

  const response = await fetch(`${API_BASE_URL}/properties`);
  const result = await response.json();
  const selected = result.data.find((item) => item.id === propertyId);

  if (!selected) {
    propertyPanel.innerHTML = `
      <h2>Selected Property</h2>
      <p class="muted">Property not found.</p>
    `;
    return;
  }

  propertyPanel.innerHTML = `
    <h2>${selected.title}</h2>
    <p><strong>Location:</strong> ${selected.location}</p>
    <p><strong>Price:</strong> $${selected.price.toLocaleString()}</p>
    <p><strong>Bedrooms:</strong> ${selected.bedrooms}</p>
    <p class="muted">Contact our team for a personalized tour.</p>
  `;
}

loadPropertyDetails();
