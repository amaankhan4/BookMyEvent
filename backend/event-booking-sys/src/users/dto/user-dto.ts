import { IsAlpha, IsEmail, IsOptional, IsStrongPassword } from "class-validator";

export class UserSignUpDto{
    @IsOptional()
    @IsAlpha()
    name:string
    @IsEmail({},{
        message:"Invalid Email Address"
    })
    userMail:string
    @IsStrongPassword({},
        {message:"Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."})
    userPassword:string
    @IsAlpha()
    userId:string
}

export class UserLoginDto{
    @IsEmail({},{
        message:"Invalid Credentials Format"
    })
    userMail:string
    @IsStrongPassword({},{
        message:"Invalid Credentials Format"
    })
    userPassword:string
}