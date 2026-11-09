const p1Input = document.getElementById("p1Input");
const p1Stat1 = document.getElementById("player1Stat1");

const p2Input = document.getElementById("p2Input");
const p2Stat1 = document.getElementById("player2Stat1");

async function getPlayerData() {
    var steamId = p1Input.value;
    var response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p1Stat1.textContent = "Error";
        return;
    }

    var p1Text = await response.json()
    p1Stat1.textContent = "Total Kills: " + JSON.stringify(p1Text.playerstats.stats[0].value);



    steamId = p2Input.value;
    response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p2Stat1.textContent = "Error";
        return;
    }

    var p2Text = await response.json()
    p2Stat1.textContent = "Total Kills: " + JSON.stringify(p2Text.playerstats.stats[0].value);
}