import {VercelRequest, VercelResponse} from '@vercel/node'
import currentGameCard, { errorCard } from "../src/currentGameCard";

require('dotenv').config()

export default async (request: VercelRequest, response: VercelResponse) => {
  const { steamids } = request.query
  if (!steamids) {
    return response
      .status(500)
  }

  response.setHeader("Content-Type", "image/svg+xml")
  response.setHeader("Cache-Control", "public, max-age=600");

  try {
    const card = await currentGameCard(Array.isArray(steamids) ? steamids : [steamids])
    return response
      .status(200)
      .send(card)
  } catch (e) {
    return response
      .status(200)
      .send(errorCard)
  }
}
