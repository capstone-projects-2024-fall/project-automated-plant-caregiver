"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[3374],{22496:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=n(74848),i=n(28453);const s={sidebar_position:1},o="System Overview",a={id:"requirements/system-overview",title:"System Overview",description:"Keywords",source:"@site/docs/requirements/system-overview.md",sourceDirName:"requirements",slug:"/requirements/system-overview",permalink:"/project-automated-plant-caregiver/docs/requirements/system-overview",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/requirements/system-overview.md",tags:[],version:"current",lastUpdatedBy:"SeaRisk",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Requirements Specification",permalink:"/project-automated-plant-caregiver/docs/category/requirements-specification"},next:{title:"System Block Diagram",permalink:"/project-automated-plant-caregiver/docs/requirements/system-block-diagram"}},l={},c=[{value:"Keywords",id:"keywords",level:2},{value:"Project Abstract",id:"project-abstract",level:2},{value:"High-Level Requirement",id:"high-level-requirement",level:2},{value:"Conceptual Design",id:"conceptual-design",level:2},{value:"Background",id:"background",level:2},{value:"Required Resources",id:"required-resources",level:2},{value:"Hardware Resources:",id:"hardware-resources",level:3},{value:"Software Resources:",id:"software-resources",level:3}];function d(e){const t={h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"system-overview",children:"System Overview"}),"\n",(0,r.jsx)(t.h2,{id:"keywords",children:"Keywords"}),"\n",(0,r.jsx)(t.p,{children:"Section 02, Python, IoT, Smart Home, Automation, Home Gardening, Sensors, Embedded Systems, Cloud Integration, Machine Learning"}),"\n",(0,r.jsx)(t.h2,{id:"project-abstract",children:"Project Abstract"}),"\n",(0,r.jsx)(t.p,{children:"This document proposes an application for automating the care of home plants using the Internet of Things. The system will monitor soil moisture, light levels, and temperature using sensors connected to a microcontroller. Data will be processed and analyzed to optimize plant care, with automatic watering, lighting adjustments, and climate control. The user can control and monitor the system remotely via a mobile app or web interface, with real-time alerts and recommendations provided through push notifications."}),"\n",(0,r.jsx)(t.p,{children:"The app will also feature an AI chat box where the user will have access to a few features. They will be able to submit a picture to the AI and the chat will connect to an API of either chat gpt or a similar plant search API by sending a query, and help decipher what plant type that is based off the picture. If the picture is a little ambiguous the chat will list a few potential types that it can be. If a user does not have a picture to upload the user can describe the plant to the AI chat box by listing its traits, and the AI can deliver with potential types based on the description given."}),"\n",(0,r.jsx)(t.p,{children:"In addition, the AI chat box can help answer the users questions regarding plant care, health, etc. by the same process. It will deliver personalized plant care assistance to the user directly based on the information given. It can handle support in the following:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:"Watering Needs: The AI will provide personalized watering advice based on the species of the plant and its current environment taken from the sensors that we will attach and incorporate"}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:"Light Requirements: Based on the plant type the chat box can offer guidance on the best lighting conditions, whether it needs direct sunlight, shade, a mix of both or whatever needed"}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:"Soil/Moisture Suggestions: The chat can also recommend appropriate soil/moisture  types for the plant\u2019s needs so it can optimize the growing and health, etc."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"high-level-requirement",children:"High-Level Requirement"}),"\n",(0,r.jsx)(t.p,{children:"The product will automate plant care by monitoring environmental conditions and adjusting watering, lighting, and temperature control as needed. Users will interact with the system through a mobile app, receiving real-time updates and recommendations based on data analysis. The system will also have a manual override feature to allow users to control the environment directly."}),"\n",(0,r.jsx)(t.h2,{id:"conceptual-design",children:"Conceptual Design"}),"\n",(0,r.jsx)(t.p,{children:"The system will consist of an embedded microcontroller connected to various sensors. The microcontroller will process the sensor data and control actuators (such as water pumps and lights). The programming language used will be Python. The mobile app will be developed using a framework like Flutter or React Native, and the backend will be hosted on a cloud platform such as AWS or Google Cloud."}),"\n",(0,r.jsx)(t.h2,{id:"background",children:"Background"}),"\n",(0,r.jsx)(t.p,{children:"This project will compare existing open-source projects, like the OpenAg initiative. The system proposed improves upon existing solutions, particularly in real-time monitoring, machine learning integration for predictive care, and ease of use for non-technical users."}),"\n",(0,r.jsx)(t.h2,{id:"required-resources",children:"Required Resources"}),"\n",(0,r.jsx)(t.h3,{id:"hardware-resources",children:"Hardware Resources:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Microcontroller (Raspberry Pi)"}),"\n",(0,r.jsx)(t.li,{children:"Sensors (moisture, light, temperature)"}),"\n",(0,r.jsx)(t.li,{children:"Actuators (water pump, lights)"}),"\n",(0,r.jsx)(t.li,{children:"Wi-Fi module."}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"software-resources",children:"Software Resources:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Python"}),"\n",(0,r.jsx)(t.li,{children:"IoT libraries"}),"\n",(0,r.jsx)(t.li,{children:"Cloud services (AWS)"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var r=n(96540);const i={},s=r.createContext(i);function o(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);