import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState("volunteer");
  const navigate = useNavigate();
  const [volunteerData, setVolunteerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    availability: {
      weekdays: false,
      weekends: false,
      mornings: false,
      afternoons: false,
      evenings: false,
    },
    additionalInfo: "",
    proofOfStudent: null,
  });
  const [ngoData, setNgoData] = useState({
    orgName: "",
    regNumber: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    foundingYear: "",
    proofOfRegistration: null,
    contactPerson: {
      name: "",
      position: "",
      email: "",
      phone: "",
    },
  });

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: volunteerData.name,
      email: volunteerData.email,
      phone: volunteerData.phone,
      address: volunteerData.address,
      city: volunteerData.city,
      state: volunteerData.state,
      zip: volunteerData.zip,
      availability: volunteerData.availability,
      additionalInfo: volunteerData.additionalInfo,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/volunteers",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Volunteer Data Submitted:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting volunteer data:", error);
    }
  };

  const handleNgoSubmit = async (e) => {
    e.preventDefault();
    const data = {
      orgName: ngoData.orgName,
      regNumber: ngoData.regNumber,
      email: ngoData.email,
      phone: ngoData.phone,
      address: ngoData.address,
      website: ngoData.website,
      foundingYear: ngoData.foundingYear,
      contactPerson: ngoData.contactPerson,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ngos",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("NGO Data Submitted:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting NGO data:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === "volunteer"
                ? "bg-pink-200 text-purple-900"
                : "bg-white/80 text-purple-900"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Volunteer Registration
          </button>
          <button
            onClick={() => setActiveTab("ngo")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === "ngo"
                ? "bg-teal-200 text-purple-900"
                : "bg-white/80 text-purple-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            NGO Registration
          </button>
          <Link
            to="/"
            className="flex items-center ml-auto gap-2 px-6 py-2 bg-white/80 text-[#1a1a4d] rounded-lg hover:bg-white transition-colors shadow-md"
          >
            Home
          </Link>
        </div>
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-8">
          {activeTab === "volunteer" ? (
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <h2 className="text-3xl font-thin text-purple-900 text-center mb-8">
                Volunteer Registration
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-900">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={volunteerData.name}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={volunteerData.email}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={volunteerData.phone}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Address
                    </label>
                    <input
                      type="text"
                      value={volunteerData.address}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      City
                    </label>
                    <input
                      type="text"
                      value={volunteerData.city}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      State
                    </label>
                    <input
                      type="text"
                      value={volunteerData.state}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={volunteerData.zip}
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          zip: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Proof
                    </label>
                    <input
                      type="file"
                      required
                      onChange={(e) =>
                        setVolunteerData({
                          ...volunteerData,
                          proofOfStudent: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-900">
                  Availability
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(volunteerData.availability).map((key) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={volunteerData.availability[key]}
                        onChange={(e) =>
                          setVolunteerData({
                            ...volunteerData,
                            availability: {
                              ...volunteerData.availability,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor={key} className="text-sm text-purple-900">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-900">
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-purple-900">
                    Additional Notes
                  </label>
                  <textarea
                    value={volunteerData.additionalInfo}
                    onChange={(e) =>
                      setVolunteerData({
                        ...volunteerData,
                        additionalInfo: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-full font-medium"
              >
                Register as Volunteer
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleNgoSubmit} className="space-y-6">
              <h2 className="text-3xl font-thin text-purple-900 text-center mb-8">
                NGO Registration
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-900">
                  Organization Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ngoData.orgName}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, orgName: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      required
                      value={ngoData.regNumber}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, regNumber: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={ngoData.email}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={ngoData.phone}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Address
                    </label>
                    <input
                      type="text"
                      value={ngoData.address}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, address: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Website
                    </label>
                    <input
                      type="url"
                      value={ngoData.website}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, website: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Founding Year
                    </label>
                    <input
                      value={ngoData.foundingYear}
                      onChange={(e) =>
                        setNgoData({ ...ngoData, foundingYear: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Proof of Registration
                    </label>
                    <input
                      type="file"
                      required
                      onChange={(e) =>
                        setNgoData({
                          ...ngoData,
                          proofOfRegistration: e.target.files[0],
                        })
                      }
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-purple-900">
                  Contact Person
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Name
                    </label>
                    <input
                      type="text"
                      value={ngoData.contactPerson.name}
                      onChange={(e) =>
                        setNgoData({
                          ...ngoData,
                          contactPerson: {
                            ...ngoData.contactPerson,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Position{" "}
                    </label>
                    <input
                      type="text"
                      value={ngoData.contactPerson.position}
                      onChange={(e) =>
                        setNgoData({
                          ...ngoData,
                          contactPerson: {
                            ...ngoData.contactPerson,
                            position: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Email
                    </label>
                    <input
                      type="email"
                      value={ngoData.contactPerson.email}
                      onChange={(e) =>
                        setNgoData({
                          ...ngoData,
                          contactPerson: {
                            ...ngoData.contactPerson,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={ngoData.contactPerson.phone}
                      onChange={(e) =>
                        setNgoData({
                          ...ngoData,
                          contactPerson: {
                            ...ngoData.contactPerson,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-purple-400 text-white py-3 rounded-full font-medium"
              >
                Register as NGO
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default RegistrationPage;
