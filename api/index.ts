import type { VercelRequest, VercelResponse } from "@vercel/node"
import { generateErrorCard, generateSteamCard } from "../src/steamCard"

export default async (request: VercelRequest, response: VercelResponse) => {
  const { steamids } = request.query

  response.setHeader("Content-Type", "image/png")
  response.setHeader("Cache-Control", "public, max-age=600")

  if (!steamids) {
    const errorImage = generateErrorCard()
    const buffer = await errorImage.arrayBuffer()
    return response.send(Buffer.from(buffer))
  }

  try {
    const card = await generateSteamCard(Array.isArray(steamids) ? steamids : [steamids])
    const buffer = await card.arrayBuffer()
    return response.send(Buffer.from(buffer))
  } catch (e) {
    console.error("Failed to generate Steam card:", e)
    const errorImage = generateErrorCard()
    const buffer = await errorImage.arrayBuffer()
    return response.send(Buffer.from(buffer))
  }
}
