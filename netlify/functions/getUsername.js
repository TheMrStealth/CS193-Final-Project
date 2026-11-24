export default async (req) => {
    try {
        const apiKey = process.env.STEAM_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API Key");
        }

        // Gets the url used to find the function and pulls the Steam id from it. If there was no steam id, it returns an error
        const url = new URL(req.url);
        const steamId = url.searchParams.get("steamid");

        if (!steamId) {
            return Response.json(
                {error: "Missing Steam ID"}
            );
        }

        // Gets the response from the Steam API. If the request failed, return that it failed
        const steamResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`);

        if (!steamResponse.ok) {
            return Response.json(
                {error: "Steam API request failed"}
            );
        }

        // Gets the JSON from the Steam response and returns it
        const data = await steamResponse.json();

        return Response.json(data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}