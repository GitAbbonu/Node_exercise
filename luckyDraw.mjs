//Create a getResults function that uses async and await. Inside of the function, call the luckyDraw function for each of the players: Tina, Jorge, Julien

// Log out the resolved value for each promise and handle any promise rejections.

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults() {
  try {
    const tinaResult = await luckyDraw("Tina");
    console.log(tinaResult);
  } catch (error) {
    console.error(error);
  }

  try {
    const jorgeResult = await luckyDraw("Jorge");
    console.log(jorgeResult);
  } catch (error) {
    console.error(error);
  }

  try {
    const julienResult = await luckyDraw("Julien");
    console.log(julienResult);
  } catch (error) {
    console.error(error);
  }
}

getResults()
  .then((res) => console.log(res))
  .catch((err) => console.log("Errore: " + err));
