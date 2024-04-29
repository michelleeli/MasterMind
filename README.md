# Welcome to Mastermind 🧠
## Introduction
Mastermind is a fullstack web application of the popular board game where players guess the secret code. A code string is generated dependent on the difficulty level chosen. Each guess provides feedback as to the number of correct digits and locations. Players will have 10 guesses to crack the code, with an optional hint. 
  Languages: JavaScript, Ruby, HTML, CSS
  Frontend and State Management: React
  Database: PostgreSQL
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




