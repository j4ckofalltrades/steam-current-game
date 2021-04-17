import playerSummary from "../src/components/playerSummary";
import {VercelRequest, VercelResponse} from '@vercel/node'
import card from "../src/components/card";

require('dotenv').config()

export default async (request: VercelRequest, response: VercelResponse) => {
  const {steamid} = request.query
  if (!steamid) {
    return response
      .status(500)
  }

  response.setHeader("Content-Type", "image/svg+xml")
  response.setHeader("Cache-Control", "public, max-age=3600");

  return response
    .status(200)
    .send(card(await playerSummary(steamid)))
}
