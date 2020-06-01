export default class QwixxModel {
  constructor(numRows, maxColumn) {
    this.numRows = numRows;
    this.maxColumn = maxColumn;

    this.whiteDiceUsed = false;
    this.colorDiceUsed = false;

    this.wdice = [1, 2];
    this.dice = [3, 4, 5, 6];

    this.invalid = [];
    this.valid1 = [];
    this.valid2 = [];

    this.redRow = 0;
    this.yellowRow = 0;
    this.greenRow = 0;
    this.blueRow = 0;

    this.diceRemoved = 0;

    this.pointArray = [0, 0, 0, 0];
    this.points = 0;

    this.penalties = 0;
  }

  // return a random integer in the range [1, 6]
  static rollDie() {
    return Math.floor(Math.random() * 6 + 1);
  }

  rollDice() {
    this.whiteDiceUsed = false;
    this.colorDiceUsed = false;
    this.wdice = this.wdice.map(() => QwixxModel.rollDie());
    this.dice = this.dice.map(() => QwixxModel.rollDie());

    //Get valid options based on dice rolls
    this.valid1 = this.getValidOptions1(this.wdice, this.dice);
    this.valid2 = this.getValidOptions2(this.wdice, this.dice);
  }

  lockRow(row, column, callback) {
    if (column == 12) {
      if (row == 0 && this.redRow >= 4) {
        this.diceRemoved += 1;
        callback(0);
      } else if (row == 1 && this.yellowRow >= 4) {
        this.diceRemoved += 1;
        callback(1);
      }
    } else if (column == 2) {
      if (row == 2 && this.greenRow >= 4) {
        this.diceRemoved += 1;
        callback(2);
      } else if (row == 3 && this.blueRow >= 4) {
        this.diceRemoved += 1;
        callback(3);
      }
    }
  }

  setInvalid(option) {
    let start = parseInt(option.column);
    let intRow = parseInt(option.row);
    if (intRow == 0 || intRow == 1) {
      for (var i = start; i > 1; i--) {
        this.invalid.push({ row: intRow, column: i });
      }
    } else if (intRow == 2 || intRow == 3) {
      for (var j = 12; j >= start; j--) {
        this.invalid.push({ row: intRow, column: j });
      }
    }
    console.log("Invalid: ", this.invalid);
  }

  updatePoints(arr) {
    let total = 0;
    for (var x in arr) {
      total = total + arr[x];
    }
    this.points = total;
  }

  // Probably should have used an array and looped through it instead of using case statements.
  setScore(score, w, c) {
    //Mark Dice Used
    this.whiteDiceUsed = w;
    this.colorDiceUsed = c;
    //Calculate Score
    let row = parseInt(score);
    let temp = 0;
    switch (row) {
      case 0:
        this.redRow += 1;
        temp = this.redRow;
        break;
      case 1:
        this.yellowRow += 1;
        temp = this.yellowRow;
        break;
      case 2:
        this.greenRow += 1;
        temp = this.greenRow;
        break;
      case 3:
        this.blueRow += 1;
        temp = this.blueRow;
        break;
    }
    let points = 0;
    switch (temp) {
      case 1:
        points = 1;
        break;
      case 2:
        points = 3;
        break;
      case 3:
        points = 6;
        break;
      case 4:
        points = 10;
        break;
      case 5:
        points = 15;
        break;
      case 6:
        points = 21;
        break;
      case 7:
        points = 28;
        break;
      case 8:
        points = 36;
        break;
      case 9:
        points = 45;
        break;
      case 10:
        points = 55;
        break;
      case 11:
        points = 66;
        break;
      case 12:
        points = 78;
        break;
    }
    this.pointArray[row] = points;
    this.updatePoints(this.pointArray);
  }

  //Get Valid options for the white dice combination
  //set this.valid1 to the array of options
  getValidOptions1(whiteDiceArray, diceArray) {
    let sum = whiteDiceArray[0] + whiteDiceArray[1];
    let options = [];
    for (var j = 0, len = diceArray.length; j < len; j++) {
      options.push({ row: j, column: sum });
    }
    console.log("Options1: ", options);
    return options;
  }

  takePenalty(bool) {
    if (bool == true) {
      this.points -= 5;
      this.penalties += 1;
    }
  }

  //Get Valid options for the white dice + color dice combanation
  //set this.valid2 to the array of options
  getValidOptions2(whiteDiceArray, diceArray) {
    let options = [];
    for (var j = 0, len = diceArray.length; j < len; j++) {
      options.push({ column: diceArray[j] + whiteDiceArray[0], row: j });
      options.push({ column: diceArray[j] + whiteDiceArray[1], row: j });
    }
    console.log("Options2: ", options);
    return options;
  }

  endGame(removed, penalty, callback) {
    if (removed >= 2) {
      callback();
    } else if (penalty >= 4) {
      callback();
    }
  }
}
