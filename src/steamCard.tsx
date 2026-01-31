import React from "react"
import { ImageResponse } from "@vercel/og"

type CardDetails = {
  avatarUrl: string
  personaName: string
  gameExtraInfo?: string
}

type PlayerSummary = {
  avatarfull: string
  personaname: string
  gameextrainfo?: string
}

const playerSummary = async (steamids: string[]): Promise<PlayerSummary> => {
  const apiKey = process.env.STEAM_WEB_API_KEY
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamids.join(",")}`

  const response = await fetch(url)
  const data = await response.json()
  return data.response.players[0]
}

const currentGameDetails = async (steamids: string[]): Promise<CardDetails> => {
  const { avatarfull, personaname, gameextrainfo } = await playerSummary(steamids)
  return {
    avatarUrl: avatarfull,
    personaName: personaname,
    gameExtraInfo: gameextrainfo,
  }
}

const createCardElement = (details: CardDetails): JSX.Element => {
  const gameText = details.gameExtraInfo ? `Playing ${details.gameExtraInfo}` : "Not in-game"

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#3d3d3d",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <img src={details.avatarUrl} width={184} height={184} alt="avatar" style={{ borderRadius: "8px" }} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 32,
        color: "#f2f2f3",
        marginTop: "16px",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "100%",
      }}>
        <div style={{
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: 16,
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {details.personaName || "Gamer"}
        </div>
        <div style={{
          fontSize: 24,
          lineHeight: 1.3,
          opacity: 0.9,
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {gameText}
        </div>
      </div>
    </div>
  )
}

const createErrorElement = (): JSX.Element => (
  <div style={{
    display: "flex",
    backgroundColor: "#3d3d3d",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#f2f2f3",
    padding: "40px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    textAlign: "center",
  }}>
    Failed to fetch current game info :(
  </div>
)

export const generateSteamCard = async (
  steamids: string[]
): Promise<ImageResponse> => {
  const details = await currentGameDetails(steamids)

  return new ImageResponse(
    createCardElement(details),
    {
      width: 368,
      height: 368,
    }
  )
}

export const generateErrorCard = (): ImageResponse => {
  return new ImageResponse(
    createErrorElement(),
    {
      width: 368,
      height: 368,
    }
  )
}
