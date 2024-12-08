"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[5911],{49759:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=s(74848),t=s(28453);const r={sidebar_position:3},l="Frontend Documentation",o={id:"api-specification/FrontendDocumentation",title:"Frontend Documentation",description:"Overview",source:"@site/docs/api-specification/FrontendDocumentation.md",sourceDirName:"api-specification",slug:"/api-specification/FrontendDocumentation",permalink:"/project-automated-plant-caregiver/docs/api-specification/FrontendDocumentation",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/api-specification/FrontendDocumentation.md",tags:[],version:"current",lastUpdatedBy:"Jae Lutz",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"API 1 - PlantParent",permalink:"/project-automated-plant-caregiver/docs/api-specification/openapi-spec"},next:{title:"Test Procedures",permalink:"/project-automated-plant-caregiver/docs/category/test-procedures"}},c={},d=[{value:"Overview",id:"overview",level:2},{value:"Components",id:"components",level:2},{value:"<strong>WebApplication</strong>",id:"webapplication",level:3},{value:"<strong>PageDisplay</strong>",id:"pagedisplay",level:3},{value:"<strong>NavBar</strong>",id:"navbar",level:3},{value:"<strong>LoginPage</strong>",id:"loginpage",level:3},{value:"<strong>RegisterPage</strong>",id:"registerpage",level:3},{value:"<strong>FrontPage</strong>",id:"frontpage",level:3},{value:"<strong>CalculationsPage</strong>",id:"calculationspage",level:3},{value:"<strong>AIPage</strong>",id:"aipage",level:3},{value:"<strong>TutorialPage</strong>",id:"tutorialpage",level:3},{value:"<strong>Preset Component</strong>",id:"preset-component",level:3}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"frontend-documentation",children:"Frontend Documentation"}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsxs)(n.p,{children:["The frontend of the ",(0,i.jsx)(n.strong,{children:"PlantParent"})," application is responsible for rendering the user interface, managing user interactions, and displaying data retrieved from the backend. It includes several key pages and components, such as user authentication pages, plant care management pages, AI interactions, and hardware control interfaces."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,i.jsx)(n.h3,{id:"webapplication",children:(0,i.jsx)(n.strong,{children:"WebApplication"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The main entry point of the application that manages the lifecycle of the frontend."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'appName: String = "PlantParent"'}),": The name of the application."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"version: String = 1"}),": The version of the application."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"startApp()"}),": Initializes and starts the frontend application."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"stopApp()"}),": Stops the frontend application."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"pagedisplay",children:(0,i.jsx)(n.strong,{children:"PageDisplay"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The component responsible for displaying different pages in the application."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"page: String"}),": Represents the current page being displayed."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"showPage(page: String)"}),": Displays the specified page."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"openTutorial()"}),": Opens a tutorial related to the current page."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"navbar",children:(0,i.jsx)(n.strong,{children:"NavBar"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The navigation bar that is displayed across all pages of the application."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"menuItems: List<String>"}),": A list of menu items that allow users to navigate between pages."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"UserProfileIcon: List<String>"}),": The icon for the logged-in user's profile."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"renderMenu()"}),": Renders the navigation menu."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"loginpage",children:(0,i.jsx)(n.strong,{children:"LoginPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The login page where users authenticate to access their accounts."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"username: String"}),": The username entered by the user."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"password: String"}),": The password entered by the user."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"email: String"}),": (Optional) The user's email for account recovery."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"authenticate()"}),": Authenticates the user and logs them into the application."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"forgotPassword()"}),": Initiates the password recovery process for the user."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"registerpage",children:(0,i.jsx)(n.strong,{children:"RegisterPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The registration page where users create new accounts."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"userDetails: Map<String, String>"}),": A map of user details including username, password, and email."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"registerUser()"}),": Registers a new user with the provided details."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"validateInput()"}),": Validates the registration inputs before submission."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"frontpage",children:(0,i.jsx)(n.strong,{children:"FrontPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The main landing page of the application displaying the featured content."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"featuredContent: String"}),": The content featured on the homepage, such as tips or plant care articles."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"displayFeaturedContent()"}),": Displays the featured content on the homepage."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"calculationspage",children:(0,i.jsx)(n.strong,{children:"CalculationsPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The page for managing plant care calculations and applying saved presets."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"plantDetails: String"}),": The details of the current plant being managed."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"inputValues: List<Float>"}),": User-provided input values for plant care (e.g., water amount, light exposure)."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"savedPresets: List<Preset>"}),": A list of saved presets for plant care."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"setSettings()"}),": Sets custom plant care settings."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"askAI()"}),": Sends the current data to the AI for recommendations."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"loadPresets()"}),": Loads presets from the backend."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"selectPreset(preset: Preset)"}),": Selects a preset to apply to the current plant care settings."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"displayPresets()"}),": Displays the list of available presets."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"aipage",children:(0,i.jsx)(n.strong,{children:"AIPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The page for interacting with the AI model and receiving plant care recommendations."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"aiModel: String"}),": The AI model used for generating recommendations."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"userPrompt: String"}),": The prompt provided by the user for AI input."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"aiResponse: String"}),": The response generated by the AI based on the prompt."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"runAIModel()"}),": Executes the AI model to get recommendations."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"displayResponse(userPrompt: String): String"}),": Displays the AI's response to the user."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"tutorialpage",children:(0,i.jsx)(n.strong,{children:"TutorialPage"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": The page that displays a tutorial or help content for users."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"tutorialContent: String"}),": The content of the tutorial displayed on the page."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"tutorialURL: String"}),": A link to external tutorial resources."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"open()"}),": Opens and displays the tutorial content."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"preset-component",children:(0,i.jsx)(n.strong,{children:"Preset Component"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Description"}),": A component representing a plant care preset created by a user."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"presetName: String"}),": The name of the preset."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"createdBy: String"}),": The username of the user who created the preset."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"calculationValues: List<Float>"}),": The values associated with the preset."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Methods"}),":","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"savePreset()"}),": Saves the current preset to the backend."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"deletePreset()"}),": Deletes the preset from the system."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"This frontend documentation provides an overview of the main components, their attributes and methods, and how the various parts of the application interact with each other. It can be extended or updated based on future developments in the project."})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var i=s(96540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);