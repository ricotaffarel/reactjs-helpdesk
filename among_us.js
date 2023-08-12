function identifyImpostor(queue) {
    const yourPosition = queue.length - 1; // Your position is at the end of the queue
    let impostorPosition = -1;

    for (let i = 0; i < queue.length; i++) {
        if (queue[i] === "impostor") { // Corrected "Impostor" to "impostor"
            impostorPosition = i;
            break;
        }
    }

    if (impostorPosition === -1) {
        return "No impostor found in the queue!";
    }

    if (impostorPosition === yourPosition - 1) {
        return "Go away, don't kill my friend!";
    } else {
        return `Hey, Player number ${impostorPosition + 1} and player number ${impostorPosition }, RUNN!!! That impostor will kill you!`;
    }
}

// Example usage
const queue = ["player 1", "player 2" , "impostor",  "player 3", "player 4", "player 5", "player 6", "you"];
const result = identifyImpostor(queue);
console.log(result);
