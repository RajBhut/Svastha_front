import React from "react";

import { Clock } from "lucide-react";

export function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {article.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
      </div>
    </div>
  );
}
