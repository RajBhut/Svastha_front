import React, { useState } from "react";
import {
  Star,
  Video,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  Check,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ScheduleConsultation from "./ScheduleConsultation";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    approach: "CBT, Mindfulness",
    experience: "12 years",
    rating: 4.9,
    reviews: 127,
    nextAvailable: "Tomorrow",
    price: "$120-150",
    languages: ["English", "Spanish"],
    formats: ["Video", "Phone", "In-person"],
    education: [
      "Ph.D. in Clinical Psychology, Stanford University",
      "M.A. in Psychology, UCLA",
      "B.A. in Psychology, UC Berkeley",
    ],
    certifications: [
      "Licensed Clinical Psychologist",
      "Certified CBT Practitioner",
      "Trauma-Focused Therapy Certified",
    ],
    about:
      "Dr. Johnson specializes in helping individuals overcome anxiety, depression, and trauma through evidence-based approaches. With over 12 years of experience, she combines cognitive-behavioral therapy with mindfulness techniques to create personalized treatment plans that address each client's unique needs.",
    publications: [
      "The Role of Mindfulness in Anxiety Treatment (2022)",
      "Modern Approaches to Trauma Therapy (2021)",
      "Understanding Depression in Young Adults (2020)",
    ],
  },
  // ... other therapists
];

function TherapistResults({ answers }) {
  const [selectedTherapist, setSelectedTherapist] = useState < any > null;
  const [expandedTherapist, setExpandedTherapist] =
    (useState < number) | (null > null);

  if (selectedTherapist) {
    return (
      <ScheduleConsultation
        therapist={selectedTherapist}
        onBack={() => setSelectedTherapist(null)}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
        Your Perfect Therapeutic Matches
      </h1>
      <p className="text-gray-600 mb-12 text-center text-lg max-w-3xl mx-auto">
        Based on your responses, we've carefully selected these therapists who
        align with your needs, preferences, and therapeutic goals.
      </p>

      <div className="space-y-8">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-48 md:h-64 object-cover rounded-xl mb-4"
                />
                <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-semibold">{therapist.rating}</span>
                  <span className="text-gray-600 text-sm">
                    ({therapist.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {therapist.experience} experience
                </p>
              </div>

              {/* Therapist Details */}
              <div className="md:w-3/4">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {therapist.name}
                    </h2>
                    <p className="text-blue-700 font-medium">
                      {therapist.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {therapist.price}
                    </p>
                    <p className="text-sm text-gray-600">per session</p>
                  </div>
                </div>

                {/* Specialties & Approach */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Session Formats */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Available Formats</h3>
                  <div className="flex space-x-4">
                    {therapist.formats.includes("Video") && (
                      <div className="flex items-center text-gray-600">
                        <Video className="h-5 w-5 mr-1" />
                        <span>Video</span>
                      </div>
                    )}
                    {therapist.formats.includes("Phone") && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 mr-1" />
                        <span>Phone</span>
                      </div>
                    )}
                    {therapist.formats.includes("In-person") && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-1" />
                        <span>In-person</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages & Availability */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                  <div>
                    <h3 className="font-semibold mb-1">Languages</h3>
                    <p className="text-gray-600">
                      {therapist.languages.join(", ")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Next Available</h3>
                    <p className="text-gray-600">{therapist.nextAvailable}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTherapist === therapist.id && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">About</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {therapist.about}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Education</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {therapist.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Certifications</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {therapist.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Publications</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {therapist.publications.map((pub, index) => (
                            <li key={index}>{pub}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => setSelectedTherapist(therapist)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl
                             font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                  >
                    Schedule Consultation
                  </button>
                  <button
                    onClick={() =>
                      setExpandedTherapist(
                        expandedTherapist === therapist.id ? null : therapist.id
                      )
                    }
                    className="border-2 border-blue-600 text-blue-700 px-6 py-3 rounded-xl
                             font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>
                      {expandedTherapist === therapist.id
                        ? "View Less"
                        : "View Full Profile"}
                    </span>
                    {expandedTherapist === therapist.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistResults;
