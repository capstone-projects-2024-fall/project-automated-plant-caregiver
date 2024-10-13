"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[702],{25452:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var n=i(74848),s=i(28453);const r={sidebar_position:5},a="Components Description",o={id:"system-architecture/componentsDescription",title:"Components Description",description:"ESP32",source:"@site/docs/system-architecture/componentsDescription.md",sourceDirName:"system-architecture",slug:"/system-architecture/componentsDescription",permalink:"/project-automated-plant-caregiver/docs/system-architecture/componentsDescription",draft:!1,unlisted:!1,editUrl:"https://github.com/capstone-projects-2024-fall/project-automated-plant-caregiver/edit/main/documentation/docs/system-architecture/componentsDescription.md",tags:[],version:"current",lastUpdatedBy:"SeaRisk",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docsSidebar",previous:{title:"Sequence Diagrams",permalink:"/project-automated-plant-caregiver/docs/system-architecture/sequenceDiagram"},next:{title:"API Specification",permalink:"/project-automated-plant-caregiver/docs/category/api-specification"}},c={},l=[{value:"ESP32",id:"esp32",level:2},{value:"Adafruit STEMMA Soil Sensor - I2C Capacitive Moisture Sensor",id:"adafruit-stemma-soil-sensor---i2c-capacitive-moisture-sensor",level:2},{value:"BH1750 Light Sensor",id:"bh1750-light-sensor",level:2},{value:"AM2320 Digital Temperature and Humidity Sensor",id:"am2320-digital-temperature-and-humidity-sensor",level:2},{value:"Submersible 3V DC Water Pump - 1 Meter Vertical Type",id:"submersible-3v-dc-water-pump---1-meter-vertical-type",level:2},{value:"Smart LED StripLight",id:"smart-led-striplight",level:2},{value:"AWS Amplify Instance",id:"aws-amplify-instance",level:2},{value:"Typescript",id:"typescript",level:2},{value:"Python",id:"python",level:2},{value:"Figma",id:"figma",level:2},{value:"Plant.id API",id:"plantid-api",level:2}];function p(e){const t={h1:"h1",h2:"h2",p:"p",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"components-description",children:"Components Description"}),"\n",(0,n.jsx)(t.h2,{id:"esp32",children:"ESP32"}),"\n",(0,n.jsx)(t.p,{children:"The ESP32 is a low-cost, power-efficient microcontroller with built-in Wi-Fi and Bluetooth, making it ideal for IoT applications. It provides versatile connectivity and computing power for managing sensors and controlling devices."}),"\n",(0,n.jsx)(t.h2,{id:"adafruit-stemma-soil-sensor---i2c-capacitive-moisture-sensor",children:"Adafruit STEMMA Soil Sensor - I2C Capacitive Moisture Sensor"}),"\n",(0,n.jsx)(t.p,{children:"This sensor measures the moisture level of soil using capacitive technology. It communicates via the I2C interface, providing accurate soil moisture data without corrosion over time, making it perfect for long-term plant care."}),"\n",(0,n.jsx)(t.h2,{id:"bh1750-light-sensor",children:"BH1750 Light Sensor"}),"\n",(0,n.jsx)(t.p,{children:"The BH1750 is a digital light sensor that measures ambient light intensity. With I2C communication, it provides precise lux readings and is commonly used in projects where light sensitivity or control is necessary."}),"\n",(0,n.jsx)(t.h2,{id:"am2320-digital-temperature-and-humidity-sensor",children:"AM2320 Digital Temperature and Humidity Sensor"}),"\n",(0,n.jsx)(t.p,{children:"The AM2320 is a sensor that measures temperature and humidity. It uses a simple I2C interface to deliver reliable environmental data, making it useful for climate monitoring in plant care systems."}),"\n",(0,n.jsx)(t.h2,{id:"submersible-3v-dc-water-pump---1-meter-vertical-type",children:"Submersible 3V DC Water Pump - 1 Meter Vertical Type"}),"\n",(0,n.jsx)(t.p,{children:"This small, submersible pump is powered by 3V DC and can push water up to 1 meter in height. It's ideal for automated irrigation systems, delivering water to plants with low power consumption."}),"\n",(0,n.jsx)(t.h2,{id:"smart-led-striplight",children:"Smart LED StripLight"}),"\n",(0,n.jsx)(t.p,{children:"A flexible, programmable LED strip that can be controlled via Wi-Fi or Bluetooth, often using platforms like ESP32. It allows for customizable lighting effects, which can be used for aesthetic plant care or light therapy for certain plants."}),"\n",(0,n.jsx)(t.h2,{id:"aws-amplify-instance",children:"AWS Amplify Instance"}),"\n",(0,n.jsx)(t.p,{children:"AWS Amplify is a cloud service platform that helps developers build scalable and secure applications. In this project, Amplify manages backend services like user authentication and data storage, integrating seamlessly with front-end technologies."}),"\n",(0,n.jsx)(t.h2,{id:"typescript",children:"Typescript"}),"\n",(0,n.jsx)(t.p,{children:"Typescript is a strongly typed superset of JavaScript. It improves code quality by introducing static typing, making the front-end of your application more maintainable and reducing runtime errors."}),"\n",(0,n.jsx)(t.h2,{id:"python",children:"Python"}),"\n",(0,n.jsx)(t.p,{children:"Python is a versatile, high-level programming language used in this project for backend development and control logic, integrating with IoT components to manage automated plant care tasks."}),"\n",(0,n.jsx)(t.h2,{id:"figma",children:"Figma"}),"\n",(0,n.jsx)(t.p,{children:"Figma is a collaborative interface design tool used for designing and prototyping user interfaces. In this project, it\u2019s utilized to create a responsive and visually appealing UI for the plant caregiving application."}),"\n",(0,n.jsx)(t.h2,{id:"plantid-api",children:"Plant.id API"}),"\n",(0,n.jsx)(t.p,{children:"The Plant.id API is an image recognition service that identifies plants based on images. It\u2019s integrated into the application to help users recognize and classify plants for more personalized care instructions."})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>o});var n=i(96540);const s={},r=n.createContext(s);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);