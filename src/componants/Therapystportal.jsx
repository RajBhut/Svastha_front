import React, { useState } from "react";
import {
  Layout,
  Search,
  Menu,
  X,
  Users,
  Calendar,
  Settings,
  FileText,
  DoorOpenIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PatientList } from "./PatientList";
import { ChatHistory } from "./ChatHistory";
import { PatientHistory } from "./PatientHistory";
import { useNavigate } from "react-router-dom";
import VideoCall from "./VideoCall";

const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    age: 32,
    gender: "Male",
    lastChat: "2 hours ago",
    status: "active",
    nextSession: "Tomorrow, 2:00 PM",
    diagnosis: "Generalized Anxiety Disorder (GAD)",
    treatmentPlan:
      "Cognitive Behavioral Therapy (CBT) focused on anxiety management",
    startDate: "January 15, 2024",
    totalSessions: 8,
    notes: "Shows good progress in implementing coping strategies",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    age: 28,
    gender: "Female",
    lastChat: "1 day ago",
    status: "pending",
    nextSession: "March 25, 3:30 PM",
    diagnosis: "Major Depressive Disorder (MDD)",
    treatmentPlan: "Combination of CBT and mindfulness techniques",
    startDate: "February 1, 2024",
    totalSessions: 6,
    notes: "Responding well to mindfulness exercises",
  },
];

const mockMessages = [
  {
    id: "1",
    userId: "1",
    type: "user",
    content: "Ive been feeling anxious lately.",
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    type: "bot",
    content:
      "I understand that anxiety can be challenging. Can you tell me more about what s been causing these feelings?",
    createdAt: "2024-03-20T10:01:00Z",
  },
  {
    id: "3",
    userId: "1",
    type: "user",
    content: "Work has been really stressful, and I m having trouble sleeping.",
    createdAt: "2024-03-20T10:02:00Z",
  },
  {
    id: "4",
    userId: "1",
    type: "bot",
    content:
      "I hear you. Sleep difficulties can definitely make anxiety feel worse. Lets explore some relaxation techniques that might help you wind down before bed.",
    createdAt: "2024-03-20T10:03:00Z",
  },
];
function Therapystportal() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isInCall, setIsInCall] = useState(false);
  const sidebarItems = [
    { icon: Users, label: "Patients", action: () => {} },
    { icon: Calendar, label: "Schedule", action: () => {} },
    { icon: FileText, label: "Reports", action: () => {} },
    {
      icon: DoorOpenIcon,
      label: "Back",
      action: () => {
        navigate("/");
      },
    },
    // { icon: Settings, label: "Settings", action: () => {} },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed lg:relative w-64 h-screen bg-white border-r border-gray-200 shadow-lg z-40
              ${isSidebarOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Layout className="text-blue-600" size={28} />
                <span className="font-semibold text-xl text-gray-800">
                  TherapistDash
                </span>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={item.action}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsInCall(true)}
                className="px-6 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600"
              >
                Start Video Call
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-80 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="h-[calc(100vh-5rem)] overflow-y-auto">
            <PatientList
              patients={filteredPatients}
              onSelectPatient={setSelectedPatient}
              selectedPatientId={selectedPatient?.id}
            />
          </div>
        </div>

        {/* Patient Details and Chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedPatient ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-b border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {selectedPatient.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Next Session: {selectedPatient.nextSession}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowHistory(!showHistory)}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          showHistory
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                    >
                      {showHistory ? "View Chat" : "View History"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {showHistory ? (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full overflow-y-auto p-6"
                    >
                      <PatientHistory patient={selectedPatient} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ChatHistory messages={mockMessages} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Select a patient to view their information</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      {isInCall && <VideoCall onEndCall={() => setIsInCall(false)} />}
    </div>
  );
}

export default Therapystportal;
