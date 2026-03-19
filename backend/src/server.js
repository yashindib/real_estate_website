const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const properties = [
  {
    id: 1,
    title: "Modern Family Villa",
    location: "Austin, TX",
    prize: 725000,
    bedrooms: 4
  },
  {
    id: 2,
    title: "Downtown Apartment",
    location: "Seattle, WA",
    prize: 410000,
    bedrooms: 2
  },
  {
    id: 3,
    title: "Countryside House",
    location: "Nashville, TN",
    prize: 540000,
    bedrooms: 3
  }
];

app.get("/api/properties", (req, res) => {
  const minPrice = Number(req.query.minPrice) || 0;
  const filtered = properties.filter((property) => property.prize > minPrice);
  res.json({
    success: true,
    data: filtered
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields"
    });
  }

  return res.status(500).json({
    success: true,
    message: "Message saved successfully"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
