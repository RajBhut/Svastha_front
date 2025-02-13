import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, Cross } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const ChatMain = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const CHAT_URL = import.meta.env.VITE_CHAT_API_URL;
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm here to help you on your mental health journey. How are you feeling today?",
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
      console.log(res.data);
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
      const parsed =
        typeof response === "string" ? JSON.parse(response) : response;

      const responseText = parsed.response;

      const outputIndex = responseText.indexOf("Output:");

      if (outputIndex === -1) {
        throw new Error("Output section not found in response");
      }

      let cleanedText = responseText.substring(outputIndex + "Output:".length);

      cleanedText = cleanedText.replace(/\\n/g, "\n");

      cleanedText = cleanedText.replace(/\n{3,}/g, "\n\n");

      cleanedText = cleanedText.trim();

      return cleanedText;
    } catch (error) {
      console.error("Error cleaning API response:", error);
      return null;
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
        `${CHAT_URL}`,
        {
          patient_narrative: inputMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const cleanedResponse = cleanAPIResponse(response.data);
      await axios.post(`http://localhost:3000/api/hist/${28}`, {
        type: "user",
        msg: im,
      });
      await axios.post(`http://localhost:3000/api/hist/${28}`, {
        type: "bot",
        msg: cleanedResponse,
      });
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: cleanedResponse,
        },
      ]);
      const r = cleanedResponse;
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
    <div className="min-h-screen bg-[#e5c3b9]">
      <div className="bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-3">
            <Bot className="text-white w-8 h-8" />
            <h1 className="text-white text-2xl font-semibold">
              Svastha Assistant
            </h1>

            <button className="text-white  ml-auto hover:bg-white/20 rounded-full p-1">
              <Link to="/">
                <Cross className=" rotate-45" size={18} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-10px)]">
        <div className="bg-white/95 rounded-2xl shadow-xl h-full flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto bg-[#fff5e9]/20">
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
                      className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-[#ffb4b4] text-[#1a1a4d]"
                          : "bg-[#89e0e0] text-white"
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
                      <User className="w-6 h-6 text-[#ffb4b4]" />
                    ) : (
                      <Bot className="w-6 h-6 text-[#89e0e0]" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#89e0e0] p-3 rounded-lg">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#89e0e0] bg-[#fff5e9]/30 text-base"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-full bg-[#66c7c7] text-white hover:bg-[#89e0e0] transition-colors"
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

export default ChatMain;
