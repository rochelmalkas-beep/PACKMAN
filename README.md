# PACKMAN
Pac-Man Web Application (Vanilla JS)

A feature-rich, web-based Pac-Man game built from scratch using Vanilla JavaScript, HTML5, and CSS3. The application features user authentication, custom ghost pathfinding algorithms, session security, dynamic board rendering, and audio-visual feedback.

## 🚀 Key Features

* **Custom Ghost AI Algorithms:** Implements targeted chase behavior (`Blinky`) using Manhattan distance pathfinding logic alongside randomized movement patterns (`Pinky`, `Inky`, `Clyde`).
* **User Authentication & Session Security:** Complete user registration and login system managed via `localStorage`, integrated with session validation and route guarding (`security.js`).
* **Object-Oriented Design:** Modular JavaScript architecture utilizing ES6 classes (`Ghost`, `SoundData`) for clean state management and separation of concerns.
* **Full Game Mechanics:** Dynamic grid generation, real-time collision detection, directional sprite rotations, score tracking, life counter, sound effects, and interactive modal overlays.
* **Interactive Game Lobby:** Responsive selection lobby featuring video previews and player navigation controls.

## 🛠️ Tech Stack

* **HTML5:** Semantic layout and structured page components.
* **CSS3:** Custom animations, responsive layouts, grid styling, and modal designs.
* **Vanilla JavaScript (ES6+):** Core game engine, DOM manipulation, state management, and pathfinding algorithms.

---

## 📂 Project Structure

```text
├── Account.html             # Application entry point / Login & Registration
├── css/
│   ├── styleMain.css        # Global styling and headers
│   ├── stylePacman.css      # Game board layout and modals
│   └── styleGamesLobby.css  # Game selection lobby styles
├── html/
│   ├── gamesLobby.html      # Game selection lobby
│   ├── pacmanGame.html     # Main Pac-Man gameplay view
│   └── construction.html   # Placeholder for upcoming games
├── javaScript/
│   ├── Account.js           # Registration and authentication handler
│   ├── security.js          # Route protection and session checker
│   ├── pacman.js            # Main game loop, grid engine, and player controls
│   ├── ghostConstructer.js  # Ghost class definition & AI movement routines
│   ├── soundConstructer.js  # Audio asset manager
│   ├── soundManger.js       # Sound playback helper
│   └── gamesLobby.js        # Lobby user initialization
└── assets/                  # Media files, images, and audio assets

🎮 Getting Started
Prerequisites
No external build tools or package managers (npm/yarn) are required. The project runs natively in any modern web browser.

Local Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/pacman-web-app.git](https://github.com/your-username/pacman-web-app.git)
Launch the application:

Open Account.html directly in your web browser, or launch it using a local development server (such as VS Code's Live Server).

Start Playing:

<<<<<<< HEAD
Register a new player account or sign in to access the game lobby.
=======
Register a new player account or sign in to access the game lobby.
>>>>>>> b5918db9797174e7237ebb473d4a44b6f738748b
