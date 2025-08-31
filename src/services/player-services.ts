import { PlayerTransferModel } from '../models/player/player-transfer-models';
import { deletePlayerById, getAllPlayers, getPlayerById, getPlayerByName, insertPlayer, updatePlayer } from '../repositories/player-repository';
import { StatusCode } from '../utils/status-code';
import { Player, PlayerResponse } from '../models/player/player-models';

export const deletePlayerByIdService = async(id: number) : Promise<PlayerTransferModel> => {
	let playerResponse: PlayerTransferModel = {
        statusCode: 0,
        body: []
    };

    try {
        await deletePlayerById(id);
    } catch (error) {
        const errorM = error? String(error) : []
        playerResponse = {
            statusCode: StatusCode.NotFound,
            body: error ? String(error) : []
        }
        console.table(playerResponse);
    }

    playerResponse = {
        statusCode: StatusCode.NoContent,
        body: []
    }

    console.table(playerResponse);
    return playerResponse;
}
