"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { bhgAIRecipes, bhgAIExampleResponses } from "@/lib/demo-data";
import { LightningBoltIcon, CopyIcon } from "@/components/icons";

export default function AIWorkbenchPage() {
  const [selectedRecipe, setSelectedRecipe] = useState(0);
  const [prompt, setPrompt] = useState("");

  const currentRecipe = bhgAIRecipes[selectedRecipe];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LightningBoltIcon className="w-8 h-8 text-orange-500" />
            AI Workbench
          </h1>
          <p className="text-gray-600 mt-1">
            AI-powered tools for SPM consulting delivery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recipe Library */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recipe Library
              </h2>
              <div className="space-y-2">
                {bhgAIRecipes.map((recipe, index) => (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(index);
                      setPrompt(recipe.prompt);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedRecipe === index
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LightningBoltIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{recipe.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt Workspace */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentRecipe.label}
                </h2>
                <button
                  onClick={() => setPrompt(currentRecipe.prompt)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <CopyIcon className="w-4 h-4" />
                  Load Template
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt or load a template..."
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
              <div className="mt-4 flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                  <LightningBoltIcon className="w-4 h-4" />
                  Run Recipe
                </button>
              </div>
            </div>

            {/* Example Outputs */}
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Example Outputs
              </h2>
              <div className="space-y-4">
                {bhgAIExampleResponses.map((example, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Prompt: {example.user}
                    </div>
                    <div className="text-sm text-gray-900 whitespace-pre-wrap">
                      {example.assistant}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                Demo Mode
              </h3>
              <p className="text-sm text-blue-800">
                This is a UI preview of the AI Workbench. In production, recipes would connect to AI models to generate real-time responses for SPM consulting tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
