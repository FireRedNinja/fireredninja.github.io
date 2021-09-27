"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[678],{4783:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var n=a(7294),i=a(8331),o=a(3751),r=a(5444),l=[{title:"Trading Bot",description:"A Bot that watches live cryptocurrency prices and calculates when to buy/sell using technical analysis metrics and gives notifications through Discord",tags:["personal"],image:"tradingBot.png",links:[]},{title:"5 Minute Journal",description:"A Desktop Journal App inspired by the official 5 Minute Journal Book.",tags:["personal"],image:"5MinuteJournal.png",links:[{name:"Github",link:"https://github.com/FireRedNinja/5-minute-journal"}]},{title:"Catch Up",description:"An Android App to catch up on daily news feeds such as Hacker News, Product Hunt and GitHub Trending Repositories",tags:["personal"],links:[{name:"Github",link:"https://github.com/FireRedNinja/catch_up"}]},{title:"Greetings",description:"A Firefox New Tab Dashboard that shows favourite links and uses the Mapbox API to generate a topographic map for a Munro (Scottish Mountain)",tags:["personal"],image:"greetings.jpg",links:[{name:"Github",link:"https://github.com/FireRedNinja/dashboard-extension"}]},{title:"StarCraft 2 Bot",description:"A Bot that plays StarCraft 2 by following a simple build order",tags:["personal"],links:[]}],s=l=l.concat([{title:"Global Game Jam 2021: Island Dreams",description:"A hackathon game about fixing your spaceship before the planet is destroyed. Made with GoDot",tags:["hackathon"],image:"islandDreams.png",links:[{name:"Github",link:"https://github.com/Yasmojam/GGJ21"},{name:"itch.io",link:"https://dasha1362.itch.io/island-dream"}]},{title:"Global Game Jam 2020",description:"A hackathon game about fixing your spaceship before the planet is destroyed. Made with GoDot",tags:["hackathon"],links:[{name:"Github",link:"https://github.com/Yasmojam/GlobalGameJam2020"}]},{title:"GUTS 2019: Do You Have The Guts: Tim Scorer 2.0",description:"A hackathon entry for making an AI to play MS Tanks",tags:["hackathon"],links:[{name:"Github",link:"https://github.com/Yasmojam/DoYouHaveTheGuts2019"}]},{title:"Global Game Jam 2019 - Hermit",description:"A hackathon game about a hermit crab finding new homes when outgrows its old one. Made with Unity",tags:["hackathon"],links:[{name:"Github",link:"https://github.com/Iain530/GGJ19"}]},{title:"GUDEV February 2019 Game Jam - Game: Jam",description:"A hackathon game about twins battling to collect ingredients to make jam the fastest. Made with Unity",tags:["hackathon"],image:"gameJam.png",links:[{name:"Github",link:"https://github.com/dasha1362/GUDEV5"},{name:"itch.io",link:"https://dasha1362.itch.io/game-jam"}]},{title:"GUDEV October 2018 Game Jam - Parkour Piggies",description:"A hackathon game about 2 pigs trying to find their mum. Made with Unity",tags:["hackathon"],image:"parkourPiggies.png",links:[{name:"Github",link:"https://github.com/dasha1362/gudev4-deceit"},{name:"itch.io",link:"https://dasha1362.itch.io/parkour-piggies"}]},{title:"GUDEV March 2018 Game Jam - Salvage",description:"A hackathon game about salvaging treasure from the ocean floor while avoiding creatures. Made with GoDot",tags:["hackathon"],links:[{name:"Github",link:"https://github.com/pmaitland/GUDEV_GameJam_Email-"}]},{title:"Global Game Jam 2018 - Operation Wire",description:"A hackathon game about a virus infecting the network. Made with Unity",tags:["hackathon"],image:"operationWire.png",links:[{name:"Github",link:"https://github.com/DevdudeSami/GUEmail_GGJ"},{name:"itch.io",link:"https://dasha1362.itch.io/operation-wire"}]}]),c=a(9519),m=a(7190),h=a(2359),u=function(e){var t=e.show,a=e.onHide,i=e.children;return n.createElement("div",{className:(t?"visible":"hidden")+" block fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-10",onClick:function(){return a()}},n.createElement("div",{className:(t?"visible":"hidden")+" bg-black opacity-50 fixed top-0 left-0 w-full h-full outline-none"}),n.createElement("div",{className:"flex items-center relative w-auto pointer-events-none max-w-max my-8 mx-auto p-4"},i))},d={github:m.zhw,"itch.io":m.ydb},p=function(e){var t=(0,n.useState)(!1),a=t[0],i=t[1];return n.createElement("div",{className:"flex flex-col mb-4 border-solid border rounded p-6"},e.image&&n.createElement(n.Fragment,null,n.createElement("button",{className:"flex justify-center items-center rounded overflow-hidden max-h-32 mb-4 md:max-h-56 hover:bg-gray-100 active:bg-green-700",onClick:function(e){i(!0),e.stopPropagation()},"aria-label":e.title},n.createElement(h.G,{className:"rounded",image:e.image,alt:""})),n.createElement("div",{className:a?"visible":"hidden"},n.createElement(u,{show:a,onHide:function(){return i(!1)}},n.createElement(h.G,{className:"rounded",image:e.image,alt:""})))),n.createElement("div",{className:"flex flex-col"},n.createElement("div",{className:"flex flex-col"},n.createElement("h3",null,e.title),n.createElement("p",{className:"font-extralight"},e.description)),0!==e.links.length&&n.createElement("div",{className:"flex flex-row mt-4"},e.links.map((function(e){return n.createElement("button",{href:e.link,key:e.name,className:"mr-2","aria-label":e.name},n.createElement(c.G,{className:"text-black",icon:d[e.name.toLowerCase()],size:"2x"}))})))))},g=s.filter((function(e){return e.tags.includes("personal")})),b=s.filter((function(e){return e.tags.includes("hackathon")})),f=function(e,t){return e.map((function(e){var a=t.filter((function(t){return t.node.fluid.originalName===e.image}));return a=a.length?a[0].node.gatsbyImageData:void 0,n.createElement(p,{title:e.title,description:e.description,links:e.links,key:e.title,image:a})}))},k=function(){var e=(0,r.useStaticQuery)("742732882").image.edges,t={personal:f(g,e),hackathon:f(b,e)},a=(0,n.useState)(t.personal),i=a[0],o=a[1],l=(0,n.useState)("personal"),s=l[0],c=l[1],m="border-b-2 border-blue-600",h=function(e){"personal"===e?(c("personal"),o(t.personal)):"hackathon"===e&&(c("hackathon"),o(t.hackathon))};return n.createElement("div",{className:"mt-12 mb-12"},n.createElement("h2",{className:"text-2xl font-bold pb-2"},"Projects"),n.createElement("div",{className:"flex flex-row pb-2"},n.createElement("button",{type:"button",className:"text-center px-3 py-2 cursor-pointer mr-4 "+("personal"===s&&m),onClick:function(){return h("personal")},"aria-label":"Personal projects tab"},"Personal"),n.createElement("button",{type:"button",className:"text-center px-3 py-2 cursor-pointer "+("hackathon"===s&&m),onClick:function(){return h("hackathon")},"aria-label":"Hackathon projects tab"},"Hackathon")),n.createElement("div",{className:"flex flex-col mt-2"},i))},G=a(5750),v=a(3935),x=function(e){function t(){return e.apply(this,arguments)||this}(0,G.Z)(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=v.findDOMNode(this);v.unmountComponentAtNode(e),e.outerHTML=this.createComment()},a.createComment=function(){var e=this.props.text;return this.props.trim&&(e=e.trim()),"\x3c!-- "+e+" --\x3e"},a.render=function(){return n.createElement("div",null)},t}(n.Component);x.defaultProps={trim:!0};var w=x,y=function(){return n.createElement(i.Z,null,n.createElement(w,{text:"Favicon - coding by shuai tawf from the Noun Project"}),n.createElement(o.Z,{title:"Home"}),n.createElement(k,null))}}}]);
//# sourceMappingURL=component---src-pages-index-js-88cb8bc9d869a129d41b.js.map