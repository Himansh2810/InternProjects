let user_choosen;

document.getElementById("ch-O").addEventListener("click", () => {
  document.getElementById("show-opt").innerHTML =
    "You have choosen <b style='color:white;'>O</b> first";
  document.getElementById("head").innerText =
    "Click anywhere below boxes you want to start the game ..!";
  user_choosen = "O";
});

document.getElementById("ch-X").addEventListener("click", () => {
  document.getElementById("show-opt").innerHTML =
    "You have choosen <b style='color:white;'>X</b> first";
  document.getElementById("head").innerText =
    "Click anywhere below boxes you want to start the game ..!";
  user_choosen = "X";
});

const row1 = document.getElementById("row1").childNodes;
const row2 = document.getElementById("row2").childNodes;
const row3 = document.getElementById("row3").childNodes;

let gb = [];

row1.forEach((box) => {
  box.addEventListener("click", () => {
    SetGame(box);
  });
});

row2.forEach((box) => {
  box.addEventListener("click", () => {
    SetGame(box);
  });
});

row3.forEach((box) => {
  box.addEventListener("click", () => {
    SetGame(box);
  });
});

function SetGame(box) {
  if (user_choosen && box.innerText) {
    alert("Already Written ...");
  } else {
    if (user_choosen) {
      box.textContent = user_choosen;

      if (gb.length >= 8) {
        document.getElementById("head").innerHTML =
          "<b style='color:red;'>Game END</b>";
        StopGame();
      } else {
        gb.push(box.id);

        if (gb.length >= 5) {
          if (CheckWin()) {
            document.getElementById("head").innerHTML =
              "<b style='color:green;'>Game Over you win !!</b>";

            StopGame();
          } else {
            PlayByMachine(box.id, user_choosen);
          }
        } else {
          PlayByMachine(box.id, user_choosen);
        }
      }
    } else {
      document.getElementById("head").innerHTML =
        "<b style='color:red;'>Please choose your move first ..</b>";
    }
  }
}

function StopGame() {
  user_choosen = undefined;
}

function PlayByMachine(id, userMove) {
  let move = RandomChoose(id);
  gb.push(move);

  if (userMove == "X") {
    document.getElementById(move).innerText = "O";

    if (gb.length >= 5 && CheckWin()) {
      document.getElementById("head").innerHTML =
        "<b style='color:red;'>Game Over , You Loose !!</b>";
      StopGame();

      return true;
    } else {
      return false;
    }
  } else {
    document.getElementById(move).innerText = "X";

    if (gb.length >= 5 && CheckWin()) {
      document.getElementById("head").innerHTML =
        "<b style='color:red;'>Game Over , You Loose !!</b>";
      StopGame();

      return true;
    } else {
      return false;
    }
  }
}

function RandomChoose(id) {
  const embox = [11, 12, 13, 21, 22, 23, 31, 32, 33];

  let ans;
  let rn = Math.floor(Math.random() * 9);

  if (gb.includes("col" + embox[rn])) {
    ans = RandomChoose(id);
  } else {
    if ("col" + embox[rn] == id) {
      ans = RandomChoose(id);
    } else {
      console.log(gb);
      ans = "col" + embox[rn];
    }
  }

  return ans.toString();
}

function CheckWin() {
  let W;

  for (let i = 0; i < gb.length; i++) {
    let move = gb[i];

    let fe = move[3],
      le = move[4];

    if (Check("vertical", le)) {
      W = true;
      break;
    } else if (Check("horizon", fe)) {
      W = true;
      break;
    } else if (fe == le && Check("diagonal")) {
      W = true;
      break;
    } else {
      W = false;
      continue;
    }
  }

  return W;
}

function Check(direction, tip) {
  let x = [];

  for (let j = 0; j < 3; j++) {
    let tfe, tle;

    if (direction == "vertical") {
      tfe = 1 + j;
      tle = tip;
    } else if (direction == "horizon") {
      tfe = tip;
      tle = 1 + j;
    } else if (direction == "diagonal") {
      tfe = 1 + j;
      tle = 1 + j;
    }

    let idstr = "col" + tfe + "" + tle;

    x[j] = document.getElementById(idstr).innerText;
  }

  if (x[0] == x[1] && x[1] == x[2]) {
    return true;
  } else {
    return false;
  }
}
