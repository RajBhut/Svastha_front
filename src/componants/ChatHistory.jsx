import React from "react";
import { format } from "date-fns";
import { Bot, User, Calendar, Clock, AlertCircle } from "lucide-react";

export function ChatHistory({ messages, onAnalyze }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Analysis Header */}
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <span className="text-sm text-gray-600">
                First interaction:
                {format(
                  new Date(messages[0]?.createdAt || new Date()),
                  "MMM d, yyyy"
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <span className="text-sm text-gray-600">
                Total messages: {messages.length}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-blue-600" />
            <span className="text-sm text-gray-600">
              Sentiment analysis available
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === "bot" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === "bot" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {message.type === "bot" ? (
                <Bot size={20} className="text-blue-600" />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
            <div className="flex-1 max-w-[70%]">
              <div
                className={`rounded-lg p-3 ${
                  message.type === "bot"
                    ? "bg-white border border-gray-200"
                    : "bg-blue-600 text-white"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.type === "bot" ? "text-gray-500" : "text-blue-100"
                  }`}
                >
                  {format(new Date(message.createdAt), "MMM d, yyyy HH:mm")}
                </span>
              </div>
              {message.type === "user" && (
                <button
                  onClick={() => onAnalyze?.(message)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  Analyze sentiment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
