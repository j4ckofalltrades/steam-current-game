import axios from "axios"
import { ISteamUserWrapper, PlayerSummary, SteamId } from "@j4ckofalltrades/steam-webapi-ts"

type CardDetails = Pick<PlayerSummary, "avatarmedium" | "personaname" | "gameextrainfo">

const playerSummary = async (steamids: SteamId[]): Promise<PlayerSummary> => {
  const { response: { players } } =
    await new ISteamUserWrapper(process.env.STEAM_WEB_API_KEY)
      .getPlayerSummaries(steamids)
  return players[0]
}

const currentGameDetails = async (steamids: SteamId[]): Promise<CardDetails> => {
  const { avatarmedium, personaname, gameextrainfo } = await playerSummary(steamids)
  return {
    avatarmedium: await toBase64(avatarmedium),
    personaname,
    gameextrainfo,
  }
}

const toBase64 = async (imageUrl: string): Promise<string> =>
  axios
    .get(imageUrl, {
      responseType: "arraybuffer"
    })
    .then(response => {
      return Buffer.from(response.data, "binary").toString("base64")
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch(_ => {
      return ""
    })

const render = (details: CardDetails): string => {
  const nickname = `${ details.personaname ?
    `<div xmlns="http://www.w3.org/1999/xhtml">
       <b>${ details.personaname }</b>
     </div>`
    : "<div>Gamer</div>"
  }`
  const currentGame = `${ details.gameextrainfo ?
    `<div xmlns="http://www.w3.org/1999/xhtml">
       Playing <b>${ details.gameextrainfo }</b>
    </div>`
    : "<div xmlns=\"http://www.w3.org/1999/xhtml\">Not in-game</div>"
  }`

  return `
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" height="64px" width="350px" viewBox="0 0 350 64">
    <style>
      .container {
        display: flex;
        grid-template-columns: 1fr 1fr;
        width: fit-content;
        background-color: #3d3d3d;
        height: 64px;
      }

      .summary {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 9pt;
        color: #f2f2f3;
        padding: 10px 10px 10px 10px;
        line-height: 20px;
      }
    </style>
    <foreignObject height="100%" width="100%">
      <div class="container" xmlns="http://www.w3.org/1999/xhtml">
        <img src="data:image/jpeg;base64, ${ details.avatarmedium }" alt="avatar" />
        <div class="summary" xmlns="http://www.w3.org/1999/xhtml">
        ${ nickname }
        ${ currentGame } 
        </div>
      </div>
    </foreignObject>
  </svg>
  `
}

export const errorCard =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="64px" width="250px">
    <style>
      .container {
        width: fit-content;
        background-color: #3d3d3d;
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 11pt;
        color: #f2f2f3;
        padding: 10px 10px 10px 10px;
      }
    </style>
    <foreignObject height="64px" width="250px">
      <div class="container" xmlns="http://www.w3.org/1999/xhtml">
        <p xmlns="http://www.w3.org/1999/xhtml">Failed to fetch current game info :(</p>
      </div>
    </foreignObject>
  </svg>
  `

const currentGameCard = async (steamids: SteamId[]): Promise<string> => render(await currentGameDetails(steamids))

export default currentGameCard
