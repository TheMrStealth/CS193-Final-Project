const usr1 = document.getElementById("usr1");
const p1Input = document.getElementById("p1Input");
const p1Stat1 = document.getElementById("player1Stat1");
const p1Stat2 = document.getElementById("player1Stat2");
const p1Stat3 = document.getElementById("player1Stat3");
const p1Stat4 = document.getElementById("player1Stat4");
const p1Stat5 = document.getElementById("player1Stat5");
const p1Stat6 = document.getElementById("player1Stat6")
const p1Stat7 = document.getElementById("player1Stat7");
const p1Stat8 = document.getElementById("player1Stat8");
// const p1Stat9 = document.getElementById("player1Stat9");

const usr2 = document.getElementById("usr2");
const p2Input = document.getElementById("p2Input");
const p2Stat1 = document.getElementById("player2Stat1");
const p2Stat2 = document.getElementById("player2Stat2");
const p2Stat3 = document.getElementById("player2Stat3");
const p2Stat4 = document.getElementById("player2Stat4");
const p2Stat5 = document.getElementById("player2Stat5");
const p2Stat6 = document.getElementById("player2Stat6");
const p2Stat7 = document.getElementById("player2Stat7");
const p2Stat8 = document.getElementById("player2Stat8");
// const p2Stat9 = document.getElementById("player2Stat9");

function getStat(json, stat) {
    return json.playerstats.stats.find(s => s.name === stat).value;
}

function clearFields() {
    usr1.textContent = "User 1";
    p1Stat1.textContent = "";
    p1Stat2.textContent = "";
    p1Stat3.textContent = "";
    p1Stat4.textContent = "";
    p1Stat5.textContent = "";
    p1Stat6.textContent = "";
    p1Stat7.textContent = "";
    p1Stat8.textContent = "";

    usr2.textContent = "User 2";
    p2Stat1.textContent = "";
    p2Stat2.textContent = "";
    p2Stat3.textContent = "";
    p2Stat4.textContent = "";
    p2Stat5.textContent = "";
    p2Stat6.textContent = "";
    p2Stat7.textContent = "";
    p2Stat8.textContent = "";
}

async function getP1Data() {
    clearFields();

    var steamId = p1Input.value;
    var response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p1Stat1.textContent = "Error";
        return;
    }

    var usrJson = await fetch(`/.netlify/functions/getUsername?steamid=${steamId}`);
    var usrText = await usrJson.json();
    usr1.textContent = usrText.response.players[0].personaname;

    if (usrText.response.players[0].communityvisibilitystate != 3) {
        p1Stat1.textContent = "Private Profile";
        p1Stat2.textContent = "";
        p1Stat3.textContent = "";
        p1Stat4.textContent = "";
        p1Stat5.textContent = "";
        p1Stat6.textContent = "";
        p1Stat7.textContent = "";
        p1Stat8.textContent = "";
    } else {
        var p1Text = await response.json();
        p1Stat1.textContent = "Total Kills: " + getStat(p1Text, "total_kills");
        p1Stat2.textContent = "Total Deaths: " + getStat(p1Text, "total_deaths");
        p1Stat3.textContent = "Total Knife Kills: " + getStat(p1Text, "total_kills_knife");
        p1Stat4.textContent = "Avg. Win Rate: " + Math.round((getStat(p1Text, "total_matches_won") / getStat(p1Text, "total_matches_played")) * 100) + "%";
        p1Stat5.textContent = "Lifetime K/D: " + (getStat(p1Text, "total_kills") / getStat(p1Text, "total_deaths")).toFixed(2);
        p1Stat6.textContent = "Total $ Earned: $" + getStat(p1Text, "total_money_earned");
        p1Stat7.textContent = "Total Shots Fired: " + getStat(p1Text, "total_shots_fired");
        p1Stat8.textContent = "Lifetime Headshot %: " + Math.round((getStat(p1Text, "total_kills_headshot") / getStat(p1Text, "total_kills")) * 100) + "%";
    }
}

async function getP2Data() {
    clearFields();

    steamId = p2Input.value;
    response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);

    if (!response.ok) {
        p2Stat1.textContent = "Error";
        return;
    }

    usrJson = await fetch(`/.netlify/functions/getUsername?steamid=${steamId}`);
    usrText = await usrJson.json();
    usr2.textContent = usrText.response.players[0].personaname;

    if (usrText.response.players[0].communityvisibilitystate != 3) {
        p2Stat1.textContent = "Private Profile";
        p2Stat2.textContent = "";
        p2Stat3.textContent = "";
        p2Stat4.textContent = "";
        p2Stat5.textContent = "";
        p2Stat6.textContent = "";
        p2Stat7.textContent = "";
        p2Stat8.textContent = "";
    } else {
        var p2Text = await response.json()
        p2Stat1.textContent = "Total Kills: " + getStat(p2Text, "total_kills");
        p2Stat2.textContent = "Total Deaths: " + getStat(p2Text, "total_deaths");
        p2Stat3.textContent = "Total Knife Kills: " + getStat(p2Text, "total_kills_knife");
        p2Stat4.textContent = "Avg. Win Rate: " + Math.round((getStat(p2Text, "total_matches_won") / getStat(p2Text, "total_matches_played")) * 100) + "%";
        p2Stat5.textContent = "Lifetime K/D: " + (getStat(p2Text, "total_kills") / getStat(p2Text, "total_deaths")).toFixed(2);
        p2Stat6.textContent = "Total $ Earned: $" + getStat(p2Text, "total_money_earned");
        p2Stat7.textContent = "Total Shots Fired: " + getStat(p2Text, "total_shots_fired");
        p2Stat8.textContent = "Lifetime Headshot %: " + Math.round((getStat(p2Text, "total_kills_headshot") / getStat(p2Text, "total_kills")) * 100) + "%";
    }
}

async function getPlayerData() {
    getP1Data();
    getP2Data();
}