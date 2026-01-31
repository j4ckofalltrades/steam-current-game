# :video_game: Current game (on Steam)

Display your current game on your website, blog, or GitHub README.

The generated card (PNG image) includes your avatar, in-game name, and the title of the current game (if in-game).

![Steam Current Game](https://steam-current-game.vercel.app/api/?steamids=76561198311570174)

## Usage

1. Get your Steam ID (in Home > Account)
2. Set `Game Details` to `Public` on your Steam profile (required for retrieving current game)
3. Reference the following link in your markdown or HTML
`https://steam-current-game.vercel.app/api/?steamids=<steamid>` replacing `<steamid>` with your own.

The image is 368x368 pixels (2x resolution square format). Display as-is or scale:
```html
<!-- Native size (368x368) - crisp 2x rendering -->
<img src="https://steam-current-game.vercel.app/api/?steamids=<steamid>" alt="Steam Status">

<!-- Compact size (scales to 184x184) -->
<img src="https://steam-current-game.vercel.app/api/?steamids=<steamid>" width="184" alt="Steam Status">

<!-- Small size (scales to 128x128) -->
<img src="https://steam-current-game.vercel.app/api/?steamids=<steamid>" width="128" alt="Steam Status">
```

## Running locally

**This requires a Steam Web API Key, you can get one at https://steamcommunity.com/dev/apikey**

Test locally with the [Vercel CLI](https://vercel.com/cli).

The project relies on the `STEAM_WEB_API_KEY`, make sure that it is available in the current environment.
One way to do this is by defining it in a `.env` file (containing `STEAM_WEB_API_KEY=<api_key>`).

`npx vercel dev`

## Deploy your own instance on Vercel

**This requires a Steam Web API Key, you can get one at https://steamcommunity.com/dev/apikey**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fj4ckofalltrades%2Fsteam-current-game&env=STEAM_WEB_API_KEY&envDescription=A%20Steam%20Web%20API%20key%20is%20required&envLink=https%3A%2F%2Fsteamcommunity.com%2Fdev)
