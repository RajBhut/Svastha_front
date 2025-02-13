import React, { useState } from "react";
import { Search, Tag } from "lucide-react";

const Res = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: "1",
      title: "Common Myths about Mental Health",
      excerpt:
        "Busting common myths surrounding mental health and addressing misconceptions.",
      content:
        "Children can experience anxiety, depression, ADHD, and other mental health challenges...",
      category: "Mental Health",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Myths on Sexual Wellness",
      excerpt: "Debunking common misconceptions surrounding sexual health.",
      content: "Common myths on sexual wellness that need to be addressed...",
      category: "Sexual Wellness",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "Overcoming Addiction",
      excerpt:
        "A comprehensive guide to overcoming addiction with proven strategies.",
      content:
        "Steps to overcome addiction and create a supportive environment...",
      category: "Addiction Recovery",
      readTime: "5 min read",
    },
  ];

  const categories = [
    "All",
    ...new Set(articles.map((article) => article.category)),
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Mental Health Resources
          </h1>

          {/* Search and Filter Section */}
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>

                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Res;
