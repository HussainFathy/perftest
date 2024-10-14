// Importing necessary modules
const express = require("express");
const app = express();
const PORT = 3001;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Perfume recommendations database
const perfume_recommendations = {
  "male,woody,special occasion,night,bold": "Lancôme Oud Bouquet",
  "male,citrus,daily use,day,fresh": "Chanel Bleu de Chanel",
  "female,floral,special occasion,night,warm": "Amouage Guidance",
  "female,vanilla,casual,day,subtle": "Victoria's Secret Very Sexy Now",
  "unisex,sandalwood,special occasion,winter,bold": "Lancôme Oud Bouquet",
  "unisex,musk,daily use,day,fresh": "Dior Homme",
  "female,floral,daily use,summer,fresh": "Amouage Guidance",
  "male,woody,casual,winter,warm": "Dior Homme",
  "unisex,woody,special occasion,night,bold": "Lancôme Oud Bouquet",
};

// POST endpoint to get perfume recommendation
app.post("/recommend-perfume", (req, res) => {
  const { attributes } = req.body;

  // Ensure input is an array and has the correct number of attributes
  if (!Array.isArray(attributes) || attributes.length !== 5) {
    return res.status(400).json({ error: "Invalid input. Provide an array with 5 attributes." });
  }

  // Convert the attributes to a string key to search in the recommendations
  const key = attributes.join(",");
  const recommendation = perfume_recommendations[key];

  if (recommendation) {
    res.json({ recommendation });
  } else {
    res.status(404).json({ error: "No recommendation found for the given attributes." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});