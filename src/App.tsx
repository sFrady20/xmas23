import React, {
  FC,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  BoxProps,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { createContext, useContextSelector } from "use-context-selector";
import { useImmer } from "use-immer";
import { chain, every, findKey, map, mapValues, merge, some } from "lodash";
import story from "./data";
import { animated, easings, useSpring, useTrail } from "@react-spring/web";
import { Draft } from "immer";
import shortid from "shortid";
import seedrandom from "seedrandom";

const AnimatedBox = animated(Box);
const AnimatedCard = animated(Card);
const AnimatedStack = animated(Stack);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ["#root, body"]: {
          height: "calc(var(--lsvh, 1vh) * 100)",
          overflow: "hidden",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#040511",
          borderRadius: 10,
          boxShadow:
            "0px 0px 0px 1px #000000, 0px 0px 0px 1.5px #ffffff, 0px 2px 10px 0px #000000",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { background: "#040511", position: "relative" },
      },
    },
  },
});

type PushGameStateHelpers = {
  occur: typeof occur;
  matchesTrigger: typeof matchesTrigger;
  affect: typeof affect;
};
type GameContextType = {
  story: Story;
  state: GameState;
  pushGameState: (
    next: (state: Draft<GameState>, helpers: PushGameStateHelpers) => void,
    options?: { replace?: boolean }
  ) => void;
  overlay: (overlay: Overlay, params?: any) => void;
};
const GameContext = createContext<GameContextType>({
  story: {} as any,
  state: {} as any,
  pushGameState: () => {},
  overlay: () => {},
});

function useGameSelector<T>(
  selector: (
    gameContext: GameContextType,
    helpers: {
      getScene: (scenePath?: [string, string?]) => {
        scene?: Story.Scene;
        action?: Story.Action;
      };
    }
  ) => T
) {
  return useContextSelector(GameContext, (x) =>
    selector(x, {
      getScene: (scenePath?: [string, string?]) => {
        if (!scenePath) return {};
        const scene = x.story.scenes[scenePath[0]];
        const action = scene?.actions[scenePath[1] || "0"];
        return { scene, action };
      },
    })
  );
}

const Container = (props: { children: ReactNode } & BoxProps) => {
  return (
    <Box
      component={"div"}
      width={"100vw"}
      height={"calc(var(--lsvh, 1vh) * 100)"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {props.children}
    </Box>
  );
};

const CharacterCard = (props: { character: string }) => {
  const { character } = props;

  return (
    <Card
      sx={{
        width: "50%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CardMedia component={"img"} image={`/char-${character}.png`} />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, #121726, #12172600 20%, #12172600 75%, #121726 100%)",
        }}
      />
    </Card>
  );
};

const Text = (props: { children: string }) => {
  const { children } = props;

  const fullText = useMemo(() => children, [children]);

  const trail = useTrail(fullText.length, {
    from: { opacity: 0, scale: 0.9, translateY: 4 },
    to: { opacity: 1, scale: 1.0, translateY: 0 },
    config: { duration: 30, easing: easings.linear },
  });

  return (
    <>
      {fullText.split("").map((x, i) => (
        <AnimatedBox
          key={i}
          component="span"
          style={trail[i]}
          dangerouslySetInnerHTML={{ __html: x }}
        />
      ))}
    </>
  );
};

const SpeechBubble = (props: { scenePath?: [string, string?] }) => {
  const { scenePath } = props;

  const [scene, action, speaker, pushGameState, seed] = useGameSelector(
    (x, { getScene }) => {
      const { scene, action } = getScene(scenePath);
      const speaker =
        action?.type === "dialog"
          ? x.story.characters[action.character]
          : undefined;
      return [scene, action, speaker, x.pushGameState, x.state.seed] as const;
    }
  );

  const random = useMemo(() => seedrandom(seed), [seed]);

  const anim = useSpring({
    from: { opacity: 0 },
    to: { opacity: !action ? 0 : 1 },
  });

  const message = useMemo(
    () =>
      action?.type === "dialog"
        ? chain(action.message).orderBy(random).first().value()
        : "",
    [scenePath?.join("-"), action, random]
  );

  return (
    <AnimatedBox
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        paddingTop: `132px`,
        paddingBottom: "40px",
        paddingX: 5,
        textAlign: "left",
        background:
          "linear-gradient(to bottom, #020B1800 0%, #020B18 100px, #020B18 100%)",
        pointerEvents: !action ? "none" : "auto",
      }}
      style={anim}
      onClick={
        action?.type === "dialog" && action?.choices
          ? undefined
          : () => {
              pushGameState((x, { affect }) => {
                x.scene = undefined;
                affect(x, action?.effect);
              });
            }
      }
    >
      {action?.type === "dialog" && (
        <>
          {speaker && (
            <Box
              component={"div"}
              sx={{ fontWeight: "bold", color: speaker.color }}
            >
              {speaker.name}:
            </Box>
          )}
          <Text key={message}>{message}</Text>
          {action.choices && (
            <Stack spacing={1} sx={{ marginTop: 2 }}>
              {map(action.choices, (x, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  onClick={() => {
                    pushGameState((y, { affect }) => {
                      y.scene = undefined;
                      affect(y, action.effect);
                      affect(y, x.effect);
                    });
                  }}
                >
                  {x.message}
                </Button>
              ))}
            </Stack>
          )}
        </>
      )}
    </AnimatedBox>
  );
};

const Loader = () => {
  return (
    <Container>
      <CircularProgress size={20} />
    </Container>
  );
};

const Setting = (props: { location: [string, string?] }) => {
  const { location } = props;

  return (
    <Suspense fallback={<Loader />}>
      <Box
        component={"div"}
        sx={{
          position: "absolute",
          height: "calc(var(--lsvh, 1vh) * 100)",
          width: "100vw",
          backgroundImage: `url(/location-${location.join("-")}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Suspense>
  );
};

const NavigationRoomItem = (props: { location: [string, string?] }) => {
  const { location } = props;

  const [currentLocation, pushGameState] = useContextSelector(
    GameContext,
    (x) => [x.state.location, x.pushGameState] as const
  );

  const matches = useMemo(
    () => currentLocation.join("-") === location.join("-"),
    [currentLocation, location]
  );

  const anim = useSpring({
    to: {
      scale: matches ? 1.1 : 0.9,
      opacity: matches ? 1 : 0.6,
    },
  });

  return (
    <AnimatedCard
      sx={{ borderRadius: "100%", flexShrink: 0 }}
      style={anim}
      onClick={() =>
        pushGameState((x, { occur }) => {
          if (x.location.join("-") === location.join("-")) return;
          x.location = location;
          occur(x);
        })
      }
    >
      <CardMedia
        sx={{ width: 40, height: 40 }}
        image={`/location-${location.join("-")}.png`}
      />
    </AnimatedCard>
  );
};

const NavigationTravel = () => {
  const el = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const [overlay, location] = useGameSelector(
    (x) => [x.overlay, x.state.location] as const
  );

  return (
    <>
      <Card
        ref={el}
        sx={{ borderRadius: "100%" }}
        onClick={() => setOpen((x) => !x)}
      >
        <CardMedia
          sx={{ width: `52px`, height: `52px` }}
          image={"/icon-door.jpg"}
        />
      </Card>
      <Menu
        anchorEl={el.current}
        open={isOpen}
        onClose={() => void setOpen(false)}
      >
        <MenuItem
          onClick={() => {
            if (location[0] === "workshop") return;
            setOpen(false);
            overlay(TravelOverlay, { to: ["workshop", "station"] });
          }}
        >
          Go to work
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (location[0] === "home") return;
            setOpen(false);
            overlay(TravelOverlay, { to: ["home", "den"] });
          }}
        >
          Go home
        </MenuItem>
      </Menu>
    </>
  );
};

const Navigation = (props: {
  location: [string, string?];
  hidden?: boolean;
}) => {
  const { location, hidden } = props;

  const rooms = useContextSelector(
    GameContext,
    (x) => x.story.locations[location[0]]?.rooms
  );

  const anim = useSpring({ to: { bottom: hidden ? -80 : 0 } });

  if (!rooms) return null;

  return (
    <AnimatedStack
      direction="row"
      spacing={2}
      alignItems={"center"}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        px: 4,
        height: 80,
        pointerEvents: hidden ? "none" : "auto",
      }}
      style={anim}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
        sx={{
          flex: 1,
          height: "80px",
          overflowX: "auto",
          overflowY: "hidden",
          paddingX: 1,
        }}
      >
        {map(rooms, (x, id) => (
          <NavigationRoomItem key={id} location={[location[0], id]} />
        ))}
      </Stack>
      <NavigationTravel />
    </AnimatedStack>
  );
};

const matchesTrigger: (
  state: Draft<GameState>,
  trigger: Trigger,
  action?: string
) => boolean = (state, trigger, action) => {
  switch (trigger.type) {
    case "and":
      return every(trigger.children, (x) => matchesTrigger(state, x));
    case "or":
      return some(trigger.children, (x) => matchesTrigger(state, x));
    case "action":
      return trigger.action === action;
    case "location":
      return trigger.location.join("-") === state.location.join("-");
    case "tag":
      const tagVal = state.tags[trigger.tag] || 0;
      return (
        (trigger.min === undefined || trigger.min <= tagVal) &&
        (trigger.max === undefined || trigger.max > tagVal)
      );
  }
  return false;
};

const affect: (state: Draft<GameState>, effect?: Effect) => void = (
  state,
  effect
) => {
  if (!effect) return;
  switch (effect.type) {
    case "and":
      mapValues(effect.children, (x) => affect(state, x as any));
      return;
    case "location":
      if (state.location.join("-") !== effect.location.join("-"))
        state.location = effect.location;
      return;
    case "time":
      state.time[0] += effect.days;
      state.time[1] += effect.times;
      return;
    case "scene":
      state.scene = effect.scene;
      return;
    case "tag":
      state.tags[effect.tag] = (state.tags[effect.tag] || 0) + effect.amount;
      return;
  }
};

const occur = (state: Draft<GameState>, action?: string) => {
  if (state.scene) return;

  const opportunityId = findKey(state.opportunities, (x, id) =>
    matchesTrigger(state, x.trigger, action)
  );
  if (opportunityId) {
    const tagId = `triggered-${opportunityId}`;
    state.tags[tagId] = (state.tags[tagId] || 0) + 1;
    console.log("TRIGGERED", opportunityId);
    affect(state, state.opportunities[opportunityId].effect);
  }
};

const SceneRenderer = (props: { scenePath?: [string, string?] }) => {
  const { scenePath } = props;

  const [{ scene, action }] = useGameSelector((x, { getScene }) => [
    getScene(scenePath),
  ]);

  return (
    <>
      {map(scene?.characters, (x) =>
        x === "player" ? null : <CharacterCard key={x} character={x} />
      )}
      <SpeechBubble scenePath={scenePath} />
    </>
  );
};

type Overlay = FC<{ id: string; destroy: () => void; params: any }>;

const TravelOverlay: Overlay = ({ destroy, params }) => {
  const [pushGameState] = useGameSelector((x) => [x.pushGameState] as const);
  useEffect(() => {
    (async () => {
      pushGameState(
        (x, {}) => {
          x.location = ["travel"];
        },
        { replace: true }
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      pushGameState((x, {}) => {
        x.time[1] = x.time[1] + 1;
        x.location = params.to;
      });
      destroy();
    })();
  }, []);
  return null;
};

const SleepOverlay: Overlay = ({ destroy }) => {
  const [pushGameState] = useGameSelector((x) => [x.pushGameState] as const);
  useEffect(() => {
    (async () => {
      pushGameState(
        (x, {}) => {
          x.time[0] += 1;
          x.time[1] = 0;
          x.location = ["dream"];
        },
        { replace: true }
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      pushGameState((x, {}) => {
        x.location = ["home", "bedroom"];
      });
      destroy();
    })();
  }, []);
  return null;
};

const Game = () => {
  const [state, updateState] = useImmer<GameState>({
    seed: shortid(),
    time: [0, 0],
    location: story.startingLocation,
    scene: undefined,
    tags: {},
    opportunities: {
      welcome: {
        trigger: {
          type: "and",
          children: [
            { type: "location", location: ["home", "kitchen"] },
            { type: "tag", tag: "triggered-welcome", max: 1 },
          ],
        },
        effect: { type: "scene", scene: ["welcome"] },
      },
      peepoo: {
        trigger: { type: "location", location: ["home", "bathroom"] },
        effect: { type: "scene", scene: ["peepoo"] },
      },
      backToWork: {
        trigger: { type: "location", location: ["workshop", "executive"] },
        effect: { type: "scene", scene: ["backToWork"] },
      },
    },
  });
  const [history, updateHistory] = useImmer<GameState[]>([merge({}, state)]);

  const [overlays, setOverlays] = useState<{
    [id: string]: { Overlay: Overlay; params?: any };
  }>({});
  const overlay = useCallback<GameContextType["overlay"]>(
    (overlay: Overlay, params?: any) =>
      setOverlays((x) => ({
        ...x,
        ...{ [shortid()]: { Overlay: overlay, params } },
      })),
    [setOverlays]
  );
  const removeOverlay = useCallback(
    (id: string) =>
      setOverlays((x) => {
        delete x[id];
        return x;
      }),
    [setOverlays]
  );

  const pushGameState = useCallback<GameContextType["pushGameState"]>(
    (next, options) => {
      updateState((x) => {
        //call downstream state changes
        next(x, {
          occur,
          matchesTrigger,
          affect: affect,
        });

        //make sure unassigned scenes don't break the game
        const scene = x.scene?.[0]
          ? story.scenes[x.scene[0] as unknown as keyof typeof story.scenes]
          : undefined;
        const action = x.scene?.[1]
          ? scene?.actions[x.scene[1] as unknown as keyof typeof scene.actions]
          : undefined;
        if ((x.scene?.[0] && !scene) || (x.scene?.[1] && !action)) {
          console.error("SCENE MISSING", x.scene.join("-"));
          x.scene = undefined;
        }

        if (x.time[1] >= story.times.length) {
          overlay(SleepOverlay);
          return;
        }

        if (!options?.replace) {
          //assign new random seed
          x.seed = shortid();
          //save new state to history
          updateHistory((y) => [merge({}, x), ...y.slice(0, 24)]);
        }
      });
    },
    [overlays, updateState, overlay]
  );
  const popGameState = useCallback(() => {
    if (history.length <= 1) return;
    updateState((x) => history[1]);
    updateHistory((y) => y.slice(1));
  }, [updateState, updateHistory, history]);

  useEffect(() => {
    console.log("STATE CHANGE", state);
  }, [state]);

  return (
    <GameContext.Provider
      value={{
        story,
        state,
        pushGameState,
        overlay,
      }}
    >
      <Setting location={state.location} />
      <Navigation location={state.location} hidden={!!state.scene} />
      <SceneRenderer scenePath={state.scene} />
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        sx={{ position: "absolute", left: 0, top: 0, right: 0, p: 2 }}
      >
        <IconButton onClick={() => popGameState()}>{"←"}</IconButton>
        <Box>{`Day ${state.time[0] + 1} - ${story.times[state.time[1]]}`}</Box>
      </Stack>
      {map(overlays, ({ Overlay, params }, id) => (
        <Overlay key={id} destroy={() => removeOverlay(id)} params={params} />
      ))}
    </GameContext.Provider>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>
  );
};

export default App;
