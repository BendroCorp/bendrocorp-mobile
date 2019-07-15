import { User } from './user.model';

export class LogItem
{
    module?:string;
    severity?:string; 
    message?:string;
    trace?:string;
}

export class MenuItem
{
    id?:string;
    title?:string;
    icon?:string;
    link?:string;
    internal?:boolean;
    nested_under_id?:number;
    ordinal?:number;
    nested_items?:MenuItem[];
}

export class StatusMessage
{
    message?:string;
}

export class OAuthClient
{
    id?: number
    title?: string
    client_id?: string
    logo?: string
}

export class OAuthRequest
{
    state?: string
    client_id?: string
    response_type?: string
    scope?: string
    redirect_uri?: string
}

export class OAuthToken
{
    id?:number
    client_title?:string
    token?:string
}

export class Base64Upload
{
    temp_id?:number;
    name: string
    type: string 
    size: number
    base64: string
}

export class IdTitleDesc 
{
    id?:number
    title?:string
    description?:string
}

export class IdTitleDescOrd extends IdTitleDesc
{
    ordinal?:number
}

export class SiteLog
{
    id?:number
    module?: string
    submodule?: string
    message?: string
    site_log_type_id?: number
    site_log_type?: IdTitleDesc
    created_at?: Date
}

export class DonationItem
{
    id?: number
    title?: string
    description?: string
    goal?: number
    created_by?: User
    created_by_id?: number
    archived?: boolean
    donations?: Donation[]
    total_donations?: number
    is_completed?: boolean
    ordinal?: number
}

export class Donation
{
    id?: number
    donation_item_id?: number
    user_id?: number
    user?: User
    amount?: number
    stripe_transaction_id?: string
    charge_succeeded?: boolean
    charge_failed?: boolean
    card_token?: string
    created_at?:Date
}