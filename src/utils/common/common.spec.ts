import { getBoard, getCongratsText} from "./common";
import { NUMBER_OF_PIECES } from "../consts/board";
import {PieceColor, PieceState} from "../consts/piece";

describe("Get board", () => {
    describe("Get board length", () => {
        it.each([
            { boardSize: 1, boardLength: 1 },
            { boardSize: 3, boardLength: 9 },
            { boardSize: 7, boardLength: 49 },
            { boardSize: 8, boardLength: 64 },
            { boardSize: 9, boardLength: 81 },
        ])(`should return second power of $boardSize`,
            ({boardSize, boardLength}) => {
                expect(getBoard(boardSize).length).toEqual(boardLength);
            });
    });
    describe("Get board cells", () => {
        it.each([
            {
                boardSize: 8,
                cell: {
                    row: 0,
                    col: 0,
                    isBlackCell: false,
                    piece: null,
                },
                position: 0,
            },
            {
                boardSize: 8,
                cell: {
                    row: 0,
                    col: 1,
                    isBlackCell: true,
                    piece: {
                        state: PieceState.Man,
                        color: PieceColor.Black,
                    },
                },
                position: 1,
            },
            {
                boardSize: 8,
                cell: {
                    row: 1,
                    col: 4,
                    isBlackCell: true,
                    piece: {
                        state: PieceState.Man,
                        color: PieceColor.Black,
                    },
                },
                position: 12,
            },
            {
                boardSize: 8,
                cell: {
                    row: 3,
                    col: 0,
                    isBlackCell: true,
                    piece: null,
                },
                position: 24,
            },
            {
                boardSize: 8,
                cell: {
                    row: 4,
                    col: 0,
                    isBlackCell: false,
                    piece: null,
                },
                position: 32,
            },
            {
                boardSize: 8,
                cell: {
                    row: 5,
                    col: 2,
                    isBlackCell: true,
                    piece: {
                        state: PieceState.Man,
                        color: PieceColor.White,
                    },
                },
                position: 42,
            },
            {
                boardSize: 8,
                cell: {
                    row: 7,
                    col: 7,
                    isBlackCell: false,
                    piece: null,
                },
                position: 63,
            },
        ])(`should be equal to cell from board index $position`,
            ({boardSize, cell, position}) => {
                expect(getBoard(boardSize)[position]).toEqual(cell);
            });
    });
})

describe("Get congratulation text", () => {
    it.each([
        {
            beatByWhite: [
                { state: PieceState.Man, color: PieceColor.Black },
            ],
            congratsText: "Black win!",
            NUMBER_OF_PIECES: NUMBER_OF_PIECES,
        },
        {
            beatByWhite: [
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
            ],
            congratsText: "Black win!",
            NUMBER_OF_PIECES: NUMBER_OF_PIECES,
        },
        {
            beatByWhite: [
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
                { state: PieceState.Man, color: PieceColor.Black },
            ],
            congratsText: "Whites win!",
            NUMBER_OF_PIECES: NUMBER_OF_PIECES,
        },
    ])(`should return $congratsText if beat by white not equal to total number of
              pieces on the board (beaten: $beatByWhite.length, total number: $NUMBER_OF_PIECES)`,
        ({beatByWhite, congratsText}) => {
        expect(getCongratsText(beatByWhite)).toEqual(congratsText);
    });
});
