"use client";

import { title } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../hooks/useApi";
import type { Recipe, GenerateRecipeParams } from "../types/api";
import { Button, type ButtonProps } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Divider } from "@heroui/divider";
import { Alert } from "@heroui/alert";

type PreferenceKey = keyof GenerateRecipeParams['preferences'];

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
  const handleGenerateRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Clean the form data before sending
      const cleanFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(Boolean), // Remove empty strings
        preferences: Object.fromEntries(
          Object.entries(formData.preferences).filter(([_, value]) => value)
        )
      };

      const recipe = await recipes.generateRecipe(cleanFormData);
      
      // Ensure the recipe object is serializable
      const safeRecipe = {
        ...recipe,
        id: recipe.id || Date.now().toString(), // Ensure there's an ID
        ingredients: recipe.ingredients.map(ing => ({
          item: String(ing.item),
          quantity: String(ing.quantity)
        })),
        instructions: recipe.instructions.map(String),
        cookingTime: Number(recipe.cookingTime),
        difficulty: String(recipe.difficulty)
      };

      setRecipeHistory(prev => [safeRecipe, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe');
      console.error('Recipe generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle saving recipe
  const handleSaveRecipe = async (recipeId: Recipe['id']) => {
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
  const handleFavoriteRecipe = async (recipeId: Recipe['id']) => {
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
  const handleFormChange = <K extends keyof GenerateRecipeParams>(
    field: K, 
    value: GenerateRecipeParams[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Type the button props
  const generateButtonProps: ButtonProps = {
    size: "lg",
    variant: "solid",
    disabled: isGenerating,
    className: "bg-blue-600 hover:bg-blue-700 text-white"
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
      <div className="w-full max-w-[2000px] mx-auto px-6 pt-24 pb-12">
        {error && (
          <Alert 
            color="danger"
            className="mb-6 dark:bg-red-900/20"
          >
            {error}
          </Alert>
        )}

        <header className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Welcome, {name}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your recipes and discover new ones tailored to your preferences.
          </p>
        </header>

        {/* Recipe Generation Form */}
        <div className="mb-12">
          <Button
            {...generateButtonProps}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => setShowForm(!showForm)}
          >
            {isGenerating ? "Generating..." : showForm ? "Hide Form" : "Generate New Recipe"}
          </Button>

          {showForm && (
            <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate a Custom Recipe
              </h2>
              <form onSubmit={handleGenerateRecipe} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Available Ingredients
                  </label>
                  <Textarea
                    placeholder="List ingredients (comma separated)"
                    value={formData.ingredients.join(", ")}
                    onChange={(e) => handleFormChange("ingredients", e.target.value.split(",").map(i => i.trim()))}
                    rows={4}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cooking Skill Level
                  </label>
                  <Select
                    value={String(formData.skillLevel)}
                    onChange={(value) => handleFormChange("skillLevel", Number(value))}
                  >
                    <SelectItem value="1">Beginner</SelectItem>
                    <SelectItem value="2">Intermediate</SelectItem>
                    <SelectItem value="3">Advanced</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dietary Preferences
                  </label>
                  <div className="space-y-3">
                    {Object.entries(formData.preferences || {}).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <Switch
                          checked={value}
                          onChange={(checked) => handleFormChange("preferences", {
                            ...formData.preferences,
                            [key]: checked
                          })}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  {...generateButtonProps}
                >
                  {isGenerating ? "Generating..." : "Generate Recipe"}
                </Button>
              </form>
            </Card>
          )}
        </div>

        {/* Recipe History */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {recipeHistory.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {recipe.name}
                </h3>
                
                <div className="space-y-4">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ingredients
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>• {ing.quantity} {ing.item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Instructions
                    </h4>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Recipe Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300">Time: </span>
                      <span className="text-gray-600 dark:text-gray-400">{recipe.cookingTime}m</span>
                    </div>
                    <div>
                      <span className="text-gray-700 dark:text-gray-300">Difficulty: </span>
                      <span className="text-gray-600 dark:text-gray-400">{recipe.difficulty}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleSaveRecipe(recipe.id)}
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleFavoriteRecipe(recipe.id)}
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      ★ Favorite
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
