export async function loadArticlesFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Failed to load articles file");
    }
    const text = await response.text();
    return parseArticles(text);
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}

function parseArticles(fileContent) {
  const articleSections = fileContent
    .split("---")
    .filter((section) => section.trim());

  return articleSections.map((section, index) => {
    const lines = section.trim().split("\n");
    const articleData = {};

    let currentField = "";
    let content = [];

    for (const line of lines) {
      if (line.startsWith("TITLE: ")) {
        articleData.title = line.replace("TITLE: ", "").trim();
      } else if (line.startsWith("EXCERPT: ")) {
        articleData.excerpt = line.replace("EXCERPT: ", "").trim();
      } else if (line.startsWith("CATEGORY: ")) {
        articleData.category = line.replace("CATEGORY: ", "").trim();
      } else if (line.startsWith("IMAGE: ")) {
        articleData.imageUrl = line.replace("IMAGE: ", "").trim();
      } else if (line.startsWith("READ_TIME: ")) {
        articleData.readTime = line.replace("READ_TIME: ", "").trim();
      } else if (line.startsWith("CONTENT:")) {
        currentField = "content";
      } else if (currentField === "content") {
        content.push(line);
      }
    }

    return {
      id: (index + 1).toString(),
      title: articleData.title || "Untitled Article",
      excerpt: articleData.excerpt || "",
      content: content.join("\n").trim(),
      imageUrl:
        articleData.imageUrl ||
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: articleData.category || "Uncategorized",
      readTime: articleData.readTime || "5 min read",
    };
  });
}
