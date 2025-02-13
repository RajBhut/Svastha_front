import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  MessageSquare,
} from "lucide-react";
import TherapistResults from "./TherapistResults";

const questions = [
  {
    id: 1,
    text: "What brings you to therapy?",
    type: "multiple",
    description: "Select all that apply to your current situation",
    options: [
      "Anxiety & Stress",
      "Depression",
      "Relationship Issues",
      "Trauma & PTSD",
      "Self-esteem",
      "Career Challenges",
      "Life Transitions",
      "Grief & Loss",
      "Identity & Personal Growth",
      "Other",
    ],
  },
  {
    id: 2,
    text: "How would you describe the intensity of what you're experiencing?",
    type: "single",
    description: "This helps us understand the level of support you need",
    options: [
      "Mild - It's bothering me but I can manage",
      "Moderate - It's affecting my daily life",
      "Severe - I'm really struggling",
      "Crisis - I need immediate support",
    ],
  },
  {
    id: 3,
    text: "Do you have a preference for your therapist's gender?",
    type: "single",
    options: ["Female", "Male", "Non-binary", "No preference"],
  },
  {
    id: 4,
    text: "What age range would you prefer your therapist to be in?",
    type: "single",
    options: [
      "25-35 years",
      "36-45 years",
      "46-55 years",
      "56+ years",
      "No preference",
    ],
  },
  {
    id: 5,
    text: "Which therapy approaches interest you?",
    type: "multiple",
    description: "Don't worry if you're not sure, we can help guide you",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Psychodynamic Therapy",
      "Mindfulness-based Therapy",
      "Solution-focused Therapy",
      "Humanistic Therapy",
      "Trauma-focused Therapy",
      "Not sure / Open to suggestions",
    ],
  },
  {
    id: 6,
    text: "What are your preferred session formats?",
    type: "multiple",
    description: "Select all formats you're comfortable with",
    options: [
      "Video calls",
      "Phone calls",
      "In-person sessions",
      "Text messaging",
    ],
  },
  {
    id: 7,
    text: "When would you prefer to have your sessions?",
    type: "multiple",
    options: [
      "Weekday mornings",
      "Weekday afternoons",
      "Weekday evenings",
      "Weekends",
      "Flexible / No preference",
    ],
  },
  {
    id: 8,
    text: "Have you been to therapy before?",
    type: "single",
    options: [
      "Yes, and it was helpful",
      "Yes, but it wasn't helpful",
      "No, this is my first time",
    ],
  },
];

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option) => {
    const question = questions[currentQuestion];
    if (question.type === "single") {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: [option],
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: prev[question.id]
          ? prev[question.id].includes(option)
            ? prev[question.id].filter((item) => item !== option)
            : [...prev[question.id], option]
          : [option],
      }));
    }
  };

  const isOptionSelected = (option) => {
    const question = questions[currentQuestion];
    return answers[question.id]?.includes(option) || false;
  };

  const canProceed = () => {
    const question = questions[currentQuestion];
    return answers[question.id]?.length > 0;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setSubmitted(true);
      // Simulate API call delay
      setTimeout(() => setShowResults(true), 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  if (showResults) {
    return <TherapistResults answers={answers} />;
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-[#a3cbf5] rounded-full 
                         flex items-center justify-center mx-auto mb-8 animate-bounce"
          >
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Finding Your Perfect Match
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We're analyzing your responses to connect you with therapists who
            best match your needs and preferences.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Calendar className="h-5 w-5" />
              <span>Checking therapist availability</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <MapPin className="h-5 w-5" />
              <span>Finding therapists in your area</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Clock className="h-5 w-5" />
              <span>Matching session preferences</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="mb-10">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-[#78afeb] transition-all duration-500 ease-out"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-[#78afeb]">
            {questions[currentQuestion].text}
          </h2>
          {questions[currentQuestion].description && (
            <p className="text-gray-600">
              {questions[currentQuestion].description}
            </p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300
                ${
                  isOptionSelected(option)
                    ? "border-blue-600 bg-purple-50 text-blue-900 shadow-md transform scale-[1.02]"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300
              ${
                currentQuestion === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl transition-all duration-300
              ${
                canProceed()
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:opacity-90 transform hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <span>
              {currentQuestion === questions.length - 1
                ? "Find Matches"
                : "Next"}
            </span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
