import { makeAutoObservable } from "mobx";
import { PieceProps } from "../../interfaces/interfaces";

class GameStore {
    beatByBlack: PieceProps[] = [];
    beatByWhite: PieceProps[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addBeatByBlack(beatenPieces: PieceProps[]) {
        this.beatByBlack = beatenPieces;
    }

    addBeatByWhite(beatenPieces: PieceProps[]) {
        this.beatByWhite = beatenPieces;
    }
}

export default GameStore;
