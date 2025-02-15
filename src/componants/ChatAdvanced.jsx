import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, Cross } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
const ChatAdvanced = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const CHAT_URL = import.meta.env.VITE_CHAT_API_URL;
  const [sessionId] = useState(() => {
    const existingId = localStorage.getItem("chatSessionId");
    if (existingId) return existingId;

    const newId = uuidv4();
    localStorage.setItem("chatSessionId", newId);
    return newId;
  });
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! describe your Health condition",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetch_hist = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/hist/${28}`);
    } catch (error) {}
  };

  useEffect(() => {
    fetch_hist();
    if (!isAuthenticated) {
      // navigate("/");
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function cleanAPIResponse(response) {
    try {
      let cleanedText = response.response;

      cleanedText = cleanedText.replace(/^Assistant:\s*/i, "");

      cleanedText = cleanedText.replace(/\\n/g, "\n");
      cleanedText = cleanedText.replace(/\n{3,}/g, "\n\n");

      cleanedText = cleanedText.trim().replace(/^["']|["']$/g, "");

      const assistantIndex = cleanedText.indexOf("Assistant:");
      if (assistantIndex !== -1) {
        cleanedText = cleanedText.substring(
          assistantIndex + "Assistant:".length
        );
      }

      return cleanedText.trim();
    } catch (error) {
      console.error("Error cleaning API response:", error);
      return "I apologize, but I had trouble processing that response.";
    }
  }
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: inputMessage }]);
    const im = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://9892-35-196-55-140.ngrok-free.app/diagnose/questions`,
        {
          user_message: inputMessage,
          user_id: sessionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const cleanedResponse = cleanAPIResponse(response.data);
      // await axios.post(`http://localhost:3000/api/hist/${28}`, {
      //   type: "user",
      //   msg: im,
      // });
      // await axios.post(`http://localhost:3000/api/hist/${28}`, {
      //   type: "bot",
      //   msg: cleanedResponse,
      // });
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: cleanedResponse,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "I apologize, but I'm having trouble processing your message right now. Could you try again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-3">
            <Bot className="text-white w-8 h-8" />
            <h1 className="text-white text-2xl font-semibold">Svastha Sathi</h1>
            <button className="text-white ml-auto hover:bg-white/20 rounded-full p-1">
              <Link to="/">
                <Cross className="rotate-45" size={18} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh)]">
        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4 max-w-full mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl shadow-sm ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p
                        style={{ whiteSpace: "pre-wrap" }}
                        className="text-sm md:text-base"
                      >
                        {message.content}
                      </p>
                    </div>
                    {message.type === "user" ? (
                      <User className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Bot className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAdvanced;
