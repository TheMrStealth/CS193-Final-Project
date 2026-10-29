# CS2 Player Comparison
A website for comparing two players' lifetime Counter-Strike 2 (CS2) stats side-by-side, using data from Steam's Web API.

## Project Goal
The goal of this project is to create a website where someone can easily compare the CS2 stats of two players.

## MVP scope
First working version:
- Take two Steam IDs through input fields
- Send each ID to a Netlify function, which calls the Steam Web API with a hdiden API key
- Pull each player's lifetime CS2 stats
- Display the basic stats for both players side-by-side
- Show a clear message when a profile is private or an ID is invalid

The MVP runs locally. Deployment, extra stats, and other features are listed under future plans.

## Future plans
Planned features, roughly ordered in priority:
- Team creation to compare groups of players
- Mobile-friendly layout
- Charts for each stat category
- Calculated stats like K/D, headshot %, and win rate
- Search by Steam profile URL or custom ID
- Leetify data for richer and per-map stats
- Dark mode
- Deployment via Netlify

## Tech stack
- Language: Javascript (Node.js for backend), HTML, and plain CSS
- Backend: Netlify Functions, which proxy requests to Steam so the API key stays on the server
- Tools: Netlify CLI for local testing, Git and GitHub for version control, curl for testing API calls
- Data source: Steam Web API, free with an API key, returns JSON, only works for public profiles
- Data storage: None for MVP, stats are fetched live for each comparison