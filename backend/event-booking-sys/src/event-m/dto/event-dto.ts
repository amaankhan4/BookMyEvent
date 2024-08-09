import {IsDateString, IsString,} from "class-validator";

export class CreateEventDto{
    @IsString()
    eventId:string
    @IsString()
    title:string
    @IsString()
    description:string
    @IsDateString()
    date:string
}