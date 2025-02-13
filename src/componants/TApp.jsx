import React, { useState } from "react";
import Questionnaire from "./Questionnaire";
import ScheduledConsultations from "./ScheduledConsultations";

function TApp() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const scheduledConsultations = [
    {
      id: 1,
      therapistName: "Dr. Sarah Johnson",
      therapistImage:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
      date: "2024-03-20",
      time: "10:00 AM",
      format: "Video",
    },
    {
      id: 2,
      therapistName: "Dr. Michael Chen",
      therapistImage:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
      date: "2024-03-22",
      time: "2:00 PM",
      format: "In-person",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {!showQuestionnaire ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Find Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Perfect Therapist
              </span>
              Today
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Begin your journey to better mental health with our intelligent
              matching system. We'll connect you with a therapist who truly
              understands your needs.
            </p>
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-6 rounded-2xl 
                       text-xl font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl"
            >
              Find Your Match
              <span className="block text-sm opacity-80 mt-1">
                Takes about 5 minutes
              </span>
            </button>
          </div>

          {scheduledConsultations.length > 0 && (
            <ScheduledConsultations consultations={scheduledConsultations} />
          )}

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <p className="text-5xl font-bold text-blue-800 mb-3">1000+</p>
              <p className="text-gray-700 text-lg">Licensed Therapists</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <p className="text-5xl font-bold text-blue-800 mb-3">15,000+</p>
              <p className="text-gray-700 text-lg">Successful Matches</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <p className="text-5xl font-bold text-blue-800 mb-3">98%</p>
              <p className="text-gray-700 text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </main>
      ) : (
        <Questionnaire />
      )}
    </div>
  );
}

export default TApp;
