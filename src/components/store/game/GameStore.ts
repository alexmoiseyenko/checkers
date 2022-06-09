import { makeAutoObservable } from "mobx";
import {ICell} from "../../../interfaces/interfaces";

class GameStore {
    beatByBlack: ICell[] = [];
    beatByWhite: ICell[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addBeatByBlack(beatenPieces: ICell[]) {
        this.beatByBlack = beatenPieces;
    }

    addBeatByWhite(beatenPieces: ICell[]) {
        this.beatByWhite = beatenPieces;
    }
}

export default GameStore;
