import React from "react";
import { Users, MessageCircle, Calendar } from "lucide-react";

export function PatientList({ patients, onSelectPatient, selectedPatientId }) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Users size={24} className="text-blue-600" />
          Patients
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedPatientId === patient.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onSelectPatient(patient)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{patient.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MessageCircle size={16} />
                  <span>Last chat: {patient.lastChat}</span>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
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
            {patient.nextSession && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <Calendar size={16} />
                <span>Next: {patient.nextSession}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
