"use client";

import { title } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HealthPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1
            className={title({
              class: "text-5xl font-extrabold text-gray-800",
            })}
          >
            Welcome, name!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your gateway to a healthier lifestyle. Manage your recipes, saved ideas, and meal history with ease.
          </p>
        </header>

        {/* Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Saved Section */}
          <SectionCard
            title="Saved Recipes"
            description="Easily access and organize your favorite recipes for quick meal planning."
          />

          {/* History Section */}
          <SectionCard
            title="My History"
            description="Track your past meals and keep a history of your meal plans."
          />
        </div>

        {/* Generate Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })}
          >
            {showForm ? "Hide Recipe Form" : "Generate a New Recipe"}
          </button>
        </div>

        {/* Recipe Form */}
        {showForm && (
          <div className="mt-12 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Generate a Custom Recipe
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form to get a personalized recipe suggestion.
            </p>
            <form className="space-y-4">
              {/* Meal Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meal Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., vegan, gluten-free, low carb"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Ingredients
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="List the ingredients you have available"
                ></textarea>
              </div>

              {/* Generate Recipe Submit */}
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Generate Recipe
              </button>
            </form>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className={buttonStyles({
              color: "secondary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// SectionCard Component
function SectionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}
