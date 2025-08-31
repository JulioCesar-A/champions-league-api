import { PlayerTransferModel } from '../models/player/player-transfer-models';
import { deletePlayerById, getAllPlayers, getPlayerById, getPlayerByName, insertPlayer, updatePlayer } from '../repositories/player-repository';
import { StatusCode } from '../utils/status-code';
import { Player, PlayerResponse, PlayerUpdate } from '../models/player/player-models';

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


export const insertPlayerService = async(player: Player, clubId?: number) : Promise<PlayerTransferModel> => {
    let playerResponse: PlayerTransferModel = {
        statusCode: 0,
        body: []
    }
    let newPlayer: PlayerResponse;

    try {
        newPlayer = await insertPlayer(player, clubId);
    } catch (error) {
        playerResponse = {
            statusCode: StatusCode.InternalServerError,
            body: error ? String(error) : []
        }
        return playerResponse;
    }

    playerResponse = {
        statusCode: StatusCode.Created,
        body: [newPlayer]
    }

    return playerResponse;
}

export const updatedPlayerService = async(
    player: PlayerUpdate,
    id: number
) : Promise<PlayerTransferModel> => {
    let playerResponse: PlayerTransferModel = {
        statusCode: 0,
        body: []
    }
    let updatedPlayer: PlayerResponse;

    try {
        updatedPlayer = await updatePlayer(player, id);
    } catch (error) {
        const errorMsg = error ? String(error) : '';
        if (errorMsg.includes('not found')) {
            playerResponse = {
                statusCode: StatusCode.NotFound,
                body: errorMsg
            };
        } else if (errorMsg.includes('Could not update')) {
            playerResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorMsg
            };
        } else {
            playerResponse = {
                statusCode: StatusCode.InternalServerError,
                body: errorMsg
            };
        }
        console.table(playerResponse);
        return playerResponse;
    }

    playerResponse = {
        statusCode: StatusCode.OK,
        body: updatedPlayer
    };
    
    console.log(playerResponse);
    return playerResponse;
}