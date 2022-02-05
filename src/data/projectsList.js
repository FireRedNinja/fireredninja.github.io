let projectList = [
  {
    title: 'Trading Bot',
    description:
      'A Bot that watches live cryptocurrency prices and calculates when to buy/sell using technical analysis metrics and gives notifications through Discord',
    tags: ['personal'],
    image: 'tradingBot.webp',
    links: [],
  },
  {
    title: '5 Minute Journal',
    description:
      'A Desktop Journal App inspired by the official 5 Minute Journal Book.',
    tags: ['personal'],
    image: '5MinuteJournal.webp',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/FireRedNinja/5-minute-journal',
      },
    ],
  },
  {
    title: 'Catch Up',
    description:
      'An Android App to catch up on daily news feeds such as Hacker News, Product Hunt and GitHub Trending Repositories',
    tags: ['personal'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/FireRedNinja/catch_up',
      },
    ],
  },
  {
    title: 'Greetings',
    description:
      'A Firefox New Tab Dashboard that shows favourite links and uses the Mapbox API to generate a topographic map for a Munro (Scottish Mountain)',
    tags: ['personal'],
    image: 'greetings.jpg',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/FireRedNinja/dashboard-extension',
      },
    ],
  },
  {
    title: 'StarCraft 2 Bot',
    description:
      'A Bot that plays StarCraft 2 by following a simple build order',
    tags: ['personal'],
    links: [],
  },
  // {
  //   title: 'Sparrow Quest',
  //   description:
  //     'A mobile game about teaching how to make a good environment for Sparrows',
  //   tags: ['personal'],
  //   links: [],
  // },
];

const hackathonProjects = [
  {
    title: 'Global Game Jam 2022: God Complex',
    description: `"You've already made the choice. Now you have to understand it." - The Oracle. In God Complex you are a god-like being given the opportunity to create life. Will the choices you make help it grow and progress, or lead to its annihilation?`,
    tags: ['hackathon'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/Yasmojam/ggj2022',
      },
      {
        name: 'Github',
        link: 'https://yasmojam.github.io/ggj2022/',
      },
    ],
  },
  {
    title: 'Global Game Jam 2021: Island Dreams',
    description:
      'You are a survivor. Your plane has crashed and you have been lost to society! Stranded on a series of desert islands, you must solve simple puzzles and build a boat to leave the islands and find your way back to the world. Find materials to progress across the islands and achieve this goal!',
    tags: ['hackathon'],
    image: 'islandDreams.webp',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/Yasmojam/GGJ21',
      },
      {
        name: 'itch.io',
        link: 'https://dasha1362.itch.io/island-dream',
      },
    ],
  },
  {
    title: 'Global Game Jam 2020',
    description:
      'A hackathon game about fixing your spaceship before the planet is destroyed. Made with GoDot',
    tags: ['hackathon'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/Yasmojam/GlobalGameJam2020',
      },
    ],
  },
  {
    title: 'GUTS 2019: Do You Have The Guts: Tim Scorer 2.0',
    description: 'A hackathon entry for making an AI to play MS Tanks',
    tags: ['hackathon'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/Yasmojam/DoYouHaveTheGuts2019',
      },
    ],
  },
  {
    title: 'Global Game Jam 2019 - Hermit',
    description:
      'A hackathon game about a hermit crab finding new homes when outgrows its old one. Made with Unity',
    tags: ['hackathon'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/Iain530/GGJ19',
      },
    ],
  },
  {
    title: 'GUDEV February 2019 Game Jam - Game: Jam',
    description:
      'A hackathon game about twins battling to collect ingredients to make jam the fastest. Made with Unity',
    tags: ['hackathon'],
    image: 'gameJam.webp',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/dasha1362/GUDEV5',
      },
      {
        name: 'itch.io',
        link: 'https://dasha1362.itch.io/game-jam',
      },
    ],
  },
  {
    title: 'GUDEV October 2018 Game Jam - Parkour Piggies',
    description:
      'A hackathon game about 2 pigs trying to find their mum. Made with Unity',
    tags: ['hackathon'],
    image: 'parkourPiggies.webp',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/dasha1362/gudev4-deceit',
      },
      {
        name: 'itch.io',
        link: 'https://dasha1362.itch.io/parkour-piggies',
      },
    ],
  },
  {
    title: 'GUDEV March 2018 Game Jam - Salvage',
    description:
      'A hackathon game about salvaging treasure from the ocean floor while avoiding creatures. Made with GoDot',
    tags: ['hackathon'],
    links: [
      {
        name: 'Github',
        link: 'https://github.com/pmaitland/GUDEV_GameJam_Email-',
      },
    ],
  },
  {
    title: 'Global Game Jam 2018 - Operation Wire',
    description:
      'A hackathon game about a virus infecting the network. Made with Unity',
    tags: ['hackathon'],
    image: 'operationWire.webp',
    links: [
      {
        name: 'Github',
        link: 'https://github.com/DevdudeSami/GUEmail_GGJ',
      },
      {
        name: 'itch.io',
        link: 'https://dasha1362.itch.io/operation-wire',
      },
    ],
  },
];

projectList = projectList.concat(hackathonProjects);
export default projectList;
