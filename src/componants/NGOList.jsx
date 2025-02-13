import React, { useEffect, useState } from "react";
import { Building2, Users, MapPin, Calendar } from "lucide-react";

const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const volunteerId = "demo-volunteer"; // Replace with actual volunteer ID

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ngos");
        const data = await response.json();
        setNgos(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
        setIsLoading(false);
      }
    };

    fetchNgos();
  }, []);

  const handleJoinNgo = async (ngo) => {
    setSelectedNgo(ngo);
    setShowDialog(true);
  };

  const confirmJoin = async () => {
    try {
      await fetch(`http://localhost:3000/api/join-ngo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          volunteerId,
          ngoId: selectedNgo.id,
        }),
      });
      setShowDialog(false);
    } catch (error) {
      console.error("Error joining NGO:", error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600">
            Join these amazing organizations and start making an impact in your
            community
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              variants={item}
              className="group"
              whileHover={{ y: -8 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {ngo.orgName}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{ngo.location || "Global"}</span>
                  </div>

                  <p className="text-gray-600 mb-6">{ngo.description}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {ngo.volunteerCount || "0"} volunteers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Since {ngo.foundedYear || "2024"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinNgo(ngo)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Join Organization
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-2">
                Join {selectedNgo?.orgName}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to join {selectedNgo?.orgName}? You'll be
                able to participate in their volunteer activities and receive
                updates about their initiatives.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmJoin}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOList;
