import { Character } from './character.model';

export class Ship 
{
    id?:number
    name?:string
}

export class OwnedShip 
{
    id?:number
    title?:string
    ship_id?:number
    ship:Ship
    character_id:number
    character:Character
}