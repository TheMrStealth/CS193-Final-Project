const usr1 = document.getElementById("usr1");
const p1Input = document.getElementById("p1Input");
const p1Stat1 = document.getElementById("player1Stat1");
const p1Stat2 = document.getElementById("player1Stat2");
const p1Stat3 = document.getElementById("player1Stat3");
const p1Stat4 = document.getElementById("player1Stat4");
const p1Stat5 = document.getElementById("player1Stat5");
const p1Stat6 = document.getElementById("player1Stat6");

const usr2 = document.getElementById("usr2");
const p2Input = document.getElementById("p2Input");
const p2Stat1 = document.getElementById("player2Stat1");
const p2Stat2 = document.getElementById("player2Stat2");

function getStat(json, stat) {
    return json.playerstats.stats.find(s => s.name === stat).value;
}

function clearFields() {
    p1Stat1.textContent = "";
    p1Stat2.textContent = "";
    p1Stat3.textContent = "";
    p1Stat4.textContent = "";

    p2Stat1.textContent = "";
}

async function getPlayerData() {
    clearFields();

    var steamId = p1Input.value;
    var response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p1Stat1.textContent = "Error";
        return;
    }

    var usrJson = await fetch(`./netlify/functions/getUsername?steamid=${steamId}`);
    var usr1Text = await usrJson.json();
    usr1.textContent = usr1Text.response.players[0].personaname;

    var p1Text = await response.json();
    p1Stat1.textContent = "Total Kills: " + getStat(p1Text, "total_kills");
    p1Stat2.textContent = "Total Deaths: " + getStat(p1Text, "total_deaths");
    p1Stat3.textContent = "Total Knife Kills: " + getStat(p1Text, "total_kills_knife");
    p1Stat4.textContent = "Avg. Win Rate: " + Math.round((getStat(p1Text, "total_matches_won") / getStat(p1Text, "total_matches_played")) * 100) + "%";



    steamId = p2Input.value;
    response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p2Stat1.textContent = "Error";
        return;
    }

    var p2Text = await response.json()
    p2Stat1.textContent = "Total Kills: " + getStat(p2Text, "total_kills");
}