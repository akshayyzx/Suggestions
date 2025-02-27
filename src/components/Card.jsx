import React, { useState, useEffect } from "react";
import axios from "axios";

const CatCard = ({curator}) => {
  const [fact, setFact] = useState("");
  const [image, setImage] = useState(null);


  const fetchCatData = async () => {
    try {
      const factResponse = await axios.get("https://catfact.ninja/fact");
      const imageResponse = await axios.get(
        "https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg"
      );

      setFact(factResponse.data.fact);
      setImage(imageResponse.data[0].url);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-xl rounded-xl w-96 text-center">
        <h2 className="text-lg font-bold mb-2 text-gray-900">🐱 Random Cat Fact</h2>

        <img
          src={image}
          alt="Random Cat"
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <p className="text-gray-700 mb-4">{fact || "Fetching cat fact..."}</p>
        <button
          onClick={fetchCatData}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Next Cat
        </button>
        
        {/* Curator Name Below Button */}
        <span className="block mt-2 text-gray-600 text-sm">{curator.name}</span>
      </div>
    </div>
  );
};

export default CatCard;
