import React from "react";
import {
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  User2,
} from "lucide-react";

// Mock sessions data - replace with actual API calls
const mockSessions = [
  {
    id: "1",
    date: "2024-03-15",
    duration: "50 minutes",
    type: "regular",
    notes: "Patient showed significant progress in managing anxiety symptoms.",
    progress: "improved",
  },
  {
    id: "2",
    date: "2024-03-08",
    duration: "50 minutes",
    type: "regular",
    notes: "Discussed coping mechanisms for work-related stress.",
    progress: "stable",
  },
];

export function PatientHistory({ patient }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Patient Overview */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {patient.name}
            </h2>
            <div className="mt-2 space-y-1 text-gray-600">
              <p className="flex items-center gap-2">
                <User2 size={16} />
                {patient.age} years old • {patient.gender}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                Started treatment: {patient.startDate}
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Total sessions: {patient.totalSessions}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              patient.status === "active"
                ? "bg-green-100 text-green-800"
                : patient.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {patient.status}
          </span>
        </div>
      </div>

      {/* Treatment Information */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Treatment Information
        </h3>
        <div className="space-y-4">
          {patient.diagnosis && (
            <div>
              <h4 className="text-sm font-medium text-gray-600">Diagnosis</h4>
              <p className="mt-1 text-gray-800">{patient.diagnosis}</p>
            </div>
          )}
          {patient.treatmentPlan && (
            <div>
              <h4 className="text-sm font-medium text-gray-600">
                Treatment Plan
              </h4>
              <p className="mt-1 text-gray-800">{patient.treatmentPlan}</p>
            </div>
          )}
        </div>
      </div>

      {/* Session History */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Session History
        </h3>
        <div className="space-y-4">
          {mockSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="font-medium">{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {session.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <FileText size={16} className="text-gray-400 mt-1" />
                <p className="text-gray-700 text-sm flex-1">{session.notes}</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-gray-400" />
                <span
                  className={`text-sm ${
                    session.progress === "improved"
                      ? "text-green-600"
                      : session.progress === "stable"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  Progress: {session.progress}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
