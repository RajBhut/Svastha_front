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
import { NavLink, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <motion.nav style={{ opacity }} className="fixed w-full glass-nav z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold gradient-text">Svastha</span>
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
                    duration={100}
                    className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer capitalize transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
              <NavLink
                key={6}
                to={"/patiantHistory"}
                className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer capitalize transition-colors"
              >
                Pationt History
              </NavLink>
            </div>

            <Login_Auth />
          </div>
        </div>
      </motion.nav>

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
                onClick={() => {
                  navigate("/the");
                }}
              >
                Begin Your Journey
              </motion.button>
            </div>
          </div>
        </FadeInSection>
      </section>

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
                onClick={() => {
                  navigate("/chat");
                }}
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
                onClick={() => {
                  navigate("/add");
                }}
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
                onClick={() => {
                  navigate("/res");
                }}
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
              onClick={() => {
                navigate("/match");
              }}
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
      <elevenlabs-convai agent-id="LCdDDPiwOIl1pXUIZNyT">
        Chat
      </elevenlabs-convai>
    </div>
  );
}

export default App;
