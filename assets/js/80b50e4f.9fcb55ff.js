"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[2719],{99964:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=t(74848),s=t(28453);const i={sidebar_position:4},r="Sequence Diagrams",o={id:"system-architecture/sequenceDiagram",title:"Sequence Diagrams",description:"Use Case 1",source:"@site/docs/system-architecture/sequenceDiagram.md",sourceDirName:"system-architecture",slug:"/system-architecture/sequenceDiagram",permalink:"/project-automated-plant-caregiver/docs/system-architecture/sequenceDiagram",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/system-architecture/sequenceDiagram.md",tags:[],version:"current",lastUpdatedBy:"SeaRisk",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Class Diagram",permalink:"/project-automated-plant-caregiver/docs/system-architecture/classDiagram"},next:{title:"Version Control",permalink:"/project-automated-plant-caregiver/docs/system-architecture/componentsDescription"}},c={},l=[{value:"Use Case 1",id:"use-case-1",level:2},{value:"A user wants to keep plants watered while away on vacation",id:"a-user-wants-to-keep-plants-watered-while-away-on-vacation",level:3},{value:"Use Case 2",id:"use-case-2",level:2},{value:"A user has plants that need to be kept under light for a certain amount of time",id:"a-user-has-plants-that-need-to-be-kept-under-light-for-a-certain-amount-of-time",level:3},{value:"Use Case 8 - Changing Care Schedule Based on Seasonal Change",id:"use-case-8---changing-care-schedule-based-on-seasonal-change",level:2},{value:"Use Case 9 - Assisting a Beginner in Plant Care",id:"use-case-9---assisting-a-beginner-in-plant-care",level:2}];function d(e){const n={h1:"h1",h2:"h2",h3:"h3",li:"li",mermaid:"mermaid",ol:"ol",p:"p",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"sequence-diagrams",children:"Sequence Diagrams"}),"\n",(0,a.jsx)(n.h2,{id:"use-case-1",children:"Use Case 1"}),"\n",(0,a.jsx)(n.h3,{id:"a-user-wants-to-keep-plants-watered-while-away-on-vacation",children:"A user wants to keep plants watered while away on vacation"}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\nactor User\nparticipant App\nparticipant Login\nparticipant HomePage\nUser->>App: User Opens Plant Parent Application\nactivate App\nUser ->>Login: User enters Login credentials\nactivate Login\nLogin --\x3e>User: credentials accepted user login in\ndeactivate Login\nUser->>HomePage: User selects a plant\nactivate HomePage\nHomePage ->> Plant: renders plantcare page\nactivate Plant\nUser ->> Plant: the plant widget displays a list of choices to the user\nnote over Plant: Options users can select include (watering, adjust lighting, set to vacation mode)\nPlant --\x3e> User: interactiveChoice()\nUser ->> Plant: User selects watering\nPlant ->> Pot: requests moisture level from Pot\nactivate Pot\nPot--\x3e> Plant: returns level of moisture\nPlant ->> Agiai: soil levels are compared to data from agiai\nactivate Agiai\nAgiai --\x3e> Plant: return(bounds of moisture soil should be on for that plant)\ndeactivate Agiai\nPlant  --\x3e> Pot: sets schedule for how long the plant is watered for\nPot --\x3e> App: returns(watering complete)\nApp --\x3e> User: notificationn that the plant has been watered\ndeactivate Pot\ndeactivate Plant\ndeactivate HomePage\ndeactivate App\n"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Upon opening the application, the user is sent to the login in screen"}),"\n",(0,a.jsx)(n.li,{children:"After the user login in they are directed to the home page"}),"\n",(0,a.jsx)(n.li,{children:"From the home page user selects a plant that has already been added to their collection"}),"\n",(0,a.jsx)(n.li,{children:"User is taken into the plant care widget, from there they are able to select from a few options"}),"\n",(0,a.jsx)(n.li,{children:"User chooses to put the plant on a watering cycle"}),"\n",(0,a.jsx)(n.li,{children:"The application grabs data provided by the AGIai api on how much the plant should be watered bases on soil readings"}),"\n",(0,a.jsx)(n.li,{children:"Application sets a watering schedule and sends that to the watering device"}),"\n",(0,a.jsx)(n.li,{children:"after watering is complete user receives a notification"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"use-case-2",children:"Use Case 2"}),"\n",(0,a.jsx)(n.h3,{id:"a-user-has-plants-that-need-to-be-kept-under-light-for-a-certain-amount-of-time",children:"A user has plants that need to be kept under light for a certain amount of time"}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\nactor User\nparticipant App\nparticipant HomePage\nparticipant Plant widget\nparticipant Agiai api\nUser ->> App: User opens the Plant Parent application\nUser ->> HomePage: User selects a plant\nHomePage ->> Plant widget: plant menu is rendered\nUser ->> Plant widget: User selects automatic light control\nPlant widget ->> Agiai api: the amount of time that the plant should be under a light is called from agiai\nAgiai api --\x3e> Plant widget: returns(time, light senstivity)\nPlant widget ->> Pot: sets the Light on a timer based on time given and adjusts lights volume to match\nPot --\x3e> App: sends a response when the lighting is done"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"User opens application, and is taken to home page"}),"\n",(0,a.jsx)(n.li,{children:"User selects plant from their collection"}),"\n",(0,a.jsx)(n.li,{children:"User selects lighting from the plant care widget"}),"\n",(0,a.jsx)(n.li,{children:"Data for how long the plant should be under light is pulled from agiai"}),"\n",(0,a.jsx)(n.li,{children:"The app sets a schedule to turn on and off the lights"}),"\n",(0,a.jsx)(n.li,{children:"App sends a message to the light controller in the pot to turn on and off as needed"}),"\n",(0,a.jsx)(n.li,{children:"Notification is sent to user when the lighting cycle is complete"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"use-case-8---changing-care-schedule-based-on-seasonal-change",children:"Use Case 8 - Changing Care Schedule Based on Seasonal Change"}),"\n",(0,a.jsx)(n.p,{children:"A user wants to change their plant care schedule due to a seasonal change."}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\n    actor User\n    User->>+App: Opens the app\n    User->>App: Inputs current season\n    App->>App: Process season data\n    App->>User: Recommend care adjustments (e.g., less water, more light)\n    User->>App: Approves the changes\n    App->>App: Adjusts care routine based on season and user input\n    App->>-User: Sends updates on water usage, light exposure, etc.\n"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"The user inputs the current season based on the date."}),"\n",(0,a.jsx)(n.li,{children:"The app recommends adjustments for plant care, such as less water or more light."}),"\n",(0,a.jsx)(n.li,{children:"The user checks and approves the changes."}),"\n",(0,a.jsx)(n.li,{children:"The app adjusts its routine according to the season and user input."}),"\n",(0,a.jsx)(n.li,{children:"The app provides updates on water usage, light exposure, and other changes."}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"use-case-9---assisting-a-beginner-in-plant-care",children:"Use Case 9 - Assisting a Beginner in Plant Care"}),"\n",(0,a.jsx)(n.p,{children:"A user has never had experience with plant care before and is unsure how to start."}),"\n",(0,a.jsx)(n.mermaid,{value:"sequenceDiagram\nactor User\nactivate App\nUser->>App: Opens the app\nUser->>App: Accesses the AI chat box\nactivate AI\nUser->>AI: Enters background information and experience\nAI->>User: Delivers personalized care plan\nAI->>User: Provides advice and tips\ndeactivate AI\nUser->>App: Enables notifications\ndeactivate App\n"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"The user opens the app."}),"\n",(0,a.jsx)(n.li,{children:"The user accesses the AI chat box."}),"\n",(0,a.jsx)(n.li,{children:"The user enters their background information and any experience with plants to the AI."}),"\n",(0,a.jsx)(n.li,{children:"The chat delivers a personalized care plan."}),"\n",(0,a.jsx)(n.li,{children:"The chat also provides advice and tips for plant care."}),"\n",(0,a.jsx)(n.li,{children:"The user can enable notifications for reminders."}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var a=t(96540);const s={},i=a.createContext(s);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);