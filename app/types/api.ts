export interface Recipe {
  instructions: any;
  id: string;
  name: string;
  ingredients: string;
  steps: string;
  image: string;
  authorId?: string;
}

export interface FitnessGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  allergies: string[];
}

export interface GenerateRecipeParams {
  ingredients: string[];
  skillLevel?: 1 | 2 | 3;
  preferences?: {
    vegetarian?: boolean;
    vegan?: boolean;
    lowCarb?: boolean;
    highProtein?: boolean;
  };
  maxCookingTime?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  fitnessGoal?: FitnessGoals;
  preferences?: UserPreferences;
  savedRecipes: Recipe[];
  favoriteRecipes: Recipe[];
}

export interface UserPreferences {
  dietaryRestrictions?: string[];
  cookingSkillLevel?: number;
  preferredCuisines?: string[];
  mealPlanningFrequency?: string;
}

export interface Activity {
  id: string;
  type: string;
  recipeId?: string;
  timestamp: Date;
} 