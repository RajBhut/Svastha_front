import React from "react";
import { Calendar, Clock, Video, Phone, MapPin } from "lucide-react";

function ScheduledConsultations({ consultations }) {
  return (
    <div className="mb-16 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Your Upcoming Sessions
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100
                     transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={consultation.therapistImage}
                alt={consultation.therapistName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-xl text-gray-900">
                  {consultation.therapistName}
                </h3>
                <div className="flex items-center space-x-3 text-gray-600 mt-1">
                  {consultation.format === "Video" && (
                    <Video className="h-4 w-4" />
                  )}
                  {consultation.format === "Phone" && (
                    <Phone className="h-4 w-4" />
                  )}
                  {consultation.format === "In-person" && (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span>{consultation.format} Session</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>
                  {new Date(consultation.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{consultation.time}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium
                               hover:bg-blue-100 transition-colors duration-200"
              >
                Reschedule
              </button>
              <button
                className="flex-1 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl font-medium
                               hover:bg-blue-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduledConsultations;
