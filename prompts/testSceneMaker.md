This is for a game called Christmas town, an elf dating sim where you must plot with 5 beautiful elves to take over Christmas town from Santa to secure better working conditions for the elves.

Using these types:

```typescript
type Result =
  | {
      type: "relationship";
      stat: "love" | "lust" | "fear";
      target: string;
      amount: string;
    }
  | {
      type: "boost";
      stat: "intelligence" | "strength" | "charisma";
      amount: string;
    };

type Choice = {
  message: "string";
  results: Result[];
};

type Action =
  | {
      type: "dialog";
      character: string;
      message: string;
    }
  | {
      type: "choice";
      choice: Choice[];
    };

type Scene = {
  characters: string[];
  actions: Action[];
};
```

I want you to write 1 Scene object

use this json object as a reference for the characters and locations:

```json
{
  "characters": {
    "player": {
      "name": "Player",
      "description": "A hard worker in Santa's workshop. Has yet to make a way for himself."
    },
    "santa": {
      "name": "Santa",
      "description": "Rules over the North Pole with an iron fist, pushing the elves to their limits to churn out an endless supply of toys. He recklessly uses his magical sleigh and reindeer to deliver presents, often ignoring the well-being of his hardworking workers. Despite his jolly facade, it's clear that Santa's love for the holiday season comes at the expense of his loyal elves."
    },
    "rudolph": {
      "name": "Rudolph",
      "description": "A red-nosed reindeer with a jolly disposition and a love for guiding Santa's sleigh on Christmas Eve. He is a loyal friend and offers helpful advice."
    },
    "mistletoe": {
      "name": "Mistletoe",
      "description": "A confident and strong elf with short, curly black hair and deep brown eyes. She is the fastest toy maker in Santa's workshop and is known for her quick thinking and resourcefulness. She is also a skilled musician and loves to play the drums during the annual Christmas Eve celebration."
    },
    "navidad": {
      "name": "Navidad",
      "description": "A vibrant and passionate elf with long, curly black hair and fiery brown eyes. She is a talented seamstress and loves to make colorful and intricate clothes for the other elves. She is also a skilled dancer and loves to perform traditional Latino dances during the annual Christmas Eve celebration. She is proud of her heritage and is always ready to share her culture with her friends."
    },
    "cinnamon": {
      "name": "Cinnamon",
      "description": "A sweet and caring elf with long, flowing auburn hair and warm brown eyes. She loves baking cookies and making hot cocoa and is nurturing, kind, and warmhearted."
    },
    "tinsel": {
      "name": "Tinsel",
      "description": "A glamorous and fashionable elf with long, sleek silver hair and ice-blue eyes. She loves dressing up in sparkly outfits and is chic, sophisticated, and stylish."
    },
    "peppermint": {
      "name": "Peppermint",
      "description": "A curvy and mischievous elf with short, curly peppermint-colored hair and sparkling green eyes. She loves playing pranks and causing trouble and is sneaky, playful, and seductive."
    }
  },
  "locations": {
    "home": {
      "name": "Home",
      "description": "",
      "rooms": {
        "bedroom": { "name": "Bedroom" },
        "kitchen": { "name": "kitchen" }
      }
    },
    "mistletoes": {
      "name": "Mistletoe's Home",
      "description": "A cozy and warm home tucked away in the North Pole, near Santa's workshop. It's filled with musical instruments, tools for toy making, and decorations for the holiday season. Mistletoe loves to invite her friends over for jam sessions and holiday parties."
    },
    "navidads": {
      "name": "Navidad's Home",
      "description": "A colorful and lively home near Santa's workshop in the North Pole. It's filled with beautiful fabrics, thread, and needles, as well as traditional Latino decorations and instruments. Navidad loves to have dance parties and sewing circles with her friends, and her home is always full of laughter and joy."
    },
    "cinnamons": {
      "name": "Cinnamon's Home",
      "description": "A quaint and charming shop near Santa's workshop in the North Pole. It's filled with the smells of freshly baked cookies, hot cocoa, and warm spices. Cinnamon loves to invite her friends over to sample her delicious treats, and her shop is always warm and inviting."
    },
    "tinsels": {
      "name": "Tinsel's Home",
      "description": "A sleek and stylish home near Santa's workshop in the North Pole. It's filled with sparkling decorations, fashionable clothes, and stylish furniture. Tinsel loves to invite her friends over for photo shoots and fashion shows, and her home is always chic and fashionable."
    },
    "peppermints": {
      "name": "Peppermint's Home",
      "description": "A playful and mischievous home near Santa's workshop in the North Pole. It's filled with pranks, toys, and treats, as well as plenty of hidden nooks and crannies for Peppermint to play in. She loves to invite her friends over for wild adventures and mischief-making, and her home is always full of laughter and surprises."
    },
    "workshop": {
      "name": "Santa's Workshop",
      "description": "A bustling and chaotic place where Santa and his elves work tirelessly to make toys for all the good boys and girls. It's a magical and enchanted place, filled with the sounds of hammering, sawing, and laughter."
    },
    "market": {
      "name": "The Christmas Market",
      "description": "A bustling and crowded place where people can buy holiday gifts, decorations, and snacks from local vendors."
    },
    "rink": {
      "name": "The Ice Rink",
      "description": "A frozen and slippery place where people can go ice skating and enjoy the winter weather."
    },
    "cafe": {
      "name": "The Christmas Cafe",
      "description": "A cozy and inviting place where people can go to warm up with a hot cup of cocoa, coffee, or tea. It's a festive and cheerful place, with decorations, holiday music, and a fireplace. Closes at night."
    },
    "club": {
      "name": "Jingle Belles",
      "description": "A festive and lively night club with a holiday theme. It features a variety of performers, a full bar, and a cozy atmosphere."
    },
    "music": {
      "name": "Mistletoe's Music Melodies",
      "description": "A cozy and inviting shop in Christmas town where Mistletoe sells musical instruments and gives music lessons."
    },
    "textiles": {
      "name": "Navidad's Nifty Needlework",
      "description": "A vibrant and colorful shop in Christmas town where Navidad sells handmade clothes and offers sewing services."
    },
    "bakery": {
      "name": "Cinnamon's Cheery Confections",
      "description": "A quaint and charming bakery in Christmas town where Cinnamon sells her delicious cookies and other baked goods."
    },
    "fashion": {
      "name": "Tinsel's Tasteful Threads",
      "description": "A stylish and fashionable boutique in Christmas town where Tinsel sells chic and trendy clothes and accessories."
    },
    "arcade": {
      "name": "Peppermint's Playful Present Emporium",
      "description": "A playful and mischievous shop in Christmas town where Peppermint sells toys and games, as well as planning parties and events."
    }
  }
}
```

The rules are:

- Whenever the player enters a new location there is a chance characters will be there based on schedules that match the characters story. This will trigger a scene between the characters and the player
- There are 4 times of day: Morning, Afternoon, Evening, and Night. Every scene will progress the clock forward 1 time span.
- The game is played from day 1, December 1st, and the story does not resolve until day 25, Christmas Day.

The context for the scene is:
On Day 1, the player has just woken up and walked into the kitchen (home/kitchen).
