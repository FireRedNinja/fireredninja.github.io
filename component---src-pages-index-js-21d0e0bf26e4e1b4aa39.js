(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{OGtf:function(e,t,a){var n=a("XKFU"),i=a("eeVq"),o=a("vhPU"),r=/"/g,l=function(e,t,a,n){var i=String(o(e)),l="<"+t;return""!==a&&(l+=" "+a+'="'+String(n).replace(r,"&quot;")+'"'),l+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(l),n(n.P+n.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},RXBc:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),i=a.n(n),o=(a("8ypT"),a("Bl7J")),r=a("vrFN"),l=(a("f3/d"),a("tUrg"),a("IP2g")),s=a("8tEE"),m={github:s.a,"itch.io":s.b},c=function(e){return i.a.createElement("div",{className:"flex flex-row mt-2 border-solid border rounded lg:p-5"},i.a.createElement("div",{className:"flex flex-col flex-grow p-4"},i.a.createElement("div",{className:"text-lg"},e.title),i.a.createElement("div",{className:"text-gray-600"},e.description)),i.a.createElement("div",{className:"flex flex-col p-4"},e.links.map((function(e){return i.a.createElement("a",{href:e.link,key:e.name,className:"mb-2"},i.a.createElement(l.a,{icon:m[e.name.toLowerCase()],size:"2x"}))}))))},u=[{title:"Sparrow Quest",description:"A mobile game about teaching how to make a good environment for Sparrows",links:[]},{title:"Game (Coming Soon)",description:"A platformer game. Made with Unity",links:[]},{title:"GUDEV March 2018 Game Jam - Salvage",description:"A hackathon game about salvaging treasure from the ocean floor while avoiding creatures. Made with GoDot",links:[{name:"Github",link:"https://github.com/pmaitland/GUDEV_GameJam_Email-"}]},{title:"GUDEV October 2018 Game Jam - Parkour Piggies",description:"A hackathon game about 2 pigs trying to find their mum. Made with Unity",links:[{name:"Github",link:"https://github.com/dasha1362/gudev4-deceit"},{name:"itch.io",link:"https://dasha1362.itch.io/parkour-piggies"}]},{title:"Global Game Jam 2018 - Operation Wire",description:"A hackathon game about a virus infecting the network. Made with Unity",links:[{name:"Github",link:"https://github.com/DevdudeSami/GUEmail_GGJ"},{name:"itch.io",link:"https://dasha1362.itch.io/operation-wire"}]},{title:"GUDEV February 2019 Game Jam - Game: Jam",description:"A hackathon game about twins battling to collect ingredients to make jam the fastest. Made with Unity",links:[{name:"Github",link:"https://github.com/dasha1362/GUDEV5"},{name:"itch.io",link:"https://dasha1362.itch.io/game-jam"}]},{title:"Global Game Jam 2019 - Hermit",description:"A hackathon game about a hermit crab finding new homes when outgrows its old one. Made with Unity",links:[{name:"Github",link:"https://github.com/Iain530/GGJ19"}]},{title:"GUTS: Do You Have The Guts: Tim Scorer 2.0",description:"A hackathon entry for making an AI to play MS Tanks",links:[{name:"Github",link:"https://github.com/Yasmojam/DoYouHaveTheGuts2019"}]},{title:"Global Game Jam 2020",description:"A hackathon game about fixing your spaceship before the planet is destroyed. Made with GoDot",links:[{name:"Github",link:"https://github.com/Yasmojam/GlobalGameJam2020"}]},{title:"Tweetee",description:"An Android Twitter translator",links:[{name:"Github",link:"https://github.com/FireRedNinja/Tweetee"}]},{title:"Bodyweight Fitness Android",description:"A mobile fitness app that lets you follow bodyweight workouts from youtube.",links:[{name:"Github",link:"https://github.com/FireRedNinja/Bodyweight-Fitness-Android"}]}],h=function(){return i.a.createElement("div",{className:"mt-12"},i.a.createElement("h1",{className:"text-3xl mb-4"},"Projects."),i.a.createElement("div",{className:"flex flex-col"},u.map((function(e){return i.a.createElement(c,{title:e.title,description:e.description,links:e.links,key:e.title})}))))},d=function(){return i.a.createElement("div",{className:"my-12"},i.a.createElement("h1",{className:"text-3xl mt-8 mb-4"},"Contact Me."),i.a.createElement("div",{className:"w-full max-w-full"},i.a.createElement("form",{action:"https://formspree.io/leonr13@hotmail.co.uk",method:"POST"},i.a.createElement("div",{className:"mb-4"},i.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",name:"_replyto",id:"email",type:"text",placeholder:"Email"})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",name:"_subject",id:"Subject",type:"text",placeholder:"Subject",required:!0})),i.a.createElement("div",{className:"mb-4"},i.a.createElement("textarea",{name:"message",className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"Message",rows:"3",placeholder:"How can I help?",required:!0})),i.a.createElement("div",{className:"flex items-center"},i.a.createElement("button",{className:"bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline",type:"submit",value:"SEND"},"Submit")))))},p=(a("a1Th"),a("Btvt"),a("I5cv"),a("i8i4")),f=a.n(p);var g=function(e){var t,a;a=e,(t=o).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var n;n=o;function o(){return e.apply(this,arguments)||this}var r=o.prototype;return r.componentDidMount=function(){var e=f.a.findDOMNode(this);f.a.unmountComponentAtNode(e),e.outerHTML=this.createComment()},r.createComment=function(){var e=this.props.text;return this.props.trim&&(e=e.trim()),"\x3c!-- "+e+" --\x3e"},r.render=function(){return i.a.createElement("div",null)},o}(n.Component);g.defaultProps={trim:!0};var b=g;t.default=function(){return i.a.createElement(o.a,null,i.a.createElement(b,{text:"Favicon - coding by shuai tawf from the Noun Project"}),i.a.createElement(r.a,{title:"Home"}),i.a.createElement(h,null),i.a.createElement(d,null))}},tUrg:function(e,t,a){"use strict";a("OGtf")("link",(function(e){return function(t){return e(this,"a","href",t)}}))}}]);
//# sourceMappingURL=component---src-pages-index-js-21d0e0bf26e4e1b4aa39.js.map