import { Base64Upload, IdTitleDesc } from './misc.model';
import { User } from './user.model';
import { Jurisdiction } from './law.model';

export class StarSystem 
{
    id?:number
    title?:string
    planets?:Planet[]
    system_objects?:SystemObject[]
    jump_points?:JumpPoint[]
    gravity_wells?:GravityWell[]
    jurisdiction?: Jurisdiction;
    jurisdiction_id?: number;
}

export class GravityWell
{
    id?:number
    title?:string
    description?:string
    new_primary_image?:Base64Upload
    primary_image_url?:string
}

export class Planet
{
    id?:number;
    title?:string;
    moons?:Moon[];
    system_objects?:SystemObject[];
    locations?:SystemLocation[];
    orbits_system_id?:number;
    new_primary_image?:Base64Upload;
    primary_image_url?:string;
    system_map_images?:SystemImage[];
    atmospheric_height?:number;
    general_radiation?:number;
    economic_rating?:number;
    population_density?:number;
    minimum_criminality_rating?:number;
    jurisdiction?: Jurisdiction;
    jurisdiction_id?: number;
}

export class Moon
{
    id?:number
    title?:string
    description?:string
    orbits_planet_id?:number
    orbits_planet?:Planet
    system_objects?:SystemObject[]
    settlements?:Settlement[]
    locations?:SystemLocation[]
    new_primary_image?:Base64Upload
    primary_image_url?:string
    system_map_images?:SystemImage[]
    atmospheric_height?:number
    general_radiation?:number
    economic_rating?:number
    population_density?:number
    minimum_criminality_rating?:number
    jurisdiction?: Jurisdiction;
    jurisdiction_id?: number;
}

export class SystemObject
{
    id?:number
    title?:string
    description?:string
    orbits_system_id?:number
    orbits_planet_id?:number
    orbits_moon_id?:number
    locations?:SystemLocation[]
    new_primary_image?:Base64Upload
    primary_image_url?:string
    object_type_id?:number
    object_type?:IdTitleDesc
    system_map_images?:SystemImage[];
    jurisdiction?: Jurisdiction;
    jurisdiction_id?: number;
}

export class Settlement
{
    id?:number;
    title?:string;
    on_planet_id?:number;
    on_moon_id?:number;
    new_primary_image?:Base64Upload;
    primary_image_url?:string;
    jurisdiction?: Jurisdiction;
    jurisdiction_id?: number;
}

export class SystemLocation
{
    id?:number
    title?:string
    on_planet_id?:number
    on_moon_id?:number
    on_system_object_id?:number
    on_settlement_id?:number
    new_primary_image?:Base64Upload
    primary_image_url?:string
    location_type?: IdTitleDesc
    location_type_id?:number
}


export class JumpPoint
{
    id?:number;
    title?:string;
}

export class SystemMapTypes
{
    gravity_well_types?: IdTitleDesc[]
    planetary_body_types?: IdTitleDesc[]
    moon_types?: IdTitleDesc[]
    gw_lum_classes?: IdTitleDesc[]
    jp_sizes?: IdTitleDesc[]
    jp_statues?: IdTitleDesc[]
    system_object_types?: IdTitleDesc[]
    location_types?: IdTitleDesc[]
}

export class SystemImage
{
    id?:number
    title?:string
    description?:string
    of_system_id?:number
    of_planet_id?:number
    of_moon_id?:number
    of_system_object_id?:number
    of_location_id?:number
    of_settlement_id?: number
    of_gravity_well_id?:number
    created_by_id?:number
    created_by?:User
    new_image?:Base64Upload
    image_url?:string
    image_url_thumbnail?:string
}