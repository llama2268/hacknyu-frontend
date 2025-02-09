"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../hooks/useApi";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Alert } from "@heroui/alert";
import { Divider } from "@heroui/divider";
import type { FitnessGoals, UserPreferences } from "../types/api";

export default function SettingsPage() {
  const { user } = useAuth();
  const { fitness: fitnessApi, user: userApi } = useApi();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
    water: 2000,
    allergies: []
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    cookingSkillLevel: 2,
    preferredCuisines: [],
    mealPlanningFrequency: "weekly"
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [goals, profile] = await Promise.all([
          fitnessApi.getFitnessGoals(),
          userApi.getProfile()
        ]);
        if (goals) setFitnessGoals(goals);
        if (profile?.preferences) setPreferences(profile.preferences);
      } catch (err) {
        setError("Failed to load settings");
        console.error(err);
      }
    };

    loadSettings();
  }, [fitnessApi, userApi]);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await Promise.all([
        fitnessApi.updateFitnessGoals(fitnessGoals),
        userApi.updatePreferences(preferences)
      ]);
      setSuccess("Settings saved successfully");
    } catch (err) {
      setError("Failed to save settings");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account preferences and fitness goals
        </p>
      </header>

      {error && (
        <Alert 
          color="danger"
          className="mb-6 dark:bg-red-900/20"
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert 
          color="success"
          className="mb-6 dark:bg-green-900/20"
        >
          {success}
        </Alert>
      )}

      <div className="space-y-6">
        {/* Fitness Goals */}
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Fitness Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Daily Calories
              </label>
              <Input
                type="number"
                value={fitnessGoals.calories}
                onChange={(e) => setFitnessGoals(prev => ({
                  ...prev,
                  calories: parseInt(e.target.value)
                }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Protein (g)
              </label>
              <Input
                type="number"
                value={fitnessGoals.protein}
                onChange={(e) => setFitnessGoals(prev => ({
                  ...prev,
                  protein: parseInt(e.target.value)
                }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carbs (g)
              </label>
              <Input
                type="number"
                value={fitnessGoals.carbs}
                onChange={(e) => setFitnessGoals(prev => ({
                  ...prev,
                  carbs: parseInt(e.target.value)
                }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fat (g)
              </label>
              <Input
                type="number"
                value={fitnessGoals.fat}
                onChange={(e) => setFitnessGoals(prev => ({
                  ...prev,
                  fat: parseInt(e.target.value)
                }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Cooking Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cooking Skill Level
              </label>
              <div className="flex items-center gap-4">
                {[
                  { level: 1, label: "Beginner" },
                  { level: 2, label: "Intermediate" },
                  { level: 3, label: "Advanced" }
                ].map(({ level, label }) => (
                  <Button
                    key={level}
                    variant={preferences.cookingSkillLevel === level ? "solid" : "light"}
                    onClick={() => {
                      setPreferences(prev => ({
                        ...prev,
                        cookingSkillLevel: level
                      }));
                    }}
                    className={`${
                      preferences.cookingSkillLevel === level 
                        ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } transition-colors`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <Divider className="my-6" />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dietary Restrictions
              </label>
              <div className="space-y-2">
                {["vegetarian", "vegan", "gluten-free", "dairy-free"].map((restriction) => (
                  <div key={restriction} className="flex items-center gap-2">
                    <Switch
                      checked={preferences.dietaryRestrictions?.includes(restriction)}
                      onChange={(checked) => {
                        setPreferences(prev => ({
                          ...prev,
                          dietaryRestrictions: checked 
                            ? [...(prev.dietaryRestrictions || []), restriction]
                            : (prev.dietaryRestrictions || []).filter(r => r !== restriction)
                        }));
                      }}
                      className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {restriction.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            size="lg"
            variant="solid"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}