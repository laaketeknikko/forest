## Installation

From the project root directory:

cd backend
npm install

cd frontend
npm install

## Usage

From project root:

cd backend
npm run dev

cd frontend
npm run dev

Project will by default run at localhost:5173.
Backend will by default run at localhost:3000.

Using the application does not require a database.
However, using the save functionality utilizes Mongoose
to save in MongoDB. Setting up MongoDB and Mongoose
is beyond the scope of this readme.
The necessary information should be obtainable from the backend code.

## Introduction

This project - project name "forest" - could be described as a proof-of-concept turn based tactical game.

## Shortcomings

The major shortcoming is that there is actually no game at all. The project
can at most be considered a very basic game engine.

## Used technologies

### Frontend

#### TypeScript

TypeScript is a static typing layer on top of JavaScript. Most of the
TypeScript features are compiled away when the code is run. TypeScript
can help find application errors at code-writing time.

The project makes basic use of TypeScript. TypeScript type inference makes
it easy to start out with; however, you will quickly run into esoteric
problems with third party libraries and generic functions. The
project doesn't shy away from turning TypeScript to JavaScript when going
gets tough.

#### React

React is the main user interface library. React follows a declarative,
component-based approach, where the user interface is driven by
state and the changes in the state.

In the project React drives the whole user interface, and the frontend
application as a whole follows the React model.

#### MUI

Old name Material UI is a library of ready-made React components for
common user interface patterns.

The project heavily utilizes MUI components for common interface
elements and layout management.

#### Three.js and React Three Fiber

Three.js is a 3D JavaScript library utilizing WebGL.

React Three Fiber is a React-style wrapper around Three.js

The main game scene is implemented in React Three Fiber. Direct Three.js code is at a minimum, but a big advantage of React Three Fiber is you can use
vanilla Three.js whenever you want in your components.

Also heavily utilized is a helper component library for R3F: @react-three/drei

#### Jotai

Jotai is an atom-based state management library. It can also be used without React.

In the project all global state is stored in Jotai

## Architecture

## Credits & thanks

