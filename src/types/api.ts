export interface Recipe {
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