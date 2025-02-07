import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Baby, Calendar, Clock, Star } from "lucide-react";

const Therapy = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "individual",
      title: "Individual Therapy",
      icon: <Heart className="w-8 h-8 text-[#ffb4b4]" />,
      description:
        "One-on-one sessions focused on personal growth and well-being",
      bgColor: "bg-[#fff5e9]",
      benefits: [
        "Personalized attention",
        "Flexible scheduling",
        "Private environment",
      ],
    },
    {
      id: "child",
      title: "Child Therapy",
      icon: <Baby className="w-8 h-8 text-[#89e0e0]" />,
      description:
        "Specialized support for children's emotional and developmental needs",
      bgColor: "bg-[#e5f6f6]",
      benefits: [
        "Child-friendly approach",
        "Parent involvement",
        "Age-appropriate techniques",
      ],
    },
    {
      id: "couple",
      title: "Couple Therapy",
      icon: <Users className="w-8 h-8 text-[#ffb4b4]" />,
      description: "Strengthen relationships and improve communication",
      bgColor: "bg-[#fff5e9]",
      benefits: ["Joint sessions", "Relationship tools", "Conflict resolution"],
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <div className="min-h-screen bg-[#e5c3b9] p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#1a1a4d] text-center mb-8"
        >
          Choose Your Therapy Journey
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`${
                category.bgColor
              } rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedCategory === category.id ? "ring-2 ring-[#66c7c7]" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {category.icon}
                  <h2 className="text-xl font-semibold text-[#1a1a4d]">
                    {category.title}
                  </h2>
                </div>
                <p className="text-[#2d1c3b] mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#66c7c7]" />
                      <span className="text-sm text-[#2d1c3b]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-[#66c7c7]" />
                <h2 className="text-xl font-semibold text-[#1a1a4d]">
                  Available Time Slots
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#fff5e9] rounded-full hover:bg-[#ffe0c2] transition-colors"
                  >
                    <Clock className="w-4 h-4 text-[#2d1c3b]" />
                    <span className="text-[#2d1c3b]">{time}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Therapy;
