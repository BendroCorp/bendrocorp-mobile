import { Character } from './character.model';

export class Event
{
    id?:number;
    name?:string;
    description?:string;
    start_date?:Date;
    end_date?:Date;
    start_date_ms?:number;
    end_date_ms?:number;
    show_on_dashboard?:boolean;
    weekly_recurrence?:boolean;
    monthly_recurrence?:boolean;
    event_type_id?:number;
    event_type:EventType;
    attendences?:EventAttendence[];
    briefing:EventBriefing;
    debriefing:EventDebriefing;
    published:boolean;
    is_expired:boolean;
    submitted_for_certification?: boolean;
    certified: boolean;
}

export class EventAttendence
{
    id?:number;
    event_id?: number;
    user_id?: number;
    character_id?: number;
    character?:Character;
    attendence_type_id?: number;
    certified?:boolean;
}

export class EventBriefing
{
    id?:number;
    communications_designee_id?: number;
    communications_designee?:Character;
    escort_leader_id?:number;
    escort_leader?: Character;
    operational_leader_id?:number;
    operational_leader?:Character
    reporting_designee_id?: number;
    reporting_designee?:Character;

    notes?:string;
    objective?:string;
    
    published?:boolean;
    published_when?: Date;
    
    starting_system_id?: number;
    ending_system_id?:number;
}

export class EventDebriefing
{
    id?:number;
    text?:string;
}

export class AttendenceType
{
    id?:number;
    title?:string;
}

export class EventType
{
    id?:number;
    title?:string;
    description?:string;
}