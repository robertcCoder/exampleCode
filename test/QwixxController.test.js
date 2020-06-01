import QwixxController from "../QwixxController.js";

describe("QwixxController", () => {
  let model;
  let view;
  let controller;

  // Set up the test object and the mocks
  beforeEach(() => {
    model = {
      rollDice: jest.fn(),
      takePenalty: jest.fn(),
      showPenalty: jest.fn(),
      onNumberButtonClicked: jest.fn(),
      onRollButtonClicked: jest.fn(),
      scorePoints: jest.fn(),
      updateScore: jest.fn(),
      rollButtonClicked: jest.fn(),
      lockColorRow: jest.fn(),
      endGame: jest.fn()
    };

    view = {
      onRollButtonClicked: jest.fn(),
      update: jest.fn(),
      onNumberButtonClicked: jest.fn(),
      showPenalty: jest.fn(),
      scorePoints: jest.fn(),
      endGame: jest.fn(),
      updateScore: jest.fn(),
      lockColorRow: jest.fn(),
      rollButtonClicked: jest.fn()

    };

    controller = new QwixxController(model, view);
  });

  describe("#rollButtonClicked", () => {
    it("Tells the model to roll the dice", () => {
      controller.rollButtonClicked();
      expect(model.rollDice).toHaveBeenCalledTimes(1);
    });
    it("Tells the view to update", () => {
      controller.rollButtonClicked();
      expect(view.update).toHaveBeenCalledWith(model);
    });
  });
});
