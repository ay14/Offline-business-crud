import React, { useState } from "react";

const BusinesswithArticlesForm = () => {
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
    <form onSubmit={handleSubmit}>
      <h2>Create Business with Articles</h2>

      <label>Business Name:</label>
      <input
        type="text"
        value={businessName}
        onChange={handleBusinessChange}
        required
      />

      <h3>Articles</h3>
      {articles.map((article, idx) => (
        <div key={idx} style={{ marginBottom: "1em" }}>
          <input
            type="text"
            placeholder="Article Name"
            value={article.name}
            onChange={(e) => handleArticleChange(idx, "name", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Qty"
            value={article.qty}
            onChange={(e) => handleArticleChange(idx, "qty", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Selling Price"
            step="0.01"
            value={article.selling_price}
            onChange={(e) =>
              handleArticleChange(idx, "selling_price", e.target.value)
            }
            required
          />
          {articles.length > 1 && (
            <button type="button" onClick={() => removeArticle(idx)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addArticle}>
        Add Article
      </button>
      <br />
      <br />
      <button type="submit">Submit All</button>
    </form>
  );
};

export default BusinesswithArticlesForm;
