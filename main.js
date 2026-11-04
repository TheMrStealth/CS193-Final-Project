const p1 = document.getElementById("player1")
const p1Input = document.getElementById("p1Input")

async function getPlayerData() {
    var steamId = p1Input.value;
    const response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p1.textContent = "Error"
        return
    }

    var p1Text = await response.json()
    p1.textContent = JSON.stringify(p1Text.playerstats.stats[0].value);
}