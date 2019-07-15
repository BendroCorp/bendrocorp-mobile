import { OwnedShip } from './ship.models';
import { Base64Upload } from './misc.model';

export class FlightLog
{
    id?:number
    title?:string
    text?:string
    public?:boolean
    privacy_changes_allowed?:boolean
    locked?:boolean
    finalized?:boolean
    owned_ship?:OwnedShip
    owned_ship_id?:number
    log_time_ms?:number;
    new_image_uploads?:FlightLogImage[]
    image_uploads?:FlightLogImage[]
}

export class FlightLogImage
{
    id?:number
    title?:string
    description?:string
    image?:Base64Upload

    image_url_original?:string
    image_url_large?:string
    image_url_small?:string    
}