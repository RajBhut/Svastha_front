import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Baby, Star, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Therapy = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "individual",
      title: "Individual Therapy",
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      description:
        "One-on-one sessions focused on personal growth and well-being",
      benefits: [
        "Personalized attention",
        "Flexible scheduling",
        "Private environment",
      ],
    },
    {
      id: "child",
      title: "Child Therapy",
      icon: <Baby className="w-8 h-8 text-blue-600" />,
      description:
        "Specialized support for children's emotional and developmental needs",
      benefits: [
        "Child-friendly approach",
        "Parent involvement",
        "Age-appropriate techniques",
      ],
    },
    {
      id: "couple",
      title: "Couple Therapy",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      description: "Strengthen relationships and improve communication",
      benefits: ["Joint sessions", "Relationship tools", "Conflict resolution"],
    },
    {
      id: "ai",
      title: "AI-Assisted Therapy",
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      description: "24/7 support with our AI mental health companion",
      benefits: ["Always available", "Immediate responses", "Guided exercises"],
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/questionnaire/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center mb-8"
          >
            Choose Your <span className="gradient-text">Therapy Journey</span>
          </motion.h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find the perfect therapeutic approach tailored to your needs and
            start your journey to better mental health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover-card cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 rounded-xl mb-6">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {category.description}
                  </p>
                  <div className="space-y-2 w-full">
                    {category.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Star className="w-4 h-4 text-blue-600" />
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
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
            >
              Enterprise Solutions
            </motion.button>
            <p className="mt-4 text-gray-600 text-sm">
              Looking for corporate wellness programs?
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Therapy;
