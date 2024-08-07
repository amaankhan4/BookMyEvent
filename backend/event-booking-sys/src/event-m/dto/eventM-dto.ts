import { IsAlpha, IsAlphanumeric, IsEmail, IsOptional, IsStrongPassword, IsString } from "class-validator";

export class eventManagerSignUpDto{
    @IsOptional()
    @IsAlpha()
    evmName:string
    @IsString()
    evmUserId:string
    @IsEmail({},{
        message:"Invalid Email Address"
    })
    evmEmail:string
    @IsStrongPassword({},
        {message:"Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."})
    evmPassword:string
}

export class eventManagerLoginDto{
    @IsEmail({},{
        message:"Invalid Credentials Format"
    })
    evmEmail:string
    @IsStrongPassword({},{
        message:"Invalid Credentials Format"
    })
    evmPassword:string
}