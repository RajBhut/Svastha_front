import React, { useState, useRef, useEffect } from "react";
import { Cloud, Cross, CrossIcon, Star } from "lucide-react";
import { TiCancel } from "react-icons/ti";

const ChatbotUI = ({ open_chat, set_open_chat }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello, How can I help you?",
    },
    {
      type: "user",
      content: "I am feeling low today.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [...prev, { type: "bot", content: inputMessage }]);
    setInputMessage("");
  };

  return open_chat ? (
    <div className="fixed bottom-4 right-4 transition-all duration-300 w-[300px]">
      <div className="flex flex-col h-[400px] bg-white/95 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#66c7c7] to-[#89e0e0] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="text-white w-5 h-5" />
              <h2 className="text-white font-semibold">Svastha Assistant</h2>
            </div>
            <button
              onClick={() => set_open_chat(false)}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              <CrossIcon className="rotate-45" size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto bg-[#fff5e9]/20">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "bot" ? "justify-end" : ""
                }`}
              >
                <div
                  className={`flex items-start gap-1.5 max-w-[85%] ${
                    message.type === "bot" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.type === "bot"
                        ? "bg-[#ffb4b4] text-[#1a1a4d]"
                        : "bg-[#89e0e0] text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.type === "bot" ? (
                    <Cloud className="w-5 h-5 text-[#ffb4b4]" />
                  ) : (
                    <Star className="w-5 h-5 text-[#89e0e0]" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-3 bg-[#fff5e9]">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#89e0e0]"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ChatbotUI;
