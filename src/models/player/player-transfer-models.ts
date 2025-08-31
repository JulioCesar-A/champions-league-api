import { PlayerResponse } from "./player-models";

export interface PlayerTransferModel {
    statusCode : number,
    body: PlayerResponse | PlayerResponse[] | string
}