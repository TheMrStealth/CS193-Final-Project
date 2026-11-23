export default async (req) => {
    try {
        const apiKey = process.env.LEETIFY_API_KEY;

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

        const leetifyResponse = await fetch(
            `https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${steamId}`,
            {headers: {"_leetify_key": apiKey}}
        );

        if (!leetifyResponse.ok) {
            return Response.json(
                {error: "Leetify API request failed"}
            );
        }

        const data = await leetifyResponse.json();

        return Response.json(data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}