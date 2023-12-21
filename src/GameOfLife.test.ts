import "jest-canvas-mock";
import { GameOfLife } from "./GameOfLife";
import { GameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";

describe("GameOfLife", () => {
  let gameBoard: GameBoard;
  let game: GameOfLife;
  let renderer: GameRenderer;

  beforeEach(() => {
    gameBoard = new GameBoard(10, 10);
    game = new GameOfLife(gameBoard, 100);
    renderer = new GameRenderer(document.createElement("div"), gameBoard, game);
    game.setRenderer(renderer);
    game.startGame();
  });

  it("should get the correct speed", () => {
    const speed = game.getSpeed();
    expect(speed).toBe(100);
  });

  it("should set cell alive", () => {
    game.setCell(0, 0, true);
    expect(game.isCellAlive(0, 0)).toBe(true);
  });

  it("should toggle cell", () => {
    game.setCell(0, 0, true);
    game.toggleCell(0, 0);
    expect(game.isCellAlive(0, 0)).toBe(false);

    game.toggleCell(0, 0);
    expect(game.isCellAlive(0, 0)).toBe(true);
  });

  it("should get next generation", () => {
    game.setCell(0, 0, true);
    game.setCell(0, 1, true);
    game.setCell(0, 2, true);

    game.getNextGeneration();

    expect(game.isCellAlive(0, 0)).toBeFalsy();
    expect(game.isCellAlive(0, 1)).toBeTruthy();
    expect(game.isCellAlive(0, 2)).toBeFalsy();
  });

  it("should count alive neighbors", () => {
    game.setCell(0, 0, true);
    game.setCell(0, 1, true);
    game.setCell(1, 0, true);
    game.setCell(1, 1, true);

    expect(game.countAliveNeighbors(0, 0)).toBe(3);
  });

  it("should stop game", () => {
    game.stopGame();
    expect(game["isGameRunning"]).toBeFalsy();
  });

  it("should clear game field", () => {
    game.clearGameField();
    expect(game["isGameRunning"]).toBeFalsy();
    expect(game.areAnyCellAlive(game.grid)).toBeFalsy();
  });
});