import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDb } from "../context/DbContext";

const BusinesswithArticlesForm = () => {
  const db = useDb();
  const [State, setState] = useState({
    businessName: "",
    articles: [{ name: "", qty: "", selling_price: "" }],
  });
  const { businessName, articles } = State;

  const handleBusinessChange = (e) => {
    setState({ ...State, businessName: e.target.value });
  };

  const handleArticleChange = (index, field, value) => {
    const newArticles = [...State.articles];
    newArticles[index][field] = value;
    setState({ ...State, articles: newArticles });
  };

  const addArticle = () => {
    setState({
      ...State,
      articles: [...State.articles, { name: "", qty: "", selling_price: "" }],
    });
  };

  const removeArticle = (index) => {
    const newArticles = [...State.articles];
    newArticles.splice(index, 1);
    setState({ ...State, articles: newArticles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessId = uuidv4();

    try {
      await db.businesses.insert({
        id: businessId,
        name: State.businessName,
      });

      await Promise.all(
        State.articles.map((article) =>
          db.articles.insert({
            id: uuidv4(),
            name: article.name,
            qty: parseInt(article.qty),
            selling_price: parseFloat(article.selling_price),
            business_id: businessId,
          })
        )
      );

      alert("Submitted successfully!");
      setState({
        businessName: "",
        articles: [{ name: "", qty: "", selling_price: "" }],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Create Business with Articles
        </h2>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Business Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={businessName}
            onChange={handleBusinessChange}
            required
          />
        </div>

        <h3 className="text-xl font-medium mb-2 text-gray-600">Articles</h3>

        {articles.map((article, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4"
          >
            <input
              type="text"
              placeholder="Article Name"
              className="p-2 border border-gray-300 rounded-md"
              value={article.name}
              onChange={(e) => handleArticleChange(idx, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Qty"
              className="p-2 border border-gray-300 rounded-md"
              value={article.qty}
              onChange={(e) => handleArticleChange(idx, "qty", e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Selling Price"
              className="p-2 border border-gray-300 rounded-md"
              value={article.selling_price}
              onChange={(e) =>
                handleArticleChange(idx, "selling_price", e.target.value)
              }
              required
            />
            {articles.length > 1 && (
              <button
                type="button"
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={() => removeArticle(idx)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={addArticle}
          >
            + Add Article
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit All
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinesswithArticlesForm;
