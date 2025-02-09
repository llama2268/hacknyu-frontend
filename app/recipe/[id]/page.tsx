"use client";

import { useApi } from "@/app/hooks/useApi";
import { useState, useEffect } from "react";
import { Recipe } from "@/app/types/api";

export default function RecipePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { recipes } = useApi();
  const getRecipe = recipes.getRecipe;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id, getRecipe]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-700 mb-6">{recipe.image}</p>

      <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {recipe.ingredients}
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
      <ol className="list-decimal list-inside">
        {recipe.instructions}
      </ol>
    </div>
  );
}