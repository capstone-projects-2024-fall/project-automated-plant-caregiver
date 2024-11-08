"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[5110],{7979:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>o});var r=s(74848),t=s(28453);const i={sidebar_position:1,description:"What should be in this section."},l="Backend Documentation",d={id:"api-specification/BackendDocumentation",title:"Backend Documentation",description:"What should be in this section.",source:"@site/docs/api-specification/BackendDocumentation.md",sourceDirName:"api-specification",slug:"/api-specification/BackendDocumentation",permalink:"/project-automated-plant-caregiver/docs/api-specification/BackendDocumentation",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/api-specification/BackendDocumentation.md",tags:[],version:"current",lastUpdatedBy:"Mustafa Paroya",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"What should be in this section."},sidebar:"docsSidebar",previous:{title:"API Specification",permalink:"/project-automated-plant-caregiver/docs/category/api-specification"},next:{title:"API 1 - PlantParent",permalink:"/project-automated-plant-caregiver/docs/api-specification/openapi-spec"}},c={},o=[{value:"Overview",id:"overview",level:2},{value:"Database Models",id:"database-models",level:2},{value:"<strong>User</strong>",id:"user",level:3},{value:"<strong>Preset</strong>",id:"preset",level:3},{value:"<strong>Database</strong>",id:"database",level:3},{value:"Hardware Models",id:"hardware-models",level:2},{value:"<strong>HardwareComponent</strong>",id:"hardwarecomponent",level:3},{value:"<strong>Light</strong>",id:"light",level:3},{value:"<strong>LightSensor</strong>",id:"lightsensor",level:3},{value:"<strong>MoistureSensor</strong>",id:"moisturesensor",level:3},{value:"<strong>TemperatureHumiditySensor</strong>",id:"temperaturehumiditysensor",level:3},{value:"<strong>WaterPump</strong>",id:"waterpump",level:3}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"backend-documentation",children:"Backend Documentation"}),"\n",(0,r.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsxs)(n.p,{children:["The backend architecture for the ",(0,r.jsx)(n.strong,{children:"PlantParent"})," application consists of several components that manage user data, plant care presets, AI interactions, and hardware control. The backend handles the following tasks:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"User authentication and registration."}),"\n",(0,r.jsx)(n.li,{children:"Management of plant care presets."}),"\n",(0,r.jsx)(n.li,{children:"Interaction with hardware components like lights, sensors, and water pumps."}),"\n",(0,r.jsx)(n.li,{children:"AI recommendations based on plant data."}),"\n",(0,r.jsx)(n.li,{children:"Database management for users, presets, and hardware configurations."}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"database-models",children:"Database Models"}),"\n",(0,r.jsx)(n.h3,{id:"user",children:(0,r.jsx)(n.strong,{children:"User"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Represents a user of the application."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"username: String"}),": The username of the user."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"password: String"}),": The password of the user, typically hashed."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"email: String"}),": The user's email address for communication and authentication."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"register()"}),": Registers the user in the system."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"login()"}),": Authenticates the user's login credentials."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"logout()"}),": Logs the user out of the system."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"preset",children:(0,r.jsx)(n.strong,{children:"Preset"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": Represents a set of saved configurations for plant care calculations."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"presetName: String"}),": The name of the preset."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"createdBy: String"}),": The user who created the preset."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"calculationValues: List<Float>"}),": The list of values (e.g., water amount, light exposure) saved in the preset."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"savePreset()"}),": Saves the preset data to the database."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"deletePreset()"}),": Deletes the preset from the system."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"database",children:(0,r.jsx)(n.strong,{children:"Database"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": The main database for storing users, presets, and hardware component data."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"users: List<User>"}),": A list of registered users in the system."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"presets: List<Preset>"}),": A list of saved presets for plant care configurations."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"addUser(user: User)"}),": Adds a new user to the database."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"removeUser(user: User)"}),": Removes a user from the database."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"savePreset(preset: Preset)"}),": Saves a preset to the database."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"loadPresets(username: String): List<Preset>"}),": Loads all presets for a specific user."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"hardware-models",children:"Hardware Models"}),"\n",(0,r.jsx)(n.h3,{id:"hardwarecomponent",children:(0,r.jsx)(n.strong,{children:"HardwareComponent"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": The base class for hardware components that interact with the system."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"componentName: String"}),": The name of the hardware component (e.g., Light, Sensor, WaterPump)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"componentType: String"}),": The type of hardware (e.g., sensor, actuator)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"isActive: Boolean"}),": Whether the component is currently active."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"updateSettings(settings: String)"}),": Updates the hardware settings."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"activate()"}),": Activates the hardware component."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"deactivate()"}),": Deactivates the hardware component."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"getStatus()"}),": Retrieves the current status of the hardware component."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"light",children:(0,r.jsx)(n.strong,{children:"Light"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": A hardware component class representing a light that can be controlled by the system."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"brightnessLevel: int"}),": The brightness level of the light."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"setBrightness(level: int)"}),": Adjusts the brightness level of the light."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"lightsensor",children:(0,r.jsx)(n.strong,{children:"LightSensor"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": A sensor class that monitors light intensity."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"lightIntensity: float"}),": The current light intensity value."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"readLightIntensity(): float"}),": Reads and returns the current light intensity level."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"moisturesensor",children:(0,r.jsx)(n.strong,{children:"MoistureSensor"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": A sensor class that monitors soil moisture levels."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"moistureLevel: float"}),": The current soil moisture value."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"readMoistureLevel(): float"}),": Reads and returns the current soil moisture level."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"temperaturehumiditysensor",children:(0,r.jsx)(n.strong,{children:"TemperatureHumiditySensor"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": A sensor class that monitors temperature and humidity levels."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"temperature: float"}),": The current temperature value."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"humidity: float"}),": The current humidity value."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"readTemperature(): float"}),": Reads and returns the current temperature."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"readHumidity(): float"}),": Reads and returns the current humidity level."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"waterpump",children:(0,r.jsx)(n.strong,{children:"WaterPump"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Description"}),": A hardware component class for controlling the water pump used in plant care."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Attributes"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"flowRate: int"}),": The water flow rate from the pump."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Methods"}),":","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"setFlowRate(rate: int)"}),": Sets the flow rate of the water pump."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.p,{children:"This backend documentation provides an overview of the system architecture, including database models, backend logic, hardware interaction, and AI integration. It can be extended or modified based on specific requirements as the project evolves."})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>d});var r=s(96540);const t={},i=r.createContext(t);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);