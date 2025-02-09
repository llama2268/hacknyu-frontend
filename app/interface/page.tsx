"use client";

import { title } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function HealthPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("Alex");

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-teal-100 to-blue-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1
            className={title({
              class: "text-5xl font-extrabold text-gray-800",
            })}
          >
            Welcome, {name}!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your gateway to a healthier lifestyle. Manage your recipes, saved ideas, and meal history with ease.
          </p>
        </header>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Saved Recipes
          </h2>
          <p className="text-gray-600 mb-4">
            Easily access and organize your favorite recipes for quick meal planning.
          </p>
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium rounded-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            View Saved Recipes
          </button>
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            My History
          </h2>
          <p className="text-gray-600 mb-4">
            Track your past meals and keep a history of your meal plans.
          </p>
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            View My History
          </button>
        </section>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`${buttonStyles({
              color: "primary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })} transform hover:scale-105 hover:shadow-lg transition-transform duration-300`}
          >
            {showForm ? "Hide Recipe Form" : "Generate a New Recipe"}
          </button>
        </div>

        {showForm && (
          <div className="mt-12 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto animate-slideIn">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Generate a Custom Recipe
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form to get a personalized recipe suggestion.
            </p>
            <form className="space-y-4">
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

              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-105 hover:shadow-lg transition-transform duration-300"
              >
                Generate Recipe
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className={`${buttonStyles({
              color: "secondary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })} flex items-center gap-2 transform hover:scale-105 hover:shadow-lg transition-transform duration-300`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
