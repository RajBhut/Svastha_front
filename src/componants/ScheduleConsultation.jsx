import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Check,
} from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const nextWeekDates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date;
});

function ScheduleConsultation({ therapist, onBack }) {
  const [selectedDate, setSelectedDate] = (useState < Date) | (null > null);
  const [selectedTime, setSelectedTime] = (useState < string) | (null > null);
  const [selectedFormat, setSelectedFormat] =
    (useState < string) | (null > null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Simulate redirect after 3 seconds
    setTimeout(() => {
      setIsRedirecting(true);
      // Reload the page after a brief delay to simulate redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }, 3000);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
          <div
            className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full 
                         flex items-center justify-center mx-auto mb-8 animate-bounce"
          >
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            Consultation Scheduled!
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your consultation with {therapist.name} has been confirmed for{" "}
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </p>
          <div className="space-y-4 text-left bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center space-x-2 text-gray-700">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              {selectedFormat === "Video" && (
                <Video className="h-5 w-5 text-blue-600" />
              )}
              {selectedFormat === "Phone" && (
                <Phone className="h-5 w-5 text-blue-600" />
              )}
              {selectedFormat === "In-person" && (
                <MapPin className="h-5 w-5 text-blue-600" />
              )}
              <span>{selectedFormat} Session</span>
            </div>
          </div>
          {isRedirecting && (
            <p className="text-gray-600 mt-8 animate-pulse">
              Redirecting to home page...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 mb-8 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Therapist List</span>
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
          Schedule Consultation with {therapist.name}
        </h2>

        {/* Date Selection */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Select a Date</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {nextWeekDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-300
                  ${
                    date === selectedDate
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                <div className="font-medium">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-sm text-gray-600">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Select a Time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-xl border-2 transition-all duration-300
                  ${
                    time === selectedTime
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Select Session Format</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {therapist.formats.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`p-4 rounded-xl border-2 flex items-center justify-center space-x-2
                  transition-all duration-300
                  ${
                    format === selectedFormat
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                {format === "Video" && <Video className="h-5 w-5" />}
                {format === "Phone" && <Phone className="h-5 w-5" />}
                {format === "In-person" && <MapPin className="h-5 w-5" />}
                <span>{format}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime || !selectedFormat}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-300
            ${
              selectedDate && selectedTime && selectedFormat
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          Confirm Consultation
        </button>
      </div>
    </div>
  );
}

export default ScheduleConsultation;
