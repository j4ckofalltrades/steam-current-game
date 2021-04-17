import {PlayerSummary} from "./playerSummary";

const card = (summary: PlayerSummary) => {
  return `
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
        <img src="${summary.avatar}" height="64px" width="64px" alt="avatar"/>
        <div class="summary" xmlns="http://www.w3.org/1999/xhtml">
          ${summary.ign ? `<div xmlns="http://www.w3.org/1999/xhtml"><b>${summary.ign}</b></div>` : `<div>Gamer</div>`}
          ${summary.currentGame ? `<div xmlns="http://www.w3.org/1999/xhtml">Playing <b>${summary.currentGame}</b></div>`
            : `<div xmlns="http://www.w3.org/1999/xhtml">Not in-game</div>`}
        </div>
      </div>
    </foreignObject>
  </svg>
  `
}

export default card
