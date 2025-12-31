import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        articles.map((article) => (
          <div className="card" key={article._id}>
            <h2>{article.title}</h2>
            <p><strong>Author:</strong> {article.author}</p>
            <p><strong>Date:</strong> {article.date}</p>

            <h3>Original Content</h3>
            <p>{article.content}</p>

            {article.updatedContent && (
              <>
                <h3>Updated Content (Phase 2)</h3>
                <p>{article.updatedContent}</p>

                {article.references && (
                  <>
                    <h4>References</h4>
                    <ul>
                      {article.references.map((ref, index) => (
                        <li key={index}>
                          <a href={ref} target="_blank" rel="noreferrer">
                            {ref}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
