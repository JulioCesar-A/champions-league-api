import { ClubResponse } from "./club-models";

export interface ClubTransferModel {
    statusCode: number,
    body: ClubResponse | ClubResponse[] | string
}