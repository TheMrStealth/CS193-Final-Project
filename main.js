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
const p1Stat9 = document.getElementById("player1Stat9");
const p1Stat10 = document.getElementById("player1Stat10");

const p1Stat1V = document.getElementById("player1Stat1Value");
const p1Stat2V = document.getElementById("player1Stat2Value");
const p1Stat3V = document.getElementById("player1Stat3Value");
const p1Stat4V = document.getElementById("player1Stat4Value");
const p1Stat5V = document.getElementById("player1Stat5Value");
const p1Stat6V = document.getElementById("player1Stat6Value")
const p1Stat7V = document.getElementById("player1Stat7Value");
const p1Stat8V = document.getElementById("player1Stat8Value");
const p1Stat9V = document.getElementById("player1Stat9Value");
const p1Stat10V = document.getElementById("player1Stat10Value");

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
const p2Stat9 = document.getElementById("player2Stat9");
const p2Stat10 = document.getElementById("player2Stat10");

const p2Stat1V = document.getElementById("player2Stat1Value");
const p2Stat2V = document.getElementById("player2Stat2Value");
const p2Stat3V = document.getElementById("player2Stat3Value");
const p2Stat4V = document.getElementById("player2Stat4Value");
const p2Stat5V = document.getElementById("player2Stat5Value");
const p2Stat6V = document.getElementById("player2Stat6Value")
const p2Stat7V = document.getElementById("player2Stat7Value");
const p2Stat8V = document.getElementById("player2Stat8Value");
const p2Stat9V = document.getElementById("player2Stat9Value");
const p2Stat10V = document.getElementById("player2Stat10Value");

function getStat(json, stat) {
    try {
        return json.playerstats.stats.find(s => s.name === stat).value;
    } catch (err) {
        return "NaN";
    }
}

function clearFields() {
    p1Stat1.style.visibility = "hidden"
    p1Stat2.style.visibility = "hidden"
    p1Stat3.style.visibility = "hidden"
    p1Stat4.style.visibility = "hidden"
    p1Stat5.style.visibility = "hidden"
    p1Stat6.style.visibility = "hidden"
    p1Stat7.style.visibility = "hidden"
    p1Stat8.style.visibility = "hidden"
    p1Stat9.style.visibility = "hidden"
    p1Stat10.style.visibility = "hidden"

    p2Stat1.style.visibility = "hidden"
    p2Stat2.style.visibility = "hidden"
    p2Stat3.style.visibility = "hidden"
    p2Stat4.style.visibility = "hidden"
    p2Stat5.style.visibility = "hidden"
    p2Stat6.style.visibility = "hidden"
    p2Stat7.style.visibility = "hidden"
    p2Stat8.style.visibility = "hidden"
    p2Stat9.style.visibility = "hidden"
    p2Stat10.style.visibility = "hidden"

    usr1.textContent = "User 1";
    p1Stat1V.textContent = "";
    p1Stat2V.textContent = "";
    p1Stat3V.textContent = "";
    p1Stat4V.textContent = "";
    p1Stat5V.textContent = "";
    p1Stat6V.textContent = "";
    p1Stat7V.textContent = "";
    p1Stat8V.textContent = "";
    p1Stat9V.textContent = "";
    p1Stat10V.textContent = "";

    usr2.textContent = "User 2";
    p2Stat1V.textContent = "";
    p2Stat2V.textContent = "";
    p2Stat3V.textContent = "";
    p2Stat4V.textContent = "";
    p2Stat5V.textContent = "";
    p2Stat6V.textContent = "";
    p2Stat7V.textContent = "";
    p2Stat8V.textContent = "";
    p2Stat9V.textContent = "";
    p2Stat10V.textContent = "";
}

async function getP1Data() {
    clearFields();

    var steamId = p1Input.value;
    var response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);
    var leetifyResponse = await fetch (`/.netlify/functions/getLeetify?steamid=${steamId}`);

    if (!response.ok) {
        p1Stat1.textContent = "Error";
        return;
    }

    var usrJson = await fetch(`/.netlify/functions/getUsername?steamid=${steamId}`);
    var usrText = await usrJson.json();

    try {
        usr1.textContent = usrText.response.players[0].personaname;
    } catch (err) {
        usr1.textContent = "Invalid Profile"
        return
    }

    if (usrText.response.players[0].communityvisibilitystate != 3) {
        p1Stat1V.textContent = "Private Profile";
        p1Stat2V.textContent = "";
        p1Stat3V.textContent = "";
        p1Stat4V.textContent = "";
        p1Stat5V.textContent = "";
        p1Stat6V.textContent = "";
        p1Stat7V.textContent = "";
        p1Stat8V.textContent = "";
        p1Stat9V.textContent = "";
        p1Stat10V.textContent = "";
    } else {
        var p1Text = await response.json();
        var leetify = await leetifyResponse.json();
        p1Stat1V.textContent = getStat(p1Text, "total_kills");
        p1Stat2V.textContent = getStat(p1Text, "total_deaths");
        p1Stat3V.textContent = getStat(p1Text, "total_kills_knife");
        p1Stat4V.textContent = Math.round((getStat(p1Text, "total_matches_won") / getStat(p1Text, "total_matches_played")) * 100) + "%";
        p1Stat5V.textContent = (getStat(p1Text, "total_kills") / getStat(p1Text, "total_deaths")).toFixed(2);
        p1Stat6V.textContent = "$" + getStat(p1Text, "total_money_earned");
        p1Stat7V.textContent = getStat(p1Text, "total_shots_fired");
        p1Stat8V.textContent = Math.round((getStat(p1Text, "total_kills_headshot") / getStat(p1Text, "total_kills")) * 100) + "%";
        p1Stat9V.textContent = leetify.ranks.premier;
        p1Stat10V.textContent = leetify.ranks.faceit + " (" + leetify.ranks.faceit_elo + ")";
    }

    p1Stat1.style.visibility = "visible"
    p1Stat2.style.visibility = "visible"
    p1Stat3.style.visibility = "visible"
    p1Stat4.style.visibility = "visible"
    p1Stat5.style.visibility = "visible"
    p1Stat6.style.visibility = "visible"
    p1Stat7.style.visibility = "visible"
    p1Stat8.style.visibility = "visible"
    p1Stat9.style.visibility = "visible"
    p1Stat10.style.visibility = "visible"
}

async function getP2Data() {
    clearFields();

    steamId = p2Input.value;
    response = await fetch (`/.netlify/functions/getSteam?steamid=${steamId}`);
    var leetifyResponse = await fetch (`/.netlify/functions/getLeetify?steamid=${steamId}`);

    if (!response.ok) {
        p2Stat1.textContent = "Error";
        return;
    }

    usrJson = await fetch(`/.netlify/functions/getUsername?steamid=${steamId}`);
    usrText = await usrJson.json();

    try {
        usr2.textContent = usrText.response.players[0].personaname;
    } catch (err) {
        usr2.textContent = "Invalid Profile"
        return
    }

    usr2.textContent = usrText.response.players[0].personaname;

    if (usrText.response.players[0].communityvisibilitystate != 3) {
        p2Stat1V.textContent = "Private Profile";
        p2Stat2V.textContent = "";
        p2Stat3V.textContent = "";
        p2Stat4V.textContent = "";
        p2Stat5V.textContent = "";
        p2Stat6V.textContent = "";
        p2Stat7V.textContent = "";
        p2Stat8V.textContent = "";
        p2Stat9V.textContent = "";
        p2Stat10V.textContent = "";
    } else {
        var p2Text = await response.json()
        var leetify = await leetifyResponse.json();
        p2Stat1V.textContent = getStat(p2Text, "total_kills");
        p2Stat2V.textContent = getStat(p2Text, "total_deaths");
        p2Stat3V.textContent = getStat(p2Text, "total_kills_knife");
        p2Stat4V.textContent = Math.round((getStat(p2Text, "total_matches_won") / getStat(p2Text, "total_matches_played")) * 100) + "%";
        p2Stat5V.textContent = (getStat(p2Text, "total_kills") / getStat(p2Text, "total_deaths")).toFixed(2);
        p2Stat6V.textContent = "$" + getStat(p2Text, "total_money_earned");
        p2Stat7V.textContent = getStat(p2Text, "total_shots_fired");
        p2Stat8V.textContent = Math.round((getStat(p2Text, "total_kills_headshot") / getStat(p2Text, "total_kills")) * 100) + "%";
        p2Stat9V.textContent = leetify.ranks.premier;
        p2Stat10V.textContent = leetify.ranks.faceit + " (" + leetify.ranks.faceit_elo + ")";
    }

    p2Stat1.style.visibility = "visible"
    p2Stat2.style.visibility = "visible"
    p2Stat3.style.visibility = "visible"
    p2Stat4.style.visibility = "visible"
    p2Stat5.style.visibility = "visible"
    p2Stat6.style.visibility = "visible"
    p2Stat7.style.visibility = "visible"
    p2Stat8.style.visibility = "visible"
    p2Stat9.style.visibility = "visible"
    p2Stat10.style.visibility = "visible"
}

async function getPlayerData() {
    getP1Data();
    getP2Data();
}