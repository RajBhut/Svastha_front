import React from "react";

import { ArrowLeft, Clock } from "lucide-react";

export function ArticleView({ article, onBack }) {
  // Function to process content and handle different formatting
  const renderContent = (content) => {
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph is a title (ends with a colon)
      if (paragraph.includes(":")) {
        const [title, ...rest] = paragraph.split(":");
        return (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {title.trim()}
            </h2>
            {rest.length > 0 && (
              <p className="text-gray-700 leading-relaxed">
                {rest.join(":").trim()}
              </p>
            )}
          </div>
        );
      }

      // Handle regular paragraphs
      return (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Resources
      </button>

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg"
      />

      <div className="flex items-center justify-between mb-6">
        <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {article.category}
        </span>
        <div className="flex items-center text-gray-500">
          <Clock className="w-5 h-5 mr-1" />
          {article.readTime}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

      <div className="prose prose-lg max-w-none">
        {renderContent(article.content)}
      </div>
    </div>
  );
}
