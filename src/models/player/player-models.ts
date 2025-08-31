export type Statistics = {
    overall?: number
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
}

export type StatisticsUpdate = {
    overall?: number
    pace?: number
    shooting?: number
    passing?: number
    dribbling?: number
    defending?: number
    physical?: number
}

type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

export interface Player {
    name: string
    nationality: string
    position: Position
    statistics: Statistics
    clubId? : number
}

export interface PlayerUpdate {
    name?: string
    nationality?: string
    position?: Position
    statistics?: StatisticsUpdate
    clubId?: number
}

export interface PlayerResponse extends Player {
    id: number
}