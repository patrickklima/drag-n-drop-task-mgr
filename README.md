# React-Redux Drag-n-Drop Task Manager
A drag-n-drop task manager built as single page web app. 
This React/Redux SPA receives data from an Express API backed by CRUD services performed by Mongoose on a Mongo database, all happily abiding in NodeJS.  

## Tech Stack
- MongoDB
- Mongoose
- Node
- Express
- React
- React-Router
- Redux 
- Redux-Thunk 

## Features
**Log in and Select a Board**  
<img src="https://raw.githubusercontent.com/patrickklima/react-redux-drag-n-drop-task-mgr/master/docs/GIFs/1-logging-in-and-selecting-a-board.gif" width="600" alt="Log in and Select a Board">  

**Editing Card Content**  
<img src="https://raw.githubusercontent.com/patrickklima/react-redux-drag-n-drop-task-mgr/master/docs/GIFs/2-changing-card-content.gif" width="600" alt="Editing Card Content">  

**Creating New Lists and Dragging Cards**  
<img src="https://raw.githubusercontent.com/patrickklima/react-redux-drag-n-drop-task-mgr/master/docs/GIFs/3-Creating-new-lists-and-cards-and-dragging.gif" width="600" alt="Creating New Lists and Dragging Cards">  

## Installation and Startup
1. `git clone [this repo]`
1. `npm install`
1. install mongodb if needed. 
1. `sudo service mongodb start`
1. in /server/data/seeds: `node index`
1. in /server: `node server`
1. open a new terminal window
1. from /client: `npm install`
1. `npm start`
1. open a browswer to `http://localhost:3000`

## Wireframes
<img src="https://raw.githubusercontent.com/patrickklima/project_djello/master/docs/wireframes/board_with_lists_and_cards.png" 
     width="450" alt="Active Board with Lists and Cards">  
**Active Board with Lists and Cards**  
_Create new boards, lists, and cards. Drag and drop cards to new lists, or drag lists to sort them._ 

<img src="https://raw.githubusercontent.com/patrickklima/project_djello/master/docs/wireframes/card_detail.png" 
     width="450" alt="Card Detail Modal">  
**Card Detail Modal**  
_View and edit the details of an individual card. Review the changes all users have made to this card._ 
