This is a data object for my game:

```tsx
const defaultStory: Story = {
  startingSetting: ["home", "bedroom"],
  times: [
    "Early Morning",
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "Late Night",
  ],
  scenes: {
    welcome: {
      characters: ["rudolph"],
      actions: {
        "0": {
          type: "dialog",
          character: "rudolph",
          message: ["Good morning player! rise and shine!"],
          effect: { type: "scene", scene: ["welcome", "1"] },
        },
        "1": {
          type: "dialog",
          character: "player",
          message: ["How did i get here?"],
          effect: { type: "scene", scene: ["welcome", "2"] },
        },
        "2": {
          type: "dialog",
          character: "rudolph",
          message: ["It doesn't matter, we have to get to work!"],
        },
      },
    },
    rudolphGuides: {
      characters: ["rudolph", "player"],
      actions: {
        "0": {
          type: "dialog",
          character: "rudolph",
          message: [
            "Hey player, hold on a minute. I noticed you seem a little confused about what's going on here. Do you want some help understanding?",
          ],
          choices: [
            {
              message: ["Yes, I could use some help"],
              effect: { type: "scene", scene: ["rudolphGuides", "1"] },
            },
            {
              message: ["No, I'm good. I'll figure it out"],
              effect: { type: "scene", scene: ["rudolphGuides", "2"] },
            },
          ],
        },
        "1": {
          type: "dialog",
          character: "rudolph",
          message: [
            "Sure thing! So basically, you're working in Santa's workshop at the North Pole. We're all busy preparing for the annual Christmas Eve delivery. Santa is a bit of a taskmaster, so we all have to pitch in and work hard to make sure everything is ready on time. Does that help?",
          ],
          effect: { type: "scene", scene: ["rudolphGuides", "3"] },
        },
        "2": {
          type: "dialog",
          character: "rudolph",
          message: [
            "Okay, if you're sure. Just remember, if you need any help, I'm here for you. Now, let's get to work!",
          ],
          effect: { type: "scene", scene: ["rudolphGuides", "3"] },
        },
        "3": {
          type: "dialog",
          character: "rudolph",
          message: ["Come on, I'll guide you to your work station."],
          effect: { type: "travel", to: ["workshop", "station"] },
        },
      },
    },
    peepoo: {
      characters: [],
      actions: {
        "0": {
          type: "dialog",
          character: "player",
          message: ["Peepee poopoo?"],
          choices: [
            {
              message: ["Peepee"],
              effect: { type: "scene", scene: ["peepoo", "peepee"] },
            },
            {
              message: ["Poopoo"],
              effect: { type: "scene", scene: ["peepoo", "poopoo"] },
            },
          ],
        },
        peepee: {
          type: "dialog",
          character: "player",
          message: ["aaaahhhhh"],
        },
        poopoo: {
          type: "dialog",
          character: "player",
          message: ["*fart noises*"],
        },
      },
    },
    notTired: {
      characters: [],
      actions: {
        "0": {
          type: "dialog",
          character: "player",
          message: ["I'm not tired", "I don't wanna"],
        },
      },
    },
    backToWork: {
      characters: ["santa"],
      actions: {
        "0": {
          type: "dialog",
          character: "santa",
          message: [
            "I'm not paying you to stand around, get moving!",
            "You think this is a holiday? Get back to work!",
            "Don't you have a list of presents to make? Back to work!",
            "Do you want to make it to the naughty list? To your station, now!",
          ],
          effect: { type: "setting", setting: ["workshop", "station"] },
        },
      },
    },
  },
  characters: {
    player: {
      name: "Player",
      color: "#AAAAAA",
      description:
        "A hard worker in Santa's workshop. Has yet to make a way for himself.",
    },
    santa: {
      name: "Santa",
      color: "#832914",
      description:
        "Rules over the North Pole with an iron fist, pushing the elves to their limits to churn out an endless supply of toys. He recklessly uses his magical sleigh and reindeer to deliver presents, often ignoring the well-being of his hardworking workers. Despite his jolly facade, it's clear that Santa's love for the holiday season comes at the expense of his loyal elves.",
    },
    rudolph: {
      name: "Rudolph",
      color: "#832914",
      description:
        "A red-nosed reindeer with a jolly disposition and a love for guiding Santa's sleigh on Christmas Eve. He is a loyal friend and offers helpful advice.",
    },
    mistletoe: {
      name: "Mistletoe",
      color: "#832914",
      description:
        "A confident and strong elf with short, curly black hair and deep brown eyes. She is the fastest toy maker in Santa's workshop and is known for her quick thinking and resourcefulness. She is also a skilled musician and loves to play the drums during the annual Christmas Eve celebration.",
    },
    navidad: {
      name: "Navidad",
      color: "#832914",
      description:
        "A vibrant and passionate elf with long, curly black hair and fiery brown eyes. She is a talented seamstress and loves to make colorful and intricate clothes for the other elves. She is also a skilled dancer and loves to perform traditional Latino dances during the annual Christmas Eve celebration. She is proud of her heritage and is always ready to share her culture with her friends.",
    },
    cinnamon: {
      name: "Cinnamon",
      color: "#832914",
      description:
        "A sweet and caring elf with long, flowing auburn hair and warm brown eyes. She loves baking cookies and making hot cocoa and is nurturing, kind, and warmhearted.",
    },
    tinsel: {
      name: "Tinsel",
      color: "#832914",
      description:
        "A glamorous and fashionable elf with long, sleek silver hair and ice-blue eyes. She loves dressing up in sparkly outfits and is chic, sophisticated, and stylish.",
    },
    peppermint: {
      name: "Peppermint",
      color: "#832914",
      description:
        "A curvy and mischievous elf with short, curly peppermint-colored hair and sparkling green eyes. She loves playing pranks and causing trouble and is sneaky, playful, and seductive.",
    },
  },
  settings: {
    home: {
      name: "Home",
      description: "",
      rooms: {
        //yard: { name: "Front Yard" },
        den: { name: "Living room" },
        kitchen: { name: "kitchen" },
        attic: { name: "Attic" },
        bedroom: { name: "Bedroom" },
        bathroom: { name: "Bathroom" },
      },
    },
    mistletoes: {
      name: "Mistletoe's Home",
      description:
        "A cozy and warm home tucked away in the North Pole, near Santa's workshop. It's filled with musical instruments, tools for toy making, and decorations for the holiday season. Mistletoe loves to invite her friends over for jam sessions and holiday parties.",
    },
    navidads: {
      name: "Navidad's Home",
      description:
        "A colorful and lively home near Santa's workshop in the North Pole. It's filled with beautiful fabrics, thread, and needles, as well as traditional Latino decorations and instruments. Navidad loves to have dance parties and sewing circles with her friends, and her home is always full of laughter and joy.",
    },
    cinnamons: {
      name: "Cinnamon's Home",
      description:
        "A quaint and charming shop near Santa's workshop in the North Pole. It's filled with the smells of freshly baked cookies, hot cocoa, and warm spices. Cinnamon loves to invite her friends over to sample her delicious treats, and her shop is always warm and inviting.",
    },
    tinsels: {
      name: "Tinsel's Home",
      description:
        "A sleek and stylish home near Santa's workshop in the North Pole. It's filled with sparkling decorations, fashionable clothes, and stylish furniture. Tinsel loves to invite her friends over for photo shoots and fashion shows, and her home is always chic and fashionable.",
    },
    peppermints: {
      name: "Peppermint's Home",
      description:
        "A playful and mischievous home near Santa's workshop in the North Pole. It's filled with pranks, toys, and treats, as well as plenty of hidden nooks and crannies for Peppermint to play in. She loves to invite her friends over for wild adventures and mischief-making, and her home is always full of laughter and surprises.",
    },
    workshop: {
      name: "Santa's Workshop",
      description:
        "A bustling and chaotic place where Santa and his elves work tirelessly to make toys for all the good boys and girls. It's a magical and enchanted place, filled with the sounds of hammering, sawing, and laughter.",
      rooms: {
        station: { name: "Work station" },
        cafeteria: { name: "Living room" },
        executive: { name: "Santa's office" },
        bathroom: { name: "Bathroom" },
      },
    },
    market: {
      name: "The Christmas Market",
      description:
        "A bustling and crowded place where people can buy holiday gifts, decorations, and snacks from local vendors.",
    },
    rink: {
      name: "The Ice Rink",
      description:
        "A frozen and slippery place where people can go ice skating and enjoy the winter weather.",
    },
    cafe: {
      name: "The Christmas Cafe",
      description:
        "A cozy and inviting place where people can go to warm up with a hot cup of cocoa, coffee, or tea. It's a festive and cheerful place, with decorations, holiday music, and a fireplace. Closes at night.",
    },
    club: {
      name: "Jingle Belles",
      description:
        "A festive and lively night club with a holiday theme. It features a variety of performers, a full bar, and a cozy atmosphere.",
    },
    music: {
      name: "Mistletoe's Music Melodies",
      description:
        "A cozy and inviting shop in Christmas town where Mistletoe sells musical instruments and gives music lessons.",
    },
    textiles: {
      name: "Navidad's Nifty Needlework",
      description:
        "A vibrant and colorful shop in Christmas town where Navidad sells handmade clothes and offers sewing services.",
    },
    bakery: {
      name: "Cinnamon's Cheery Confections",
      description:
        "A quaint and charming bakery in Christmas town where Cinnamon sells her delicious cookies and other baked goods.",
    },
    fashion: {
      name: "Tinsel's Tasteful Threads",
      description:
        "A stylish and fashionable boutique in Christmas town where Tinsel sells chic and trendy clothes and accessories.",
    },
    arcade: {
      name: "Peppermint's Playful Present Emporium",
      description:
        "A playful and mischievous shop in Christmas town where Peppermint sells toys and games, as well as planning parties and events.",
    },
  },
};

export default defaultStory;
```

and these are the types used:

```typescript
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
```
