const API_BASE_URL = "http://localhost:5000/api";
const listingGrid = document.getElementById("listing-grid");

async function loadListings() {
  listingGrid.innerHTML = "<p>Loading listings...</p>";

  const response = await fetch(`${API_BASE_URL}/properties`);
  const result = await response.json();
  listingGrid.innerHTML = "";

  result.data.forEach((property) => {
    const card = document.createElement("article");
    card.className = "property-card";
    card.innerHTML = `
      <h3>${property.title}</h3>
      <p><strong>Location:</strong> ${property.location}</p>
      <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
      <a href="./property.html?id=${property.id}">View details</a>
    `;
    listingGrid.appendChild(card);
  });
}

loadListings();
