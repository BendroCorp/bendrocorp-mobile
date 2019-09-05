import { User } from './user.model';
import { IdTitleDesc, IdTitleDescOrd } from './misc.model';

export class Offender
{
    id?:number
    offender_name?:string
    offender_handle?:string
    offender_handle_verified?:boolean
    offender_reports?:OffenderReport[]
    offender_rating?:IdTitleDesc
    offender_rating_id?:number
    offender_report_org?:OffenderOrg
    offender_rsi_avatar?:string
    /**
     * Used to create a new offender report. Will not be otherwise populated
     */
    offender_attributes?:OffenderReport
}

export class OffenderReport
{
    id?:number
    description?:string
    created_at?:Date
    report_approved?:boolean
    submitted_for_approval?:boolean
    created_by?:User
    violence_rating?:ViolenceRating
    occured_when?:Date
    occured_when_ms?:number
    full_location?:string
    offender?:Offender
    offender_id?:number
    force_level_applied?:ForceLevel
    force_level_applied_id?:number
    infractions?:Infraction[]
    original_infractions?: Infraction[]; // for form use only. Does not exist on API
    new_infractions?:Infraction[] // only used when creating an offender report
    remove_infractions?:Infraction[]

    system_id?: number
    planet_id?: number
    moon_id?: number

    offender_report_approval_request?:OffenderReportApprovalRequest
    ship_id?: number;
    violence_rating_id?: number;
    offender_attributes?: Offender;
    created_by_id?: number;
}

export class OffenderOrg
{
    commitment?: string;
    description?: string;
    id?: number;
    known_offenders?: Offender[];
    logo?: string;
    member_count?: number;
    model?: string;
    primary_activity?: string;
    secondary_activity?: string;
    spectrum_id?: string;
    title?: string;
    violence_rating_id?: null;
    violence_rating?:ViolenceRating;
}

export class ViolenceRating extends IdTitleDesc {
}

export class ForceLevel extends IdTitleDesc {
}

export class Infraction extends IdTitleDescOrd {
}

export class OffenderReportApprovalRequest {
    id?: number;
}
