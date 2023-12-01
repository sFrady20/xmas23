/// <reference types="vite/client" />

declare type Game = {
  state: Game.GameState;
  history: Game.GameState[];
  story: Story;
};

declare type GameState = {
  seed: string;
  time: [number, number];
  setting: [string, string?];
  scene?: [string, string?];
  tags: { [tag: string]: number };
  opportunities: { [id: string]: Opportunity };
};

declare type Opportunity = {
  trigger: Trigger;
  effect: Effect;
};

declare type Trigger =
  | { type: "action"; action: string }
  | { type: "setting"; setting: [string, string?] }
  | { type: "tag"; tag: string; min?: number; max?: number }
  | { type: "time"; days?: number[]; times?: number[]; weekdays?: number[] }
  | { type: "or"; children: Trigger[] }
  | { type: "and"; children: Trigger[] };

declare type Effect =
  | { type: "scene"; scene: [string, string?] }
  | { type: "setting"; setting: [string, string?] }
  | { type: "travel"; to: [string, string?] }
  | { type: "sleep" }
  | { type: "time"; days: number; times: number }
  | { type: "tag"; tag: string; amount: number }
  | { type: "and"; children: Effect[] };

declare type Character = {
  name: string;
  color: string;
  description: string;
};

declare type Room = { name: string };

declare type Setting = {
  name: string;
  description: string;
  rooms?: { [id: string]: Room };
};

declare type Story = {
  startingSetting: [string, string?];
  times: string[];
  characters: { [id: string]: Character };
  settings: { [id: string]: Setting };
  scenes: {
    [key: string]: Scene;
  };
};

declare type Choice = {
  message: string[];
  effect?: Effect;
};

declare type Action = (
  | {
      type: "dialog";
      character: string;
      message: string[];
      choices?: Choice[];
    }
  | {
      type: "other";
    }
) & {
  effect?: Effect;
};

declare type Scene = {
  characters: string[];
  actions: { [id: string]: Action };
};
