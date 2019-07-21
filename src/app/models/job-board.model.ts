import { Character } from "./character.model";

export class JobBoardMission
{
    id?:number;
    title?:string
    description?:string
    completion_criteria_id?:number
    completion_criteria?:JobBoardMissionCompletionCriteria
    starts_when?:Date 
    created_at?:Date
    expires_when?:Date
    max_acceptors?:number
    op_value?:number
    mission_status_id?:number;
    mission_status?:JobBoardMissionStatus
    on_mission?:Character[]
    completion_request_id?:number
}

export class JobBoardMissionCompletionCriteria
{
    id?:number
    title?:string
    description?:string
}

export class JobBoardMissionStatus
{
    id?:number
    title?:string
    description?:string
}

export class JobBoardMissionCompletionRequest
{
    mission_id:number
    completion_message?:string
    flight_log_id?:number
}