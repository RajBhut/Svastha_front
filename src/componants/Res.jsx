import React, { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { ArticleView } from "./ArticleView";

import { BookOpen } from "lucide-react";
import { loadArticlesFromFile } from "../utils/articleLoader";

function Res() {
  const [selectedArticle, setSelectedArticle] = useState();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticlesFromFile("/src/data/articles.txt")
      .then((loadedArticles) => {
        setArticles(loadedArticles);
      })
      .catch((error) => {
        console.error("Failed to load articles:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of articles and guides to support your
              mental well-being journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Res;
