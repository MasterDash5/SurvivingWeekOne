"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import background from "@/public/background.png";
import heart from "@/public/heart.png";

type Scenario = {
  description: string;
  choices: Choice[];
};

type Choice = {
  id: string;
  text: string;
  effects: Record<string, number>;
  next: string;
};

type Stats = { gpa: number; burnout: number; sanity: number };

const startState = "day1-commons";

export default function Game() {
  const [playerName] = useState("Player Name");
  const [health, setHealth] = useState(20);
  const [stats, setStats] = useState<Stats | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentScenario, setCurrentScenario] = useState(startState);

  // Load initial scenario
  useEffect(() => {
    async function loadScenario() {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentScenario: startState, choiceId: null }),
      });
      const data = await res.json();
      setScenario(data.scenarioData);
      setStats(data.stats);
      setCurrentScenario(startState);
    }
    loadScenario();
  }, []);

  // Handle a choice
  async function handleChoice(choiceId: string) {
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentScenario, choiceId }),
    });
    const data = await res.json();

    setScenario(data.scenarioData);
    setStats(data.stats);
    setCurrentScenario(data.nextScenario);
  }

  return (
    <div>
      <Image
        src={background}
        alt="background"
        fill
        className="-z-10 blur-xs object-cover"
        priority
      />
      <div className="h-screen w-full flex">
        {/* Sidebar */}
        <div className="w-2xs bg-zinc-900 text-white p-4 justify-between flex flex-col">
          <div>
            <h2 className="text-xl font-bold text-center text-[#fd0]">
              Surviving Week One
            </h2>
            <div className="mt-8 ml-2">
              <h4 className="mb-4 text-lg">{playerName}</h4>
              <div className="flex">
                <Image src={heart} alt="heart" width={16} className="h-7 w-7" />
                <p className="ml-2 text-xl">{health}</p>
              </div>
              {stats && (
                <div className="mt-4 text-sm">
                  <p>GPA: {stats.gpa}</p>
                  <p>Burnout: {stats.burnout}</p>
                  <p>Sanity: {stats.sanity}</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex">
            <button className="bg-zinc-700 hover:bg-yellow-500 rounded-md m-2 w-full">
              Quit Game
            </button>
            <button className="bg-zinc-700 hover:bg-yellow-500 rounded-md m-2 w-full">
              Settings
            </button>
          </div>
        </div>

        {/* Main game area */}
        <div className="flex flex-col w-full h-screen">
          <div className="mr-24 ml-24 mt-16 mb-16 bg-zinc-700 opacity-80 text-lg text-white h-screen flex items-center justify-center">
            <p className="text-center">{scenario?.description ?? "Loading..."}</p>
          </div>

          <div className="flex mr-24 ml-24 mb-16 text-white">
            {scenario?.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                className="bg-zinc-700 hover:bg-yellow-500 rounded-md h-12 m-8 mt-2 mb-2 w-1/3"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
