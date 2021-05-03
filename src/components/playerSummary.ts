import axios from "axios";

export type SteamId = string | string[]

type SteamPlayerSummaries = {
  response: {
    players: SteamPlayerSummary[],
  }
}

export type SteamPlayerSummary = {
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

const playerSummary = async (steamId: SteamId): Promise<SteamPlayerSummary> =>
  await axios
    .get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
      {
        params: {
          key: process.env.STEAM_WEB_API_KEY,
          steamids: Array.isArray(steamId) ? steamId[0] : steamId,
        }
      })
    .then(response => {
      if (isPlayerSummaries(response.data)) {
        const playerSummaries = response.data
        return playerSummaries.response.players[0]
      }
    })
    .catch(e => {
      throw e
    })

const isPlayerSummaries = (data: unknown): data is SteamPlayerSummaries => {
  if (!data) {
    return false
  }

  return "response" in (data as SteamPlayerSummaries)
}

export default playerSummary
