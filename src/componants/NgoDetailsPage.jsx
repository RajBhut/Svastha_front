import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NgoDetailsPage = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    const fetchNgoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ngos/${id}`
        );
        setNgo(response.data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
      }
    };

    fetchNgoDetails();
  }, [id]);

  if (!ngo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-thin text-purple-900 text-center mb-8">
          {ngo.orgName}
        </h2>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-purple-900">
            Organization Details
          </h3>
          <p>
            <strong>Registration Number:</strong> {ngo.regNumber}
          </p>
          <p>
            <strong>Email:</strong> {ngo.email}
          </p>
          <p>
            <strong>Phone:</strong> {ngo.phone}
          </p>
          <p>
            <strong>Address:</strong> {ngo.address}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={ngo.website} target="_blank" rel="noopener noreferrer">
              {ngo.website}
            </a>
          </p>
          <p>
            <strong>Founding Year:</strong> {ngo.foundingYear}
          </p>
          <p>
            <strong>Contact Person:</strong> {ngo.contactPerson.name}
          </p>
          <p>
            <strong>Position:</strong> {ngo.contactPerson.position}
          </p>
          <p>
            <strong>Contact Email:</strong> {ngo.contactPerson.email}
          </p>
          <p>
            <strong>Contact Phone:</strong> {ngo.contactPerson.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NgoDetailsPage;
