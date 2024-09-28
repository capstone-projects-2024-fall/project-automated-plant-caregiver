"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[4454],{96041:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var a=t(74848),s=t(28453);const r={sidebar_position:1},i="Class Diagram",o={id:"system-architecture/classDiagram",title:"Class Diagram",description:"WebApplication",source:"@site/docs/system-architecture/classDiagram.md",sourceDirName:"system-architecture",slug:"/system-architecture/classDiagram",permalink:"/project-automated-plant-caregiver/docs/system-architecture/classDiagram",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/system-architecture/classDiagram.md",tags:[],version:"current",lastUpdatedBy:"btruong178",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"System Architecture",permalink:"/project-automated-plant-caregiver/docs/category/system-architecture"},next:{title:"Sequence Diagrams",permalink:"/project-automated-plant-caregiver/docs/system-architecture/sequenceDiagram"}},l={},c=[{value:"WebApplication",id:"webapplication",level:3},{value:"PageDisplay",id:"pagedisplay",level:3},{value:"FrontPage",id:"frontpage",level:3},{value:"CalculationsPage",id:"calculationspage",level:3},{value:"AIPage",id:"aipage",level:3},{value:"LoginPage",id:"loginpage",level:3},{value:"RegisterPage",id:"registerpage",level:3},{value:"NavBar",id:"navbar",level:3},{value:"TutorialPage",id:"tutorialpage",level:3},{value:"User",id:"user",level:3},{value:"Preset",id:"preset",level:3},{value:"Database",id:"database",level:3},{value:"HardwareComponent",id:"hardwarecomponent",level:3},{value:"Light",id:"light",level:3},{value:"LightSensor",id:"lightsensor",level:3},{value:"MoistureSensor",id:"moisturesensor",level:3},{value:"TemperatureHumiditySensor",id:"temperaturehumiditysensor",level:3},{value:"WaterPump",id:"waterpump",level:3}];function d(e){const n={h1:"h1",h3:"h3",mermaid:"mermaid",p:"p",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"class-diagram",children:"Class Diagram"}),"\n",(0,a.jsx)(n.mermaid,{value:'classDiagram\n    class WebApplication {\n        +String appName = "PlantParent"\n        +String version = 1\n        +startApp()\n        +stopApp()\n    }\n    class PageDisplay {\n        +String page\n        +showPage(page: String)\n        +openTutorial()\n    }\n    class FrontPage {\n        +String featuredContent\n        +displayFeaturedContent()\n    }\n    class CalculationsPage {\n        +String plantDetails\n        +List<Float> inputValues\n        +List<Preset> savedPresets\n        +setSettings()\n        +askAI()\n        +loadPresets()\n        +selectPreset(preset: Preset)\n        +displayPresets()\n    }\n    class AIPage {\n        +String aiModel\n        +String userPrompt\n        +String aiResponse\n        +runAIModel()\n        +displayResponse(userPrompt: String): String\n    }\n    class LoginPage {\n        +String username\n        +String password\n        +String email\n        +authenticate()\n        +forgotPassword()\n    }\n    class RegisterPage {\n        +Map<String, String> userDetails\n        +registerUser()\n        +validateInput()\n    }\n    class NavBar {\n        +List<String> menuItems\n        +renderMenu()\n    }\n    class TutorialPage {\n        +String tutorialContent\n        +String tutorialURL\n        +open()\n    }\n    class User {\n        +String username\n        +String password\n        +String email\n        +register()\n        +login()\n        +logout()\n    }\n    class Preset {\n        +String presetName\n        +String createdBy\n        +List<Float> calculationValues\n        +savePreset()\n        +deletePreset()\n    }\n    class Database {\n        +List<User> users\n        +List<Preset> presets\n        +addUser(user: User)\n        +removeUser(user: User)\n        +savePreset(preset: Preset)\n        +loadPresets(username: String): List<Preset>\n    }\n    class HardwareComponent {\n        +String componentName\n        +String componentType\n        +boolean isActive\n        +updateSettings(settings: String)\n        +activate()\n        +deactivate()\n        +getStatus()\n    }\n    class Light {\n        +int brightnessLevel\n        +setBrightness(level: int)\n    }\n    class LightSensor {\n        +float lightIntensity\n        +readLightIntensity(): float\n    }\n    class MoistureSensor {\n        +float moistureLevel\n        +readMoistureLevel(): float\n    }\n    class TemperatureHumiditySensor {\n        +float temperature\n        +float humidity\n        +readTemperature(): float\n        +readHumidity(): float\n    }\n    class WaterPump {\n        +int flowRate\n        +setFlowRate(rate: int)\n    }\n    WebApplication --\x3e PageDisplay\n    WebApplication --\x3e Database\n    PageDisplay <|-- LoginPage\n    PageDisplay <|-- RegisterPage\n    PageDisplay <|-- FrontPage\n    PageDisplay <|-- CalculationsPage\n    PageDisplay <|-- AIPage\n    PageDisplay --\x3e TutorialPage : All Pages have access\n    PageDisplay --\x3e NavBar: All Pages have access\n    CalculationsPage --\x3e Database : Access Presets and Hardware\n    LoginPage --\x3e Database : Access List of Users\n    RegisterPage --\x3e Database: Checks or Adds to List of Users\n    AIPage --\x3e CalculationsPage: Gives Recommendations\n \n    Database --\x3e User\n    Database --\x3e Preset\n    Database --\x3e HardwareComponent\n    User "1" --\x3e "0..*" Preset\n    HardwareComponent <|-- Light\n    HardwareComponent <|-- LightSensor\n    HardwareComponent <|-- MoistureSensor\n    HardwareComponent <|-- TemperatureHumiditySensor\n    HardwareComponent <|-- WaterPump'}),"\n",(0,a.jsx)(n.h1,{id:"descriptions-of-each-class",children:"Descriptions of Each Class"}),"\n",(0,a.jsx)(n.h3,{id:"webapplication",children:"WebApplication"}),"\n",(0,a.jsx)(n.p,{children:"Manages the core functionality of the PlantParent app, with features to start and stop the application. It connects to both the page display and the database for managing the system."}),"\n",(0,a.jsx)(n.h3,{id:"pagedisplay",children:"PageDisplay"}),"\n",(0,a.jsx)(n.p,{children:"Controls the visual interface of the app, displaying different pages such as the front page, calculation settings, AI recommendations, login, and register. It can also open the tutorial."}),"\n",(0,a.jsx)(n.h3,{id:"frontpage",children:"FrontPage"}),"\n",(0,a.jsx)(n.p,{children:"Displays the featured content on the application\u2019s homepage, showcasing primary information."}),"\n",(0,a.jsx)(n.h3,{id:"calculationspage",children:"CalculationsPage"}),"\n",(0,a.jsx)(n.p,{children:"Handles settings for plant care, allowing the user to input data, interact with saved presets, and request AI recommendations. It also manages settings for connected hardware."}),"\n",(0,a.jsx)(n.h3,{id:"aipage",children:"AIPage"}),"\n",(0,a.jsx)(n.p,{children:"Manages AI interactions, running the AI model based on user input and providing responses. It connects with the calculations page to give plant care advice."}),"\n",(0,a.jsx)(n.h3,{id:"loginpage",children:"LoginPage"}),"\n",(0,a.jsx)(n.p,{children:"Authenticates users through their login credentials, with options for password recovery."}),"\n",(0,a.jsx)(n.h3,{id:"registerpage",children:"RegisterPage"}),"\n",(0,a.jsx)(n.p,{children:"Registers new users by collecting and validating their details, and storing them in the database."}),"\n",(0,a.jsx)(n.h3,{id:"navbar",children:"NavBar"}),"\n",(0,a.jsx)(n.p,{children:"Renders a menu for navigating between the different pages in the application."}),"\n",(0,a.jsx)(n.h3,{id:"tutorialpage",children:"TutorialPage"}),"\n",(0,a.jsx)(n.p,{children:"Displays instructional content, guiding users through app functionality and linking to external tutorials."}),"\n",(0,a.jsx)(n.h3,{id:"user",children:"User"}),"\n",(0,a.jsx)(n.p,{children:"Represents a user of the application, managing registration, login, and logout actions."}),"\n",(0,a.jsx)(n.h3,{id:"preset",children:"Preset"}),"\n",(0,a.jsx)(n.p,{children:"Stores preset plant care configurations, allowing users to save and delete personalized settings."}),"\n",(0,a.jsx)(n.h3,{id:"database",children:"Database"}),"\n",(0,a.jsx)(n.p,{children:"Stores users, presets, and hardware components, facilitating data retrieval and storage for the application."}),"\n",(0,a.jsx)(n.h3,{id:"hardwarecomponent",children:"HardwareComponent"}),"\n",(0,a.jsx)(n.p,{children:"Represents the different hardware devices used in the app, with functionality to activate, deactivate, and update settings."}),"\n",(0,a.jsx)(n.h3,{id:"light",children:"Light"}),"\n",(0,a.jsx)(n.p,{children:"A type of hardware component controlling the brightness level of a light source."}),"\n",(0,a.jsx)(n.h3,{id:"lightsensor",children:"LightSensor"}),"\n",(0,a.jsx)(n.p,{children:"A sensor hardware component that reads and returns the light intensity level."}),"\n",(0,a.jsx)(n.h3,{id:"moisturesensor",children:"MoistureSensor"}),"\n",(0,a.jsx)(n.p,{children:"Reads and returns the soil moisture level for plant care."}),"\n",(0,a.jsx)(n.h3,{id:"temperaturehumiditysensor",children:"TemperatureHumiditySensor"}),"\n",(0,a.jsx)(n.p,{children:"Measures and reports the temperature and humidity levels in the environment."}),"\n",(0,a.jsx)(n.h3,{id:"waterpump",children:"WaterPump"}),"\n",(0,a.jsx)(n.p,{children:"A component controlling the water flow rate to manage irrigation for the plants."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var a=t(96540);const s={},r=a.createContext(s);function i(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);