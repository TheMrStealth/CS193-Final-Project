export default async (req) => {
    try {
        const apiKey = process.env.STEAM_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API Key");
        }

        const url = new URL(req.url);
        const steamId = url.searchParams.get("steamid");

        if (!steamId) {
            return Response.json(
                {error: "Missing Steam ID"}
            );
        }

        const steamResponse = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${apiKey}&steamid=${steamId}`);

        if (!steamResponse.ok) {
            return Response.json(
                {error: "Steam API request failed"}
            );
        }

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