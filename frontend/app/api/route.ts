// app/api/choice/route.ts
import { NextRequest, NextResponse } from "next/server";
import scenariosRaw from "../../data/scenarios.json";


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

type ScenarioMap = Record<string, Scenario>;
const scenarios: ScenarioMap = scenariosRaw as ScenarioMap;

type Stats = { health: number; gpa: number; burnout: number; sanity: number };
const initialStats: Stats = { health: 100, gpa: 4.0, burnout: 10, sanity: 90 };
const maxStats: Stats = { health: 100, gpa: 4.0, burnout: 100, sanity: 100 };
let currentStats: Stats = initialStats;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { currentScenario, choiceId } = body;

  // First load: just return the current scenario
  if (!choiceId) {
    return NextResponse.json({
        stats: currentStats,
        max: maxStats,
        nextScenario: currentScenario,
        scenarioData: scenarios[currentScenario]
    });
  }

  // Normal choice flow
  const scenario = scenarios[currentScenario];
  const choice = scenario.choices.find((c) => c.id === choiceId);

  if (!choice) return NextResponse.json({ error: "Invalid choice" }, { status: 400 });

  // Update stats
  for (const key in choice.effects) {
    currentStats[key as keyof Stats] += choice.effects[key];
  }

  return NextResponse.json({
    stats: currentStats,
    nextScenario: choice.next,
    scenarioData: scenarios[choice.next]
  });
}
