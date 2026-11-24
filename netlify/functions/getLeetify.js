export default async (req) => {
    try {
        const apiKey = process.env.LEETIFY_API_KEY;

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

        // Gets the response from the Leetify API, passing the API key as a header to verify it is an authorized user. If the request failed, return that it failed
        const leetifyResponse = await fetch(
            `https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${steamId}`,
            {headers: {"_leetify_key": apiKey}}
        );

        if (!leetifyResponse.ok) {
            return Response.json(
                {error: "Leetify API request failed"}
            );
        }

        // Gets the JSON from the Steam response and returns it
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