export default class QwixxView {
  constructor() {}

  // Ideally, this view class should be the only class interacting with the DOM.
  // However, it is the controller that responds to the click.
  // One solution is for the controller to call a View method that adds
  // a callback of the Controller's choosing.
  onRollButtonClicked(callback) {
    document.getElementById("roll").addEventListener("click", callback);
  }

  onNumberButtonClicked(callback) {
    let numberBoxes = document.getElementsByClassName("numberBox");
    for (let i = 0; i < numberBoxes.length; ++i) {
      numberBoxes[i].addEventListener("click", event => {
        let regex = /box-(\d+)-(\d+)/;

        // using numberBoxes[i]
        // is a better approach because it will work even if you have elements
        // nested inside your number boxes
        let [, row, column] = numberBoxes[i].id.match(regex);
        callback(row, column);
      });
    }
  }

  showPenalty(model) {
    document.getElementById("penalty").innerHTML = "" + model.penalties;
  }

  scorePoints(score) {
    document.getElementById("score").innerHTML = "" + score + "";
  }

  markL(row) {
    let id = "box" + "-" + row + "-L";
    document.getElementById(id).innerHTML = "X";
  }

  markBox(row, column, model, callback) {
    let rules = false;
    let penalty = true;

    //Valid options are stored in model.valid 1 and 2
    let validOptions1 = model.valid1;
    let validOptions2 = model.valid2;
    let wDie = model.whiteDiceUsed;
    let cDie = model.colorDiceUsed;
    let invalidOptions = model.invalid;
    //verify box clicked matches an option, if so rules = true
    var option, option2, invalid;
    for (option of validOptions1) {
      if (option.row == row && option.column == column && !wDie) {
        rules = true;
        wDie = !wDie;
      }
    }
    for (option2 of validOptions2) {
      if (option2.row == row && option2.column == column && !cDie) {
        rules = true;
        cDie = !cDie;
      }
    }
    //Remove invalid clicks
    for (invalid of invalidOptions) {
      if (invalid.row == row && invalid.column == column) {
        rules = false;
      }
    }

    //If the row and column match a valid option,
    //mark the board and set penalty to false
    if (rules) {
      let id = "box-" + row + "-" + column;
      document.getElementById(id).innerHTML = "X";
      penalty = false;
      let r = {
        penalty: false,
        row: row,
        column: column,
        w: wDie,
        c: cDie
      };
      callback(r);
    }
  }

  // Update the board according to the current state of the model.
  // IMPORTANT:  The View should not modify the model.  All accesses
  // to the model should be read only.
  update(model) {
    model.wdice.forEach((die, index) => {
      document.getElementById(`die-w${index}`).innerHTML = die;
    });

    model.dice.forEach((die, index) => {
      document.getElementById(`die-${index}`).innerHTML = die;
    });
  } // end update

  endGame() {
    document.getElementById("end").innerHTML = "END GAME";
    document.getElementById("roll").disabled = "true";
    let numberBoxes = document.getElementsByClassName("numberBox");
    for (let i = 0; i < numberBoxes.length; ++i) {
      numberBoxes[i].disabled = "true";
    }
  }
} // end QwixxView
