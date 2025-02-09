"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Alert } from "@heroui/alert";

export default function LoginPage() {
  const { login, register, error, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = formData;

    if (isLoginMode) {
      await login(email, password);
    } else {
      await register(email, password, name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
        {error && (
          <Alert 
            color="danger"
            className="mb-6 dark:bg-red-900/20"
          >
            {error}
          </Alert>
        )}
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLoginMode 
              ? "Sign in to continue your journey" 
              : "Join us for personalized recipes"}
          </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <Input
              id="name"
              name="name"
              type="text"
              required={!isLoginMode}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              fullWidth
            />
          )}
          
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            fullWidth
          />
          
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            fullWidth
          />

          <Button 
            size="lg" 
            type="submit" 
            variant="solid"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "Loading..." : isLoginMode ? "Sign in" : "Create Account"}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="light"
              size="sm"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {isLoginMode 
                ? "Need an account? Sign up" 
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
