"use client";
import { useEffect, useState } from 'react';

// Define the shape of our menu items
interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This fetches data directly from your ECS Fargate containers via the ALB!
    fetch(`/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-stone-50">
      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-bold mb-12 text-stone-800 text-center border-b pb-6">
          Cloud Coffee Shop
        </h1>
        
        {loading ? (
          <p className="text-center text-xl text-stone-500">Brewing your menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-stone-800">{item.name}</h2>
                  <span className="text-xl text-emerald-600 font-medium">${item.price.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 bg-stone-900 text-white px-4 py-3 rounded-lg hover:bg-stone-700 transition font-medium">
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}