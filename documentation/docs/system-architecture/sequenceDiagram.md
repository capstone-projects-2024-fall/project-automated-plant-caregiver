---
sidebar_position: 4
---

# Sequence Diagrams
## Use Case 1
### A user wants to keep plants watered while away on vacation

```mermaid
sequenceDiagram
actor User
participant App
participant Login
participant HomePage
User->>App: User Opens Plant Parent Application
activate App
User ->>Login: User enters Login credentials
activate Login
Login -->>User: credentials accepted user login in
deactivate Login
User->>HomePage: User selects a plant
activate HomePage
HomePage ->> Plant: renders plantcare page
activate Plant
User ->> Plant: the plant widget displays a list of choices to the user
note over Plant: Options users can select include (watering, adjust lighting, set to vacation mode)
Plant -->> User: interactiveChoice()
User ->> Plant: User selects watering
Plant ->> Pot: requests moisture level from Pot
activate Pot
Pot-->> Plant: returns level of moisture
Plant ->> Agiai: soil levels are compared to data from agiai
activate Agiai
Agiai -->> Plant: return(bounds of moisture soil should be on for that plant)
deactivate Agiai
Plant  -->> Pot: sets schedule for how long the plant is watered for
Pot -->> App: returns(watering complete)
App -->> User: notificationn that the plant has been watered
deactivate Pot
deactivate Plant
deactivate HomePage
deactivate App

```
  1. Upon opening the application, the user is sent to the login in screen
  2. After the user login in they are directed to the home page
  3. From the home page user selects a plant that has already been added to their collection
  4. User is taken into the plant care widget, from there they are able to select from a few options
  5. User chooses to put the plant on a watering cycle
  6. The application grabs data provided by the AGIai api on how much the plant should be watered bases on soil readings
  7. Application sets a watering schedule and sends that to the watering device
  8. after watering is complete user receives a notification
## Use Case 2
### A user has plants that need to be kept under light for a certain amount of time
```mermaid
sequenceDiagram
actor User
participant App
participant HomePage
participant Plant widget
participant Agiai api
User ->> App: User opens the Plant Parent application
User ->> HomePage: User selects a plant
HomePage ->> Plant widget: plant menu is rendered
User ->> Plant widget: User selects automatic light control
Plant widget ->> Agiai api: the amount of time that the plant should be under a light is called from agiai
Agiai api -->> Plant widget: returns(time, light senstivity)
Plant widget ->> Pot: sets the Light on a timer based on time given and adjusts lights volume to match
Pot -->> App: sends a response when the lighting is done
```
  1. User opens application, and is taken to home page
  2. User selects plant from their collection
  3. User selects lighting from the plant care widget
  4. Data for how long the plant should be under light is pulled from agiai
  5. The app sets a schedule to turn on and off the lights
  6. App sends a message to the light controller in the pot to turn on and off as needed
  7. Notification is sent to user when the lighting cycle is complete
