export interface ProjectLink {
  name: "Github" | "Game" | "Live Site";
  link: string;
  ariaLabel: string;
}

export interface Project {
  title: string;
  description: string;
  tags: ("personal" | "hackathon")[];
  image?: string;
  imageAlt?: string;
  links: ProjectLink[];
}

/**
 * Helper to create a project link with auto-generated aria label
 */
function createLink(
  name: "Github" | "Game" | "Live Site",
  link: string,
  projectTitle: string
): ProjectLink {
  const ariaLabels: Record<ProjectLink["name"], string> = {
    Github: `View source code for ${projectTitle} on GitHub, opens in new tab`,
    Game: `Play ${projectTitle} game, opens in new tab`,
    "Live Site": `View ${projectTitle} live site, opens in new tab`,
  };
  return { name, link, ariaLabel: ariaLabels[name] };
}

const personalProjects: Project[] = [
  {
    title: "Fretflow",
    description:
      "A web app to help guitarists learn music theory and improve their fretboard knowledge through interactive exercises and visualizations.",
    tags: ["personal"],
    image: "fretflow.webp",
    imageAlt:
      "Screenshot of Fretflow web app showing guitar fretboard with notes and interactive exercises",
    links: [
      createLink(
        "Live Site",
        "https://fireredninja.github.io/fretflow/",
        "Fretflow"
      ),
      createLink(
        "Github",
        "https://github.com/FireRedNinja/fretflow",
        "Fretflow"
      ),
    ],
  },
  {
    title: "Art of Runeterra",
    description:
      "A web app that showcases the art of the card game Legends of Runeterra",
    tags: ["personal"],
    links: [
      createLink(
        "Github",
        "https://github.com/FireRedNinja/art-of-runeterra",
        "Art of Runeterra"
      ),
      createLink(
        "Live Site",
        "https://fireredninja.github.io/art-of-runeterra/",
        "Art of Runeterra"
      ),
    ],
  },
  {
    title: "Hex-Guessr",
    description:
      "A web app that challenges players to guess the hex color codes of various colors.",
    tags: ["personal"],
    image: "hex-guessr.webp",
    links: [
      createLink(
        "Github",
        "https://github.com/FireRedNinja/hex-guessr",
        "Hex-Guessr"
      ),
      // createLink(
      //   "Live Site",
      //   "https://fireredninja.github.io/hex-guessr/",
      //   "Hex-Guessr"
      // ),
    ],
  },
  {
    title: "Trading Bot",
    description:
      "A Bot that watches live cryptocurrency prices and calculates when to buy/sell using technical analysis metrics and gives notifications through Discord",
    tags: ["personal"],
    image: "tradingBot.webp",
    imageAlt:
      "Screenshot of Trading Bot dashboard showing cryptocurrency price charts and trading signals",
    links: [],
  },
  {
    title: "5 Minute Journal",
    description:
      "A Desktop Journal App inspired by the official 5 Minute Journal Book.",
    tags: ["personal"],
    image: "5MinuteJournal.webp",
    imageAlt:
      "Screenshot of 5 Minute Journal app showing the daily journaling interface",
    links: [
      createLink(
        "Github",
        "https://github.com/FireRedNinja/5-minute-journal",
        "5 Minute Journal"
      ),
    ],
  },
  {
    title: "Catch Up",
    description:
      "An Android App to catch up on daily news feeds such as Hacker News, Product Hunt and GitHub Trending Repositories",
    tags: ["personal"],
    links: [
      createLink(
        "Github",
        "https://github.com/FireRedNinja/catch_up",
        "Catch Up"
      ),
    ],
  },
  {
    title: "Greetings",
    description:
      "A Firefox New Tab Dashboard that shows favourite links and uses the Mapbox API to generate a topographic map for a Munro (Scottish Mountain)",
    tags: ["personal"],
    image: "greetings.jpg",
    imageAlt:
      "Screenshot of Greetings Firefox extension showing a topographic map dashboard",
    links: [
      createLink(
        "Github",
        "https://github.com/FireRedNinja/dashboard-extension",
        "Greetings"
      ),
    ],
  },
  {
    title: "StarCraft 2 Bot",
    description:
      "A Bot that plays StarCraft 2 by following a simple build order",
    tags: ["personal"],
    links: [],
  },
];

const hackathonProjects: Project[] = [
  {
    title: "Global Game Jam 2022: God Complex",
    description: `"You've already made the choice. Now you have to understand it." - The Oracle. In God Complex you are a god-like being given the opportunity to create life. Will the choices you make help it grow and progress, or lead to its annihilation?`,
    tags: ["hackathon"],
    links: [
      createLink(
        "Github",
        "https://github.com/Yasmojam/ggj2022",
        "God Complex"
      ),
      createLink("Game", "https://yasmojam.github.io/ggj2022/", "God Complex"),
    ],
  },
  {
    title: "Global Game Jam 2021: Island Dreams",
    description:
      "You are a survivor. Your plane has crashed and you have been lost to society! Stranded on a series of desert islands, you must solve simple puzzles and build a boat to leave the islands and find your way back to the world. Find materials to progress across the islands and achieve this goal!",
    tags: ["hackathon"],
    image: "islandDreams.webp",
    imageAlt:
      "Screenshot of Island Dreams game showing a tropical island environment",
    links: [
      createLink(
        "Github",
        "https://github.com/Yasmojam/GGJ21",
        "Island Dreams"
      ),
      createLink(
        "Game",
        "https://dasha1362.itch.io/island-dream",
        "Island Dreams"
      ),
    ],
  },
  {
    title: "Global Game Jam 2020",
    description:
      "A hackathon game about fixing your spaceship before the planet is destroyed. Made with GoDot",
    tags: ["hackathon"],
    links: [
      createLink(
        "Github",
        "https://github.com/Yasmojam/GlobalGameJam2020",
        "Global Game Jam 2020"
      ),
    ],
  },
  {
    title: "GUTS 2019: Do You Have The Guts: Tim Scorer 2.0",
    description: "A hackathon entry for making an AI to play MS Tanks",
    tags: ["hackathon"],
    links: [
      createLink(
        "Github",
        "https://github.com/Yasmojam/DoYouHaveTheGuts2019",
        "Tim Scorer 2.0"
      ),
    ],
  },
  {
    title: "Global Game Jam 2019 - Hermit",
    description:
      "A hackathon game about a hermit crab finding new homes when outgrows its old one. Made with Unity",
    tags: ["hackathon"],
    links: [createLink("Github", "https://github.com/Iain530/GGJ19", "Hermit")],
  },
  {
    title: "GUDEV February 2019 Game Jam - Game: Jam",
    description:
      "A hackathon game about twins battling to collect ingredients to make jam the fastest. Made with Unity",
    tags: ["hackathon"],
    image: "gameJam.webp",
    imageAlt:
      "Screenshot of Game: Jam showing the twin characters collecting ingredients",
    links: [
      createLink("Github", "https://github.com/dasha1362/GUDEV5", "Game: Jam"),
      createLink("Game", "https://dasha1362.itch.io/game-jam", "Game: Jam"),
    ],
  },
  {
    title: "GUDEV October 2018 Game Jam - Parkour Piggies",
    description:
      "A hackathon game about 2 pigs trying to find their mum. Made with Unity",
    tags: ["hackathon"],
    image: "parkourPiggies.webp",
    imageAlt:
      "Screenshot of Parkour Piggies game showing pig characters in a platforming level",
    links: [
      createLink(
        "Github",
        "https://github.com/dasha1362/gudev4-deceit",
        "Parkour Piggies"
      ),
      createLink(
        "Game",
        "https://dasha1362.itch.io/parkour-piggies",
        "Parkour Piggies"
      ),
    ],
  },
  {
    title: "GUDEV March 2018 Game Jam - Salvage",
    description:
      "A hackathon game about salvaging treasure from the ocean floor while avoiding creatures. Made with GoDot",
    tags: ["hackathon"],
    links: [
      createLink(
        "Github",
        "https://github.com/pmaitland/GUDEV_GameJam_Email-",
        "Salvage"
      ),
    ],
  },
  {
    title: "Global Game Jam 2018 - Operation Wire",
    description:
      "A hackathon game about a virus infecting the network. Made with Unity",
    tags: ["hackathon"],
    image: "operationWire.webp",
    imageAlt:
      "Screenshot of Operation Wire game showing a network visualization with virus spreading",
    links: [
      createLink(
        "Github",
        "https://github.com/DevdudeSami/GUEmail_GGJ",
        "Operation Wire"
      ),
      createLink(
        "Game",
        "https://dasha1362.itch.io/operation-wire",
        "Operation Wire"
      ),
    ],
  },
];

const projectsList: Project[] = [...personalProjects, ...hackathonProjects];

export default projectsList;
