## Full Stack Open submissions details

The application is running at https://forest-9p5h.onrender.com/

NOTE!
The frontend and the backend are running as different services
on Render. The project uses the free Render service. Free Render services spin down after inactivity. It seems it might take even up to 5 minutes for the backend service to spin up after inactivity. For this reason I recommend visiting for example https://forest-backend.onrender.com/api/configs/characters before starting the application, and waiting until you get a response from the server.

[Work hours log](frontend/workhourslog.md)

## Installation and running

### Installation

From the project root directory:

cd shared
npm install
npm run tsc

cd backend
npm install

cd frontend
npm install

### Running

From project root:

cd backend
npm run dev

cd frontend
npm run dev

Frontend will by default run at localhost:5173.
Backend is expected to run at localhost:5432.

Using the application does not require a database.
However, using the save functionality utilizes Mongoose
to save in MongoDB. Setting up MongoDB and Mongoose
is beyond the scope of this readme.
The necessary information should be obtainable from the backend code.

For the backend to work properly you need to have an .env file with the following:

1. MONGODB_URL: Your MongoDB connection URL.
2. PORT: The port to be used.

## Introduction

This project - project name "forest" - could be described as a proof-of-concept turn based tactical game.

For a game, it really doesn't contain many features. As a programming project, it does demonstrate for example the following:

1. Saving and loading a game.
2. Navigating a main menu with scenario and party selection.
3. Basic game play functionality, such as movement.
4. Maintaining non-trivial application state.
5. Basics of 3D.

## Usage

### In-application

#### Main menu

When first launching the application, start a new game by clicking "new game". If you have a save key, you can load a game with the load button.

Next select a scenario on the "select scenario" tab.

After selecting a scenario, select characters on the "select characters" tab. Click on a character to see their abilities. Click again to add them to the party.

Once you have formed a party, move to the "confirm" tab, and click on "start scenario".

#### In-game

##### Turn order

The game is turn-based, and follows an initiative order: Each action adds time to the characters initiative, and the character with lowest initiative will be next in turn. The initiative is displayed on the left, top-down.

##### Cards and actions

To the right are the "cards" of the currently acting character. The cards contain a number of actions, one of which at a time is the "active" action you are able to execute. Once an action has been executed, the next action on the card will be the active action and so on. The active action is highlighted.

The active action is expanded on the card and contains a description of the effects available on the action. Other actions can be expanded by clicking on them.

You select an action to be executed by clicking on the card's title.

In the action description, each instruction before "then" indicates a separate effect you must perform. You must perform all the effects; it is not possible to skip one.

##### The map

Once you select a card, a circle will appear around the character, indicating the range of the effect.

The map has a grid.

Movement in the game is not restricted to the grid; the character moves to the point you click on. Attacks also are freely targeted, but will affect all the characters and enemies on the clicked tile. (There are no AoE effects for now.)

The map can be panned by holding left mouse and moving the mouse.

The map can be rotated by holding right mouse and moving the mouse.

##### In-game menu, saving and loading

Above the turn order view is the menu button. From the menu you can save the game or turn off some graphical features.

When you start a game, the application will assign a save key, which will be displayed on the URL bar. You can use this save key to load a game later. (Though, at the moment, it is wholly unnecessary.)

## Shortcomings

The major shortcoming is that there is actually no game at all. The project
can at most be considered a very basic game engine.

However, even making such a thing, let alone an actual game with content, is a very time-consuming task.

The test coverage is lacking. Using players as beta-testers is the gaming industry standard nowadays, though.

## Used technologies

### Frontend

#### TypeScript

TypeScript is a static typing layer on top of JavaScript. Most of the
TypeScript features are compiled away when the code is run. TypeScript
can help find application errors at code-writing time.

The project makes basic use of TypeScript. TypeScript type inference makes it easy to start out with; however, you will quickly run into esoteric problems with third party libraries and generic functions. The
project doesn't shy away from turning TypeScript to JavaScript when going gets tough.

#### React

React is the main user interface library. React follows a declarative,
component-based approach, where the user interface is driven by
state and the changes in the state.

In the project React drives the whole user interface, and the frontend
application as a whole follows the React model.

#### MUI

(Old name Material UI) is a library of ready-made React components for
common user interface patterns.

The project heavily utilizes MUI components for common interface
elements and layout management.

#### Three.js and React Three Fiber

Three.js is a 3D JavaScript library utilizing WebGL.

React Three Fiber is a React-style wrapper around Three.js

The main game scene is implemented in React Three Fiber. Direct Three.js code is at a minimum, but a big advantage of React Three Fiber is you can use vanilla Three.js whenever you want in your components.

Also heavily utilized is a helper component library for R3F: @react-three/drei

#### Jotai

Jotai is an atom-based state management library. It is designed for React, but can also be used without.

In the project all global state is stored in Jotai. Jotai basically works as a React Context replacement for the project. I found working with Jotai easier than with the Context.

#### Cypress

Cypress is a frontend testing library. The idea of Cypress is it runs in the browser and uses the application in the same manner an actual user would.

The project only contains one end-to-end test implemented with Cypress. Even with one test of a few dozen lines, we can test starting new game, starting scenario, saving game and loading game.

### Backend

#### Node

Node is a popular JavaScript runtime environment.

The backend is run in a Node environment.

#### MongoDB / Mongoose

MongoDB is a document database, and Mongoose is JavaScript library
wrapper around MongoDB. Mongoose aims to make working with MongoDB simpler.

In the project MongoDB is used to store the save data.

## Project organization

### Backend

The backend should be relatively simple to figure out. The only things going on are fetching some configurations and accessing database in a simple manner.

### Frontend

The main component is src/App.tsx.

There are three main states the application can be in:

1. Main menu. For this the application uses components/MainMenu/MainMenu.tsx
2. In-game. components/GameScene/GameScene.tsx and components/r3f/R3FCanvasWrapper.tsx are responsible for this.
3. After-game. components/Debriefing/Debriefing.tsx handles this.

Under components, the components are organized loosely by responsibility. Notably, components/r3f contains all the components that must be placed inside the R3F Canvas.

The src/game folder contains code that mainly has to do with the logic of the internal game state itself.

The src/services folder contains server access code.

### The shared

In order to avoid duplicating TypeScript types in both frontend and backend, the project uses a TypeScript feature called "project references".

These shared types are located in \[root\]/shared.

The shared project also utilizes the Zod validation library to create schemas for the different configuration types. A nice feature of Zod is that it is possible to derive a TypeScript type from the defined schemas automatically, cutting down on the duplication work.

## Credits & thanks

The Fullstack Open course and discord.

The maintainers of all the used technologies. Some have been mentioned in this readme, but there are of course numerous others.

Some tutorials and Youtube channels, especially on three.js and React Three Fiber.

For my friend for the graphics.

## Aspirations

To be honest, I expected to achieve a bit more than this in 175 hours. Ultimately, all kinds of small things take significant development time.

My idea was a sort of board game modeling in a browser game format. Board games often have more interesting ability usage mechanics than computer games do. I wanted to explore this kind of a card mechanic, where a card has multiple actions that have to be executed in sequence, and the sequence is not reset between missions.

The basics of that idea are in the project, but obviously the lack of action types and different mechanics prevent any kind of real exploration of the idea.

