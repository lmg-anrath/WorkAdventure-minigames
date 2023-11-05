let currentScore = 0;
let gameStarted = false;
let currentLevel = 0;

const GAME_MESSAGES = [
    "Hey! schön, dass du hier bist!\nDeine erste Aufgabe besteht daraus dir selbst eine Nachricht zu schreiben. Dies kannst du mit dem Befehl 'echo' tun Schreibe hinter diesen Befehl einfach etwas und du wirst sehen was passiert!",
    "Das hast du toll gemacht, jetzt musst du einen weg finden, hier alles aufzuräumen. 3, 2, 1... GO!!",
    "Sach mal, das ist ja klasse was du alles kannst! Bist du bereit für eine etwas kompliziertere Aufgabe? Los Geht's!\n"
]

export function startGame() {
    setGameState(true)
}

export function gameMessage() {
    return GAME_MESSAGES[getCurrentLevel()]
}

export function quitGame() {
    setGameState(false)
    currentLevel = 0;
    currentScore = 0;
} 

export function isGameStarted() {
    return gameStarted;
}

export function setGameState(state: boolean) {
    gameStarted = state;
} 

export function levelUp() {
    currentLevel += 1
}

export function getCurrentLevel() {
    return currentLevel
}