export default class QwixxController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.penalty = false;
    this.view.onRollButtonClicked(() => this.rollButtonClicked());
    this.view.onNumberButtonClicked((r, c) => this.numberBoxClicked(r, c));
  }

  rollButtonClicked() {
    this.model.rollDice();
    this.view.update(this.model);
    this.model.takePenalty(this.penalty);
    this.view.showPenalty(this.model);
    this.view.scorePoints(this.model.points);
    this.model.endGame(this.model.diceRemoved, this.model.penalties, () =>
      this.endGame()
    );
    this.penalty = true;
  }

  numberBoxClicked(row, column) {
    this.model.lockRow(row, column, () => this.lockColorRow(row));
    this.view.markBox(row, column, this.model, s => this.updateScore(s));
  }

  updateScore(s) {
    this.penalty = s.penalty;
    this.model.setScore(s.row, s.w, s.c);
    this.view.scorePoints(this.model.points);
    this.model.setInvalid({ row: s.row, column: s.column });
  }

  lockColorRow(row) {
    this.view.markL(row);
  }

  endGame() {
    this.view.endGame();
  }
}
