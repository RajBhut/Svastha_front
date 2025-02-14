// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const NgoDetailsPage = () => {
//   const { id } = useParams();
//   const [ngo, setNgo] = useState(null);

//   useEffect(() => {
//     const fetchNgoDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/ngos/${id}`
//         );
//         setNgo(response.data);
//       } catch (error) {
//         console.error("Error fetching NGO details:", error);
//       }
//     };

//     fetchNgoDetails();
//   }, [id]);

//   if (!ngo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-thin text-purple-900 text-center mb-8">
//           {ngo.orgName}
//         </h2>
//         <div className="space-y-4">
//           <h3 className="text-xl font-medium text-purple-900">
//             Organization Details
//           </h3>
//           <p>
//             <strong>Registration Number:</strong> {ngo.regNumber}
//           </p>
//           <p>
//             <strong>Email:</strong> {ngo.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {ngo.phone}
//           </p>
//           <p>
//             <strong>Address:</strong> {ngo.address}
//           </p>
//           <p>
//             <strong>Website:</strong>{" "}
//             <a href={ngo.website} target="_blank" rel="noopener noreferrer">
//               {ngo.website}
//             </a>
//           </p>
//           <p>
//             <strong>Founding Year:</strong> {ngo.foundingYear}
//           </p>
//           <p>
//             <strong>Contact Person:</strong> {ngo.contactPerson.name}
//           </p>
//           <p>
//             <strong>Position:</strong> {ngo.contactPerson.position}
//           </p>
//           <p>
//             <strong>Contact Email:</strong> {ngo.contactPerson.email}
//           </p>
//           <p>
//             <strong>Contact Phone:</strong> {ngo.contactPerson.phone}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NgoDetailsPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Phone,
  Mail,
  User,
  Calendar,
  Building,
  MapPin,
} from "lucide-react";
import axios from "axios";

const NgoDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNgoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ngos/${id}`
        );
        setNgo(response.data);
      } catch (error) {
        setError("Failed to load NGO details");
        console.error("Error fetching NGO details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNgoDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-medium mb-2">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <motion.button
                whileHover={{ x: -5 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to NGOs</span>
              </motion.button>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="gradient-text">{ngo?.orgName}</span>
              </h1>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="space-y-6">
                  <InfoItem
                    icon={Building}
                    label="Registration Number"
                    value={ngo?.regNumber}
                  />
                  <InfoItem icon={Mail} label="Email" value={ngo?.email} />
                  <InfoItem icon={Phone} label="Phone" value={ngo?.phone} />
                  <InfoItem
                    icon={MapPin}
                    label="Address"
                    value={ngo?.address}
                  />
                  <InfoItem
                    icon={Globe}
                    label="Website"
                    value={
                      <a
                        href={ngo?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        {ngo?.website}
                      </a>
                    }
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Founding Year"
                    value={ngo?.foundingYear}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Contact Person
                  </h3>
                  <InfoItem
                    icon={User}
                    label="Name"
                    value={ngo?.contactPerson.name}
                  />
                  <InfoItem
                    icon={Building}
                    label="Position"
                    value={ngo?.contactPerson.position}
                  />
                  <InfoItem
                    icon={Mail}
                    label="Email"
                    value={ngo?.contactPerson.email}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Phone"
                    value={ngo?.contactPerson.phone}
                  />
                </div>
              </div>

              <div className="mt-12 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
                >
                  Contact NGO
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-blue-50 rounded-lg">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

export default NgoDetailsPage;
