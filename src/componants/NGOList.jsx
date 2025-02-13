import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const CHAT_URL = import.meta.env.VITE_CHAT_API_URL;
const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [volunteerId, setVolunteerId] = useState(""); // Replace with actual volunteer ID

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ngos");
        console.log(response.data);
        setNgos(response.data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNgos();
  }, []);

  const handleJoinNgo = async (ngoId) => {
    try {
      await axios.post(`http://localhost:3000/api/join-ngo`, {
        volunteerId,
        ngoId,
      });
      alert("Successfully joined the NGO!");
    } catch (error) {
      console.error("Error joining NGO:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Registered NGOs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ngos.map((ngo) => (
          <motion.div
            key={ngo.id}
            className="bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold mb-4">{ngo.orgName}</h2>
            <p className="text-gray-700 mb-4">{ngo.description}</p>
            <button
              onClick={() => handleJoinNgo(ngo.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Join NGO
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NGOList;
