import axios from "axios";

export type SteamId = string | string[]

export type PlayerSummary = {
  avatar: string,
  ign: string,
  currentGame: string,
}

type SteamPlayerSummary = {
  // public data
  steamid: string,
  personaname: string,
  profileurl: string,
  avatar: string,
  avatarmedium: string,
  avatarfull: string,
  personastate: number,
  communityvisibilitystate: number,
  profilestate: number,
  commentpermission: string,

  // private data
  realname?: string,
  primaryclanid?: string,
  timecreated?: number,
  gameid?: number,
  gameserverip?: string,
  gameextrainfo?: string,
  cityid?: string,
  loccountrycode?: string,
  locstatecode?: string,
}

const playerSummary = async (steamId: SteamId): Promise<PlayerSummary> => {
  const playerSummary = {
    avatar: '',
    ign: '',
    currentGame: '',
  }

  await axios
    .get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
    {
      params: {
        key: process.env.STEAM_WEB_API_KEY,
        steamids: Array.isArray(steamId) ? steamId[0] : steamId,
      }
    })
    .then(response => {
      const playerSummaryJson: SteamPlayerSummary = response.data['response']['players'][0]
      if (playerSummaryJson) {
        const ign = playerSummaryJson.personaname
        if (ign) {
          playerSummary.ign = ign
        }

        const avatar = playerSummaryJson.avatarmedium
        if (avatar) {
          playerSummary.avatar = avatar
        }

        const currentGame = playerSummaryJson.gameextrainfo
        if (currentGame) {
          playerSummary.currentGame = currentGame
        }
      }
    })

  // use data URLs for images
  if (playerSummary.avatar !== '') {
    await axios
      .get(playerSummary.avatar, {
        responseType: 'arraybuffer'
      })
      .then(response => {
        playerSummary.avatar = Buffer.from(response.data, 'binary').toString('base64')
      })
  }

  return playerSummary
}

export default playerSummary
