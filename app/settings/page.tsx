"use client";

import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import { FitnessGoals, UserPreferences } from "@/app/types/api";

export default function SettingsPage() {
  const { fitness, user } = useApi();
  const { updateFitnessGoals } = fitness;
  const { updatePreferences } = user;

  // Fitness Goals State
  const [goals, setGoals] = useState<FitnessGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
    water: 2,
    allergies: [],
  });
  const [allergiesInput, setAllergiesInput] = useState("");

  // User Preferences State
  const [prefs, setPrefs] = useState<UserPreferences>({
    dietaryRestrictions: [],
    cookingSkillLevel: 1,
    preferredCuisines: [],
    mealPlanningFrequency: "",
  });
  const [dietaryInput, setDietaryInput] = useState("");
  const [cuisinesInput, setCuisinesInput] = useState("");

  // Loading, Message, and Error states for each section
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [messageGoals, setMessageGoals] = useState("");
  const [errorGoals, setErrorGoals] = useState("");

  const [loadingPrefs, setLoadingPrefs] = useState(false);
  const [messagePrefs, setMessagePrefs] = useState("");
  const [errorPrefs, setErrorPrefs] = useState("");

  // Handlers for Fitness Goals
  const handleGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllergiesInput(e.target.value);
  };

  const handleGoalsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGoals: FitnessGoals = {
      ...goals,
      allergies: allergiesInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    setLoadingGoals(true);
    setErrorGoals("");
    setMessageGoals("");
    try {
      await updateFitnessGoals(updatedGoals);
      setMessageGoals("Fitness goals updated successfully.");
    } catch (err: any) {
      console.error(err);
      setErrorGoals("Failed to update fitness goals.");
    } finally {
      setLoadingGoals(false);
    }
  };

  // Handlers for User Preferences
  const handlePrefsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]: name === "cookingSkillLevel" ? Number(value) : value,
    }));
  };

  const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDietaryInput(e.target.value);
  };

  const handleCuisinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCuisinesInput(e.target.value);
  };

  const handlePrefsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPrefs: UserPreferences = {
      ...prefs,
      dietaryRestrictions: dietaryInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      preferredCuisines: cuisinesInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    setLoadingPrefs(true);
    setErrorPrefs("");
    setMessagePrefs("");
    try {
      await updatePreferences(updatedPrefs);
      setMessagePrefs("User preferences updated successfully.");
    } catch (err: any) {
      console.error(err);
      setErrorPrefs("Failed to update user preferences.");
    } finally {
      setLoadingPrefs(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-12">
      {/* Fitness Goals Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Update Fitness Goals</h1>
        {messageGoals && (
          <div className="p-2 bg-green-200 text-green-800 rounded">{messageGoals}</div>
        )}
        {errorGoals && (
          <div className="p-2 bg-red-200 text-red-800 rounded">{errorGoals}</div>
        )}
        <form onSubmit={handleGoalsSubmit} className="space-y-4">
          <div>
            <label htmlFor="calories" className="block font-medium mb-1">Calories</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={goals.calories}
              onChange={handleGoalsChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="protein" className="block font-medium mb-1">Protein</label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={goals.protein}
              onChange={handleGoalsChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="carbs" className="block font-medium mb-1">Carbs</label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={goals.carbs}
              onChange={handleGoalsChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="fat" className="block font-medium mb-1">Fat</label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={goals.fat}
              onChange={handleGoalsChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="water" className="block font-medium mb-1">Water (liters)</label>
            <input
              type="number"
              id="water"
              name="water"
              value={goals.water}
              onChange={handleGoalsChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="allergies" className="block font-medium mb-1">
              Allergies (comma separated)
            </label>
            <input
              type="text"
              id="allergies"
              value={allergiesInput}
              onChange={handleAllergiesChange}
              className="w-full border rounded p-2"
              placeholder="e.g. peanuts, dairy"
            />
          </div>
          <button
            type="submit"
            disabled={loadingGoals}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loadingGoals ? "Updating..." : "Update Goals"}
          </button>
        </form>
      </div>

      {/* User Preferences Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Update User Preferences</h1>
        {messagePrefs && (
          <div className="p-2 bg-green-200 text-green-800 rounded">{messagePrefs}</div>
        )}
        {errorPrefs && (
          <div className="p-2 bg-red-200 text-red-800 rounded">{errorPrefs}</div>
        )}
        <form onSubmit={handlePrefsSubmit} className="space-y-4">
          <div>
            <label htmlFor="dietaryRestrictions" className="block font-medium mb-1">
              Dietary Restrictions (comma separated)
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              value={dietaryInput}
              onChange={handleDietaryChange}
              className="w-full border rounded p-2"
              placeholder="e.g. gluten, dairy"
            />
          </div>
          <div>
            <label htmlFor="cookingSkillLevel" className="block font-medium mb-1">
              Cooking Skill Level
            </label>
            <select
              id="cookingSkillLevel"
              name="cookingSkillLevel"
              value={prefs.cookingSkillLevel}
              onChange={handlePrefsChange}
              className="w-full border rounded p-2"
            >
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredCuisines" className="block font-medium mb-1">
              Preferred Cuisines (comma separated)
            </label>
            <input
              type="text"
              id="preferredCuisines"
              value={cuisinesInput}
              onChange={handleCuisinesChange}
              className="w-full border rounded p-2"
              placeholder="e.g. Italian, Japanese"
            />
          </div>
          <div>
            <label htmlFor="mealPlanningFrequency" className="block font-medium mb-1">
              Meal Planning Frequency
            </label>
            <select
              id="mealPlanningFrequency"
              name="mealPlanningFrequency"
              value={prefs.mealPlanningFrequency}
              onChange={handlePrefsChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loadingPrefs}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loadingPrefs ? "Updating..." : "Update Preferences"}
          </button>
        </form>
      </div>
    </div>
  );
}