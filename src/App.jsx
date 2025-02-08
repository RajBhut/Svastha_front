import "./App.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Star, Heart, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import ChatbotUI from "./componants/ChatbotUI ";
import Login_Auth from "./componants/Login";

const ElegantCard = ({ imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-80 h-80 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`
          relative w-full h-full transition-all duration-700
          ${isHovered ? "rotate-y-180" : ""}
        `}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute w-full h-full rounded-xl bg-white shadow-lg overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={imageSrc}
            alt="Card front"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div
          className="absolute w-full h-full rounded-xl bg-white shadow-lg p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Join Our Community
            </h2>
            <p className="text-purple-600 text-center">
              Aditional info hear!!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </div>
    </div>
  );
};

const ServicesMarquee = ({ services }) => {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-[#fff5e9]">
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...services, ...services].map((service, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`w-24 h-24 rounded-full ${service.bgColor} flex items-center justify-center mb-4 text-3xl shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-[#1a1a4d] text-center text-sm font-medium mb-2">
              {service.title}
            </h3>
            <motion.button
              className={`${service.buttonColor} text-sm px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {service.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
export default function App() {
  const [open_chat, set_open_chat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [si, setSi] = useState(0);
  const sideImages = ["the.jpg", "the.jpg"];

  const services = [
    {
      title: "Get Started & Our ABO",
      icon: "😊",
      bgColor: "bg-[#ffb4b4]",
      buttonColor: "bg-[#89e0e0] text-white",
      buttonText: "Get Started",
    },
    {
      title: "Diagnosis & Chatbot",
      icon: "😄",
      bgColor: "bg-[#ffb4b4]",
      buttonColor: "bg-[#ffcece] text-[#1a1a4d]",
      buttonText: "Get Started",
    },
    {
      title: "Chat with Chatbot",
      icon: "🤖",
      bgColor: "bg-[#89e0e0]",
      buttonColor: "bg-[#89e0e0] text-white",
      buttonText: "Get Started",
    },
    {
      title: "Volunteering",
      icon: "🤝",
      bgColor: "bg-[#ffb4b4]",
      buttonColor: "bg-[#ffcece] text-[#1a1a4d]",
      buttonText: "Therapist",
    },
    {
      title: "Volunteering Portal",
      icon: "💝",
      bgColor: "bg-[#89e0e0]",
      buttonColor: "bg-[#b4e9e9] text-[#1a1a4d]",
      buttonText: "Portal",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e5c3b9] overflow-hidden">
      <nav className="relative z-10 p-6 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-2 bg-white/80 text-[#1a1a4d] rounded-lg hover:bg-white transition-colors shadow-md"
            >
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md"
            >
              <Link to="/res">Resources</Link>
            </motion.button>
            <Link to={"/add "}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md"
              >
                Join
              </motion.button>
            </Link>
            <Link to={"/the "}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md"
              >
                Connect
              </motion.button>
            </Link>
            <Link to={"/chat"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#66c7c7] text-white px-6 py-2 rounded-full hover:bg-[#55b6b6] transition-colors shadow-md"
              >
                Chat
              </motion.button>
            </Link>

            <motion.button className="bg-[#ffb4b4] text-[#1a1a4d] px-4 py-2 rounded-full shadow-md transition-colors hover:bg-[#f5a6a6]">
              <Login_Auth />
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="container pt-16 pb-32">
          <div className="flex items-center justify-between">
            <div className="w-1/2 text-center">
              <motion.h1
                initial={{ scale: 0, rotate: -15, y: 50 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                className="text-[#1a1a4d] font-thin text-6xl mb-8"
              >
                Svastha
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#2d1c3b] font-mono text-xl mb-8 leading-relaxed"
              >
                Your journey to mental health starts here. Connect, understand,
                and grow with personalized support and compassionate AI
                guidance.
              </motion.p>
              <motion.button
                className="bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] text-white text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>
            </div>

            <div className="w-1/2 flex justify-center items-center">
              <ElegantCard imageSrc={sideImages[si]} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-[#1a1a4d] text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <ServicesMarquee services={services} />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20"
          >
            <Cloud className="text-[#89e0e0] w-12 h-12 opacity-50" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-40 right-40"
          >
            <Star className="text-[#ffd700] w-8 h-8" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-40 left-1/4"
          >
            <Heart className="text-[#ffb4b4] w-6 h-6" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
export { ElegantCard };
