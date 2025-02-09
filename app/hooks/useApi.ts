import { useAuth } from '../contexts/AuthContext';
import { Recipe, FitnessGoals, GenerateRecipeParams, UserProfile, UserPreferences } from '../types/api';
import React from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export function useApi(): {
  recipes: typeof recipeApi;
  user: typeof userApi;
  fitness: typeof fitnessApi;
} {
  const { token } = useAuth();

  // Memoize headers to prevent unnecessary re-renders
  const headers = React.useMemo(
    () => ({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }),
    [token]
  );

  // Recipe endpoints
  const recipeApi = React.useMemo(
    () => ({
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
        try {
          console.log('Generating recipe with params:', params);
          const response = await fetch(`${API_BASE_URL}/recipes/generate`, {
            method: 'POST',
            headers,
            body: JSON.stringify(params),
          });

          const data = await response.json();
          console.log('Recipe generation response:', data);

          if (!response.ok) {
            throw new Error(data.error || 'Failed to generate recipe');
          }

          return data;
        } catch (err) {
          console.error('Recipe generation error:', err);
          throw err;
        }
      },

      saveRecipe: async (recipeId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/save`, {
          method: 'POST',
          headers,
        });
        if (!response.ok) throw new Error('Failed to save recipe');
      },

      favoriteRecipe: async (recipeId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/favorite`, {
          method: 'POST',
          headers,
        });
        if (!response.ok) throw new Error('Failed to favorite recipe');
      },

      unfavoriteRecipe: async (recipeId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/favorite`, {
          method: 'DELETE',
          headers,
        });
        if (!response.ok) throw new Error('Failed to unfavorite recipe');
      },

      getRecommendations: async (): Promise<Recipe[]> => {
        const response = await fetch(`${API_BASE_URL}/recipes/recommended`, { headers });
        if (!response.ok) throw new Error('Failed to get recommendations');
        return response.json();
      },

      getRecipeHistory: async (): Promise<Recipe[]> => {
        const response = await fetch(`${API_BASE_URL}/recipes/history`, { headers });
        if (!response.ok) throw new Error('Failed to fetch recipe history');
        return response.json();
      },
    }),
    [headers]
  );

  // User endpoints
  const userApi = React.useMemo(
    () => ({
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

      getProfile: async (): Promise<UserProfile> => {
        const response = await fetch(`${API_BASE_URL}/user/profile`, { headers });
        if (!response.ok) throw new Error('Failed to get profile');
        return response.json();
      },

      updatePreferences: async (preferences: UserPreferences): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/user/preferences`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(preferences),
        });
        if (!response.ok) throw new Error('Failed to update preferences');
      },
    }),
    [headers]
  );

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

  return React.useMemo(
    () => ({
      recipes: recipeApi,
      user: userApi,
      fitness: fitnessApi,
    }),
    [recipeApi, userApi, fitnessApi]
  );
} 