import React, { useState, useEffect } from "react";
import { useDb } from "../context/DbContext";
import ArticlesModal from "../components/ArticlesModal";
import { useNavigate } from "react-router-dom";

const BusinessList = () => {
  const db = useDb();
  const navigate = useNavigate();
  const [State, setState] = useState({
    businesses: [],
    articlesMap: {},
    selectedBusiness: null,
  });
  const { businesses, articlesMap, selectedBusiness } = State;

  useEffect(() => {
    if (!db) return;

    const sub = db.businesses.find().$.subscribe(async (businessDocs) => {
      const businessesData = businessDocs.map((doc) => doc.toJSON());
      setState((prev) => ({
        ...prev,
        businesses: businessesData,
      }));

      const map = {};
      for (const business of businessesData) {
        const articles = await db.articles
          .find()
          .where("business_id")
          .eq(business.id)
          .exec();
        map[business.id] = articles.map((a) => a.toJSON());
      }
      setState((prev) => ({
        ...prev,
        articlesMap: map,
      }));
    });

    return () => sub.unsubscribe();
  }, [db]);

  const handleBusiness = (businessId) => {
    if (!businessId) return;

    setState((prev) => ({
      ...prev,
      selectedBusiness: {
        ...prev.businesses.find((b) => b.id === businessId),
        articles: articlesMap[businessId] || [],
      },
    }));
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Business List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/add-business")}
        >
          + Add Business
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Business Name</th>
            <th className="p-3 border-b">Articles Number</th>
          </tr>
        </thead>
        <tbody>
          {businesses.length > 0 ? (
            businesses.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{b.name}</td>
                <td className="p-3 border-b">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => handleBusiness(b.id)}
                  >
                    {articlesMap[b.id]?.length || 0} Article(s)
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No Data Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBusiness && (
        <ArticlesModal
          business={selectedBusiness}
          onClose={() =>
            setState((prev) => ({ ...prev, selectedBusiness: null }))
          }
        />
      )}
    </div>
  );
};

export default BusinessList;
