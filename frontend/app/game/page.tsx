"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

type Stats = { health: number; gpa: number; burnout: number; sanity: number };

const startState = "day1-commons";

export default function Game() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const playerName = searchParams.get("playerName"); 
  const [stats, setStats] = useState<Stats | null>(null);
	const [maxStats, setMaxStats] = useState<State | null>(null);
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
			setMaxStats(data.max);
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

	const clickExitGame = () => {
		router.push('/');
	};

	const calculateWidth = (current: number, max: number) => {
		const num: number = (current / max) * 100;

		if (num > 100)
			return 100;

		return num;
	}

  return (
    <div>
      <Image
        src={background}
        alt="background"
        fill
        className="-z-10 blur-xs object-cover"
        priority
				style={{ transform: 'translateX(8rem)' }}
      />
      <div className="h-screen w-full flex">
        {/* Sidebar */}
        <div className="w-2xs bg-zinc-900 text-white p-4 justify-between flex flex-col">
          <div>
            <h2 className="text-xl font-bold text-center text-[#fd0]">
              Surviving Week One
            </h2>
            <div className="mt-8 ml-2">
              <h4 className="mb-4 text-center text-lg">{playerName}</h4>
              {stats && (
                <div className="mt-4 text-sm">
									<label className="mb-2">Health</label>
									<div className="w-full bg-zinc-700 rounded-full h-5 mb-4">
										<div className="bg-pink-500 h-5 rounded-full font-bold text-center" style={{width: `${calculateWidth(stats.health, maxStats.health)}%`}}>
											{ calculateWidth(stats.health, maxStats.health) >= 20 && ( stats.health ) }
										</div>
									</div>
									<label className="mb-2">GPA</label>
									<div className="w-full bg-zinc-700 rounded-full h-5 mb-4">
										<div className="bg-green-500 h-5 rounded-full font-bold text-center" style={{width: `${calculateWidth(stats.gpa, maxStats.gpa)}%`}}>
											{ calculateWidth(stats.gpa, maxStats.gpa) >= 20 && ( stats.gpa.toFixed(2) ) }
										</div>
									</div>
									<label className="mb-2">Burnout</label>
									<div className="w-full bg-zinc-700 rounded-full h-5 mb-4">
										<div className="bg-red-500 h-5 rounded-full font-bold text-center" style={{width: `${calculateWidth(stats.burnout, maxStats.burnout)}%`}}>
											{ calculateWidth(stats.burnout, maxStats.burnout) >= 20 && ( stats.burnout ) }
										</div>
									</div>
									<label className="mb-2">Sanity</label>
									<div className="w-full bg-zinc-700 rounded-full h-5 mb-4">
										<div className="bg-blue-500 h-5 rounded-full font-bold text-center" style={{width: `${calculateWidth(stats.sanity, maxStats.sanity)}%`}}>
											{ calculateWidth(stats.sanity, maxStats.sanity) >= 20 && ( stats.sanity ) }
										</div>
									</div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex">
            <button onClick={clickExitGame} className="bg-zinc-700 hover:bg-yellow-500 rounded-md m-2 w-full">
              Quit Game
            </button>
          </div>
        </div>

        {/* Main game area */}
        <div className="flex flex-col w-full h-screen">
          <div className="mr-24 ml-24 mt-16 mb-16 bg-zinc-700 opacity-90 text-lg text-white h-1/2 flex items-center justify-center">
            <p className="text-center m-8">{scenario?.description ?? "Loading..."}</p>
          </div>

          <div className="flex mr-24 ml-24 mb-16 text-white gap-8">
            {scenario?.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                className="bg-zinc-700 hover:bg-yellow-500 rounded-md h-32 m-auto mt-2 mb-2 w-1/3"
              >
								<p className="text-center m-4">
                	{choice.text}
								</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
