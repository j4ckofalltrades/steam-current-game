import axios from "axios";
import playerSummary, {SteamId} from "./playerSummary";

type CardDetails = {
  avatar: string,
  ign: string,
  currentGame: string,
}

const currentGameDetails = async (steamId: SteamId): Promise<CardDetails> => {
  try {
    const summary = await playerSummary(steamId)
    return {
      avatar: await toBase64(summary.avatarmedium),
      ign: summary.personaname,
      currentGame: summary.gameextrainfo,
    }
  } catch (e) {
    throw e
  }
}

const toBase64 = async (imageUrl: string): Promise<string> =>
  axios
    .get(imageUrl, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      return Buffer.from(response.data, 'binary').toString('base64')
    })
    .catch(_ => {
      return ""
    })

const render = (details: CardDetails): string =>
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
    <style>
      .container {
        display: flex;
        grid-template-columns: 1fr 1fr;
        width: fit-content;
        background-color: #3d3d3d;
      }

      .summary {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 11pt;
        color: #f2f2f3;
        padding: 10px 10px 10px 10px;
        line-height: 20px;
      }
    </style>
    <foreignObject height="100%" width="100%">
      <div class="container" xmlns="http://www.w3.org/1999/xhtml">
        <img src="data:image/jpeg;base64, ${details.avatar}" height="64px" width="64px" alt="avatar"/>
        <div class="summary" xmlns="http://www.w3.org/1999/xhtml">
          ${details.ign
              ? `<div xmlns="http://www.w3.org/1999/xhtml">
                   <b>${details.ign}</b>
                 </div>`
              : `<div>Gamer</div>`
          }
          ${details.currentGame
              ? `<div xmlns="http://www.w3.org/1999/xhtml">
                   Playing <b>${details.currentGame}</b>
                 </div>`
              : `<div xmlns="http://www.w3.org/1999/xhtml">Not in-game</div>`
          }
        </div>
      </div>
    </foreignObject>
  </svg>
  `

const error = (): string =>
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="350px">
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
    <foreignObject height="100%" width="100%">
      <div class="container" xmlns="http://www.w3.org/1999/xhtml">
        <p xmlns="http://www.w3.org/1999/xhtml">Failed to fetch current game info :(</p>
      </div>
    </foreignObject>
  </svg>
  `

const card = async (steamId: SteamId) => {
  try {
    const details = await currentGameDetails(steamId)
    return render(details)
  } catch (e) {
    return error()
  }
}

export default card
