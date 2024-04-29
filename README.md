# Welcome to Mastermind 🧠
<img width="1440" alt="Screen Shot 2024-04-29 at 2 46 11 PM" src="https://github.com/michelleeli/Mastermind/assets/130802181/3a02b6b2-f00d-457d-bf34-21ef80166677">

## Introduction
Mastermind is a fullstack web application of the popular board game where players guess a secret code. A code string is generated dependent on the difficulty level chosen. Each guess provides feedback as to the number of correct digits and locations. Players will have 10 guesses to crack the code, with an optional hint. 

  - Languages: JavaScript, Ruby, HTML, CSS
  - Frontend and State Management: React
  - Database: PostgreSQL
## How to run locally
### Backend
1. **Clone Repository:** Clone the project on your local machine
2. **Install Dependencies:** Navigate to root directory of project and install Ruby dependencies by running **`bundle install`**
3. **Ensure database setup:** Make sure database is created and run any pending migrations with commands **`rails db:create`** and then  **`rails db:migrate`**
4. **Start Rails server:** Run **`rails s`** to start the backend server which will run on **localhost:5000**
5. 
### Frontend
5. **Install Node.js**: Ensure you have Node.js installed on your machine. (See below for instructions to install Node.js)
6. **Navigate to the Frontend Directory:** Run command **`cd frontend)`** 
7. **Install Dependencies:** Install frontend dependencies using npm: **`npm install`** 
8. **Start the Development Server:** Start the React development server: **`npm start`**. By default, it will run on localhost:3000 and proxy API requests to localhost:5000 (the Rails server).
9. **Verify Frontend Setup:** Access localhost:3000 in your browser to ensure the React frontend is running correctly. You should see the application's UI.

#### Node.JS
- To install Node, you can install it using a package manager or by downloading the installer from the Node.js website. <a>https://nodejs.org/en/download</a>
- If you would prefer to use a package manager, navigate to <a>https://nodejs.org/en/download/package-manager</a> and select your system for further instructions

## Backend Setup
### Database Schema
Database has `games` table and `guesses` table where a `game` has many `guesses` and a foreign key in `guesses` table referencing the `game_id` 
```
create_table "games", force: :cascade do |t|
    t.integer "remaining_attempts", default: 10, null: false
    t.string "code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "hint"
    t.integer "mode"
  end

  create_table "guesses", force: :cascade do |t|
    t.string "attempt", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "correct_location"
    t.integer "correct_numbers"
    t.index ["game_id"], name: "index_guesses_on_game_id"
  end
```
### Games 
**Model** 
- Fetches external API to generate and set secret code as `game.code`
- Contains functions to `set_hint`, `set_remaining_attempts`, and `set_mode` as well as check if user has lost with`game_over?` or user has won with `win_game?`
  
**Controller**
- Provides functions to handle routes using REST API `:create` and `:show`
- Renders JSON for frontend fetches
  
### Guesses
**Model**
- Includes function to validate guess and set `guess.correct_location` and `guess.correct_numbers`
  
**Controller**
- Provides functions to handle routes using REST API `:create` and `:index`
- Renders JSON for frontend fetches

### Endpoints
HTTP Verb | URI Pattern | Controller#Action | 
--- | --- | --- |
POST | /games |games#create |
GET | /games/:id |games#show |
GET | /guesses |guesses#index |
POST | /guesses |guesses#create|

## Game Play
### Home Page
- User selects difficulty mode which will determine the length of the code.
- When the mode is clicked, it will make a `POST` request to the backend `/games` to create a game with the features of the mode selected (Easy: 4 digit code, Medium: 5 digit code, Hard: 6 digit code)
  
### Submit Guesses
- The page is rendered by making a `GET` request to the backend `/games/:id`
- Frontend form allows users to guess combinations and submit form
- Upon submitting form, it will make a `POST` request to backend `/guesses` to create a new guess with foreign key associated with the current `game_id`
- While on this page, whenever there is a new guess attempt made, it will fetch all the guesses by making a `GET` request to backend `/guesses` to render on a table so the user can see previous attempts and feedback for each
<img width="1440" alt="Screen Shot 2024-04-29 at 2 47 04 PM" src="https://github.com/michelleeli/Mastermind/assets/130802181/d329fd61-dafa-4193-a034-395a5ac522cf">

### Lose Game
- Every time the player makes a guess attempt, the backend runs `game_over?` on the current game instance and renders the result as JSON to the frontend.
- If the player is not able to guess the code by 10 guesses, a modal will pop up revealing the code to the player and providing the option to play again
<img width="1440" alt="Screen Shot 2024-04-29 at 2 47 16 PM" src="https://github.com/michelleeli/Mastermind/assets/130802181/b406dfa4-e401-416b-8202-c264a9317dd7">

### Win Game
- Every time the player makes a guess attempt, the backend runs `game_over?` on the current game instance and renders the result as JSON to the frontend.
- If the player is able to guess the code by 10 guesses, a modal will pop up notifying the player they have won and providing the option to play again
<img width="1440" alt="Screen Shot 2024-04-29 at 2 49 05 PM" src="https://github.com/michelleeli/Mastermind/assets/130802181/ce528eac-478f-4fbc-9b09-c9dd017da854">

## Project Planning
1. **Create database migrations:** Plan database schema and how to create relationships between tables
2. **Create models:** Write necessary functions for game logic
   - `Game` model handles Game logic (create a game code by fetching API and if game is won or lost)
   - `Guess` model handles Guess validation (how many locations and numbers are correct)
3. **Create controllers:**
   - `Games` controller handles routes to create and show `game`
   - `Guesses` controller handles routes to create and show `guesses`
4. **Add Bonus Features**
  - Add column to `Games` table: `hint`
  - Add column to `Games` table: `mode`
5. **Frontend:** Integrate frontend to fetch backend APIs, rendering the proper data to be rendered to the player


