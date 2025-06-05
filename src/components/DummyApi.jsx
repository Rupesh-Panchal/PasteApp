import React, { useEffect, useState } from "react";

const DummyApi = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with 1.5 second delay
    setTimeout(() => {
      // Create 30 dummy items
      const dummyData = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        title: `Dummy Title ${index + 1}`,
        content: `This is the dummy content for card ${index + 1}.`,
      }));

      setCards(dummyData);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading dummy cards...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gray-800 text-white p-4 rounded-xl shadow border border-gray-600"
        >
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DummyApi;
