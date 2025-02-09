"use client";

import { title } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../hooks/useApi";
import { Recipe, GenerateRecipeParams } from "../types/api";

export default function HealthPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { recipes, user: userApi, fitness: fitnessApi } = useApi();
  
  // State variables
  const [name, setName] = useState(user?.name || "Guest");
  const [showForm, setShowForm] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [recipeHistory, setRecipeHistory] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<GenerateRecipeParams>({
    ingredients: [],
    skillLevel: 2,
    preferences: {
      vegetarian: false,
      vegan: false,
      lowCarb: false,
      highProtein: false
    },
    maxCookingTime: 60
  });

  // Fetch saved recipes and history on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [saved, history] = await Promise.all([
          userApi.getSavedRecipes(),
          userApi.getRecipeHistory()
        ]);
        setSavedRecipes(saved);
        setRecipeHistory(history);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, userApi]);

  // Handle recipe generation
  const handleGenerateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      // Check if user has fitness goals
      const fitnessGoals = await fitnessApi.getFitnessGoals();
      if (!fitnessGoals) {
        setError('Please set your fitness goals before generating recipes');
        return;
      }

      const recipe = await recipes.generateRecipe(formData);
      setRecipeHistory(prev => [recipe, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe');
      console.error('Recipe generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle saving recipe
  const handleSaveRecipe = async (recipeId: string) => {
    try {
      await recipes.saveRecipe(recipeId);
      // Optimistically update UI
      const recipe = [...recipeHistory, ...savedRecipes]
        .find(r => r.id === recipeId);
      if (recipe) {
        setSavedRecipes(prev => [recipe, ...prev]);
      }
    } catch (err) {
      setError('Failed to save recipe');
      console.error(err);
    }
  };

  // Handle favoriting recipe
  const handleFavoriteRecipe = async (recipeId: string) => {
    try {
      await recipes.favoriteRecipe(recipeId);
      // You might want to refresh saved recipes here
      const updated = await userApi.getSavedRecipes();
      setSavedRecipes(updated);
    } catch (err) {
      setError('Failed to favorite recipe');
      console.error(err);
    }
  };

  // Handle form changes
  const handleFormChange = (field: keyof GenerateRecipeParams, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-teal-100 to-blue-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Show error message if exists */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <header className="mb-12 text-center">
          <h1 className={title({ class: "text-5xl font-extrabold text-gray-800" })}>
            Welcome, {name}!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your gateway to a healthier lifestyle. Manage your recipes, saved ideas, and meal history with ease.
          </p>
        </header>

        {/* Saved Recipes Section */}
        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Saved Recipes ({savedRecipes.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.ingredients}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleFavoriteRecipe(recipe.id)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    ★ Favorite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recipe History Section */}
        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            My History ({recipeHistory.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipeHistory.map((recipe) => (
              <div key={recipe.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{recipe.name}</h3>
                <p className="text-sm text-gray-600">{recipe.ingredients}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleSaveRecipe(recipe.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Save Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recipe Generation Form */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={isGenerating}
            className={`${buttonStyles({
              color: "primary",
              radius: "full",
              size: "lg",
              variant: "shadow",
            })} transform hover:scale-105 hover:shadow-lg transition-transform duration-300`}
          >
            {isGenerating ? "Generating..." : showForm ? "Hide Recipe Form" : "Generate a New Recipe"}
          </button>
        </div>

        {showForm && (
          <div className="mt-12 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto animate-slideIn">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Generate a Custom Recipe
            </h2>
            <form onSubmit={handleGenerateRecipe} className="space-y-4">
              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Ingredients
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="List the ingredients you have available"
                  value={formData.ingredients.join(", ")}
                  onChange={(e) => handleFormChange("ingredients", e.target.value.split(",").map(i => i.trim()))}
                />
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cooking Skill Level
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  value={formData.skillLevel}
                  onChange={(e) => handleFormChange("skillLevel", parseInt(e.target.value))}
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                </select>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences
                </label>
                <div className="space-y-2">
                  {Object.entries(formData.preferences || {}).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleFormChange("preferences", {
                          ...formData.preferences,
                          [key]: e.target.checked
                        })}
                      />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Cooking Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  value={formData.maxCookingTime}
                  onChange={(e) => handleFormChange("maxCookingTime", parseInt(e.target.value))}
                  min={0}
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-105 hover:shadow-lg transition-transform duration-300 disabled:opacity-50"
              >
                {isGenerating ? "Generating Recipe..." : "Generate Recipe"}
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
            })} flex items-center gap-2`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
