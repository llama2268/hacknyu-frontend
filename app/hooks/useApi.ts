import { useAuth } from '@/contexts/AuthContext';
import { Recipe, FitnessGoals, GenerateRecipeParams } from '@/types/api';

const API_BASE_URL = 'http://localhost:3000';

export function useApi() {
  const { token } = useAuth();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Recipe endpoints
  const recipeApi = {
    getAllRecipes: async (): Promise<Recipe[]> => {
      const response = await fetch(`${API_BASE_URL}/recipes`, { headers });
      if (!response.ok) throw new Error('Failed to fetch recipes');
      return response.json();
    },

    getRecipe: async (id: string): Promise<Recipe> => {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch recipe');
      return response.json();
    },

    generateRecipe: async (params: GenerateRecipeParams): Promise<Recipe> => {
      const response = await fetch(`${API_BASE_URL}/recipes/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error('Failed to generate recipe');
      return response.json();
    },

    saveRecipe: async (recipeId: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/save`, {
        method: 'POST',
        headers,
      });
      if (!response.ok) throw new Error('Failed to save recipe');
    },
  };

  // User endpoints
  const userApi = {
    getSavedRecipes: async (): Promise<Recipe[]> => {
      const response = await fetch(`${API_BASE_URL}/user/saved-recipes`, { headers });
      if (!response.ok) throw new Error('Failed to fetch saved recipes');
      return response.json();
    },

    getRecipeHistory: async (): Promise<Recipe[]> => {
      const response = await fetch(`${API_BASE_URL}/user/recipe-history`, { headers });
      if (!response.ok) throw new Error('Failed to fetch recipe history');
      return response.json();
    },
  };

  // Fitness endpoints
  const fitnessApi = {
    getFitnessGoals: async (): Promise<FitnessGoals> => {
      const response = await fetch(`${API_BASE_URL}/fitness/goals`, { headers });
      if (!response.ok) throw new Error('Failed to fetch fitness goals');
      return response.json();
    },

    updateFitnessGoals: async (goals: FitnessGoals): Promise<FitnessGoals> => {
      const response = await fetch(`${API_BASE_URL}/fitness/goals`, {
        method: 'POST',
        headers,
        body: JSON.stringify(goals),
      });
      if (!response.ok) throw new Error('Failed to update fitness goals');
      return response.json();
    },
  };

  return {
    recipes: recipeApi,
    user: userApi,
    fitness: fitnessApi,
  };
} 