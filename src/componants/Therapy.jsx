import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Baby, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Therapy = () => {
  const navigate = useNavigate();

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

  const handleCategoryClick = (categoryId) => {
    navigate(`/questionnaire/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#e5c3b9] p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#1a1a4d] text-center mb-12"
        >
          Choose Your Therapy Journey
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`${category.bgColor} rounded-lg shadow-lg overflow-hidden cursor-pointer`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/50 mb-4 mx-auto">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a4d] text-center mb-2">
                  {category.title}
                </h3>
                <p className="text-[#2d1c3b] text-center mb-4">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-[#2d1c3b]"
                    >
                      <Star className="w-4 h-4 text-[#66c7c7]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/enterprise")}
            className="bg-gradient-to-r from-[#ffb4b4] to-[#ffcece] text-[#1a1a4d] px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Enterprise Solutions
          </motion.button>
          <p className="mt-4 text-[#2d1c3b] text-sm">
            Looking for corporate wellness programs?
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Therapy;
