import { makeAutoObservable } from "mobx";
import {CellProps} from "../../interfaces/interfaces";

class GameStore {
    beatByBlack: CellProps[] = [];
    beatByWhite: CellProps[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addBeatByBlack(beatenPieces: CellProps[]) {
        this.beatByBlack = beatenPieces;
    }

    addBeatByWhite(beatenPieces: CellProps[]) {
        this.beatByWhite = beatenPieces;
    }
}

export default GameStore;
