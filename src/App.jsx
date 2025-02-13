// import "./App.css";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Cloud, Star, Heart, Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";

import Login_Auth from "./componants/Login";
// import Footer from "./componants/Footer";

const ElegantCard = ({
  imageSrc = "the.jpg",
  head = "Heading",
  para = "Aditional info",
}) => {
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
            <h2 className="text-2xl font-bold text-purple-800 mb-4">{head}</h2>
            <p className="text-purple-600 text-center">{para}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
// // const ServicesMarquee = ({ services }) => {
// //   return (
// //     <div className="relative w-full overflow-hidden py-12 bg-[#fff5e9]">
// //       <motion.div
// //         className="flex space-x-8 whitespace-nowrap"
// //         animate={{
// //           x: ["0%", "-50%"],
// //         }}
// //         transition={{
// //           x: {
// //             repeat: Infinity,
// //             repeatType: "loop",
// //             duration: 20,
// //             ease: "linear",
// //           },
// //         }}
// //       >
// //         {[...services, ...services].map((service, index) => (
// //           <motion.div
// //             key={index}
// //             className="flex flex-col items-center min-w-[200px]"
// //             whileHover={{ scale: 1.05 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <motion.div
// //               className={`w-24 h-24 rounded-full ${service.bgColor} flex items-center justify-center mb-4 text-3xl shadow-lg`}
// //               whileHover={{ rotate: 360 }}
// //               transition={{ duration: 0.8 }}
// //             >
// //               {service.icon}
// //             </motion.div>
// //             <h3 className="text-[#1a1a4d] text-center text-sm font-medium mb-2">
// //               {service.title}
// //             </h3>
// //             <motion.button
// //               className={`${service.buttonColor} text-sm px-6 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md`}
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               {service.buttonText}
// //             </motion.button>
// //           </motion.div>
// //         ))}
// //       </motion.div>
// //     </div>
// //   );
// // };
// export default function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [si, setSi] = useState(0);
//   const sideImages = ["the.jpg", "the.jpg"];

//   return (
//     <div className="min-h-screen bg-[#e5c3b9] overflow-hidden">
//       <nav className="relative z-10 p-6 bg-white/10 backdrop-blur-sm">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-between">
//             {/* Logo/Home Link */}
//             <Link
//               to="/"
//               className="flex items-center gap-2 px-6 py-2 bg-white/80 text-[#1a1a4d] rounded-lg hover:bg-white transition-colors shadow-md"
//             >
//               Home
//             </Link>

//             <motion.button
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6 text-[#1a1a4d]" />
//               ) : (
//                 <Menu className="w-6 h-6 text-[#1a1a4d]" />
//               )}
//             </motion.button>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-4">
//               <div
//                 onClick={() => {
//                   window.location.href = "http://localhost:5174";
//                 }}
//                 className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md text-center"
//               >
//                 Resources
//               </div>
//               <Link to="/add">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md"
//                 >
//                   Join
//                 </motion.button>
//               </Link>
//               <Link to="/chat">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="bg-[#66c7c7] text-white px-6 py-2 rounded-full hover:bg-[#55b6b6] transition-colors shadow-md"
//                 >
//                   Svastha Sathi
//                 </motion.button>
//               </Link>
//               <Login_Auth />
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{
//               opacity: isMenuOpen ? 1 : 0,
//               height: isMenuOpen ? "auto" : 0,
//             }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden overflow-hidden"
//           >
//             <div className="flex flex-col space-y-4 pt-4">
//               {/* <Link
//                 to="/res"
//                 className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md text-center"
//               > */}
//               <div
//                 onClick={() => {
//                   window.location.href = "http://localhost:5174";
//                 }}
//                 className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md text-center"
//               >
//                 Resources
//               </div>
//               {/* </Link> */}
//               <Link
//                 to="/add"
//                 className="bg-[#fff5e9] text-[#2d1c3b] px-6 py-2 rounded-full hover:bg-[#ffe0c2] transition-colors shadow-md text-center"
//               >
//                 Join
//               </Link>
//               <Link
//                 to="/chat"
//                 className="bg-[#66c7c7] text-white px-6 py-2 rounded-full hover:bg-[#55b6b6] transition-colors shadow-md text-center"
//               >
//                 Svastha Sathi
//               </Link>
//               <div className="flex justify-center">
//                 <Login_Auth />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </nav>
//       <main className="relative">
//         <div className="container pt-16 pb-32">
//           <div className="flex items-center justify-between">
//             <div className="w-1/2 text-center">
//               <motion.h1
//                 initial={{ scale: 0, rotate: -15, y: 50 }}
//                 animate={{ scale: 1, rotate: 0, y: 0 }}
//                 className="text-[#1a1a4d] font-thin text-6xl mb-8"
//               >
//                 Svastha
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-[#2d1c3b] font-mono text-xl mb-8 leading-relaxed"
//               >
//                 Your journey to mental health starts here. Connect, understand,
//                 and grow with personalized support and compassionate AI
//                 guidance.
//               </motion.p>
//               <Link to={"/the "}>
//                 <motion.button
//                   className="bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] text-white text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Begin Your Journey
//                 </motion.button>
//               </Link>
//             </div>

//             <div className="w-1/2 flex justify-center items-center">
//               <ElegantCard
//                 head="Join Our comunity"
//                 para="Aditional info hear!!!"
//                 imageSrc={sideImages[si]}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <motion.div
//             animate={{
//               y: [0, -20, 0],
//               rotate: [0, 360],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute top-20 left-20"
//           >
//             <Cloud className="text-[#89e0e0] w-12 h-12 opacity-50" />
//           </motion.div>
//           <motion.div
//             animate={{
//               y: [0, 20, 0],
//               rotate: [0, -360],
//             }}
//             transition={{
//               duration: 6,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute top-40 right-40"
//           >
//             <Star className="text-[#ffd700] w-8 h-8" />
//           </motion.div>
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 180, 0],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             className="absolute bottom-32 left-1/4"
//           >
//             <Heart className="text-[#ffb4b4] w-6 h-6" />
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
export { ElegantCard };
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  MessageCircle,
  Users,
  BookOpen,
  Phone,
  LogIn,
  Mic,
  Bot,
  PlusCircle,
  Sparkles,
  Shield,
  Brain,
} from "lucide-react";

const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav style={{ opacity }} className="fixed w-full glass-nav z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold gradient-text">MindWell</span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["home", "volunteer", "chatbot", "resources", "connect"].map(
                (item) => (
                  <Link
                    key={item}
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={800}
                    className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer capitalize transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>

            <Login_Auth />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 hero-gradient">
        <FadeInSection>
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h1 className="text-6xl font-bold mb-4">
                  Your Journey to{" "}
                  <span className="gradient-text">Mental Wellness</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Everyone deserves support and understanding. Join our
                  community of mental health warriors and take the first step
                  towards a healthier, happier you.
                </p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl"
              >
                Begin Your Journey
              </motion.button>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Chatbot Section */}
      <section id="chatbot" className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-4">
              AI-Powered Mental Health Support
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Experience compassionate AI assistance designed to support your
              mental well-being journey
            </p>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover-card"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Bot className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Diagnosis Assistant
                    </h3>
                    <p className="text-gray-500">
                      AI-Powered Mental Health Assessment
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Take a comprehensive mental health assessment with our AI
                  assistant. Get personalized insights and recommendations based
                  on your responses.
                </p>
                <div className="flex space-x-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-600 font-medium">
                    <PlusCircle className="w-4 h-4 mr-2" /> New Assessment
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-50 text-blue-600 font-medium">
                    <Shield className="w-4 h-4 mr-2" /> Private & Secure
                  </span>
                </div>
              </motion.div>
            </FadeInSection>

            <FadeInSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover-card"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Mental Health Companion
                    </h3>
                    <p className="text-gray-500">24/7 Emotional Support</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your always-available companion for emotional support. Share
                  your thoughts, get coping strategies, and practice mindfulness
                  exercises.
                </p>
                <div className="flex space-x-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-600 font-medium">
                    <Mic className="w-4 h-4 mr-2" /> Voice Enabled
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-50 text-blue-600 font-medium">
                    <Sparkles className="w-4 h-4 mr-2" /> AI-Powered
                  </span>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Other sections with FadeInSection wrapper */}
      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Make a difference in mental health advocacy by joining our network
              of volunteers and NGOs
            </p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover-card"
              >
                <Users className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Volunteer Programs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join our community of mental health advocates and make a real
                  difference in people's lives through various volunteer
                  programs.
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-4">
              Mental Health Resources
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Access our curated collection of mental health resources and
              educational materials
            </p>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl hover-card"
              >
                <BookOpen className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Educational Library
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore our comprehensive collection of articles, guides, and
                  research papers on mental health topics.
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-4">
              Connect with Therapists
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Find the right mental health professional for your journey
            </p>
          </FadeInSection>
          <FadeInSection>
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl max-w-3xl mx-auto hover-card"
            >
              <div className="flex flex-col items-center text-center">
                <Phone className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Find Your Perfect Match
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed max-w-xl">
                  Connect with licensed therapists who understand your unique
                  needs. Our matching system helps you find the right
                  professional for your mental health journey.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all">
                  Browse Therapists
                </button>
              </div>
            </motion.div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

export default App;
