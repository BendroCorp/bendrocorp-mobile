import { OwnedShip } from './ship.models';
import { Base64Upload } from './misc.model';
import { ApprovalRequest } from './request.model';
import { User } from './user.model';

export class Character {
    id?:number;
    user_id?:number;
    first_name?:string;
    nickname?:string;
    last_name?:string;
    full_name?:string;
    description?:string;
    background?:string;

    avatar_url?:string;
    current_job_level?: number
    current_job?:Job
    jobs?:Job[]

    owned_ships?:OwnedShip[]

    new_avatar?:Base64Upload

    application?:CharacterApplication

    rsi_handle?:string
}

export class Job {
    id?: number
    title?: string
    description?: string
    hiring_description?: string
    recruit_job_id?: number
    next_job_id?: number
    division_id?: number
    hiring?: boolean
    job_level_id?: number
    max?: number
}

export class Division {
    id?: number
    name?: string
    color?: string
    short_name?: string
    description?: string
    can_have_ships?: boolean
    ordinal?: number

    division_members?:Character[]
}

export class Award {
    id?:number;
    title?:string;
    name?:string;
    image_url?:string;
}

export class NewCharacterApplication extends Character
{
    owned_ship?:OwnedShip
    owned_ships_attributes?:OwnedShip[]
    application_attributes?:CharacterApplication
    user_attributes?:User
}

export class CharacterApplication
{
    id?: number
    character_id?:number
    tell_us_about_the_real_you?: string
    why_do_want_to_join?: string
    how_did_you_hear_about_us?: string
    application_status_id?: number
    job_id?:number
    job?: Job
    comments?: CharacterApplicationComment[]
    application_status?: CharacterApplicationStatus
    interview?: CharacterApplicationInterview
    applicant_approval_request:ApprovalRequest
}

export class CharacterApplicationComment
{
    id?:number
    application_id?:number
    comment?:string
    user_id?:number
    commenter_name?:string
    avatar_url?:string
}

export class CharacterApplicationInterview
{
    id?: number
    tell_us_about_yourself?: string
    applicant_has_read_soc?: boolean
    applicant_agrees_to_respect_for_leadership?: boolean
    applicant_agrees_to_voice_policy?: boolean
    applicant_agrees_to_roleplay_style?: boolean
    applicant_agrees_to_follow_all_policies?: boolean
    applicant_agrees_to_understands_participation?: boolean
    why_selected_division?: string
    why_join_bendrocorp?: string
    applicant_questions?: string
    other_questions?: string
    interview_consensous?: string
    locked_for_review?: boolean
}

export class CharacterApplicationStatus
{
    id?:number
    title?:string
}