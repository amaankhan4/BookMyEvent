import { IsAlpha, IsAlphanumeric, IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateEventDto{
    @IsString()
    eventId:string
    @IsString()
    title:string
    @IsString()
    description:string
    @IsString()
    evManagerid_:string
    @IsDateString()
    date:string
}