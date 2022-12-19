declare type Game = {
  state: Game.GameState;
  history: Game.GameState[];
  story: Story;
};

declare type GameState = {
  seed: string;
  time: [number, number];
  location: [string, string?];
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
  | { type: "location"; location: [string, string?] }
  | { type: "tag"; tag: string; min?: number; max?: number }
  | { type: "time"; days?: number[]; times?: number[]; weekdays?: number[] }
  | { type: "or"; children: Trigger[] }
  | { type: "and"; children: Trigger[] };

declare type Effect =
  | { type: "scene"; scene: [string, string?] }
  | { type: "location"; location: [string, string?] }
  | { type: "time"; days: number; times: number }
  | { type: "tag"; tag: string; amount: number }
  | { type: "and"; children: Effect[] };

declare type Story = {
  startingLocation: [string, string?];
  times: string[];
  characters: { [id: string]: Story.Character };
  locations: { [id: string]: Story.Location };
  scenes: {
    [key: string]: Story.Scene;
  };
};

namespace Story {
  declare type Character = {
    name: string;
    color: string;
    description: string;
  };

  declare type Room = { name: string };

  declare type Location = {
    name: string;
    description: string;
    rooms?: { [id: string]: Story.Room };
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
}
