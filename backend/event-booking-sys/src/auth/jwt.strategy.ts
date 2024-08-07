import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Request as RequestType} from 'express';
import { env } from "node:process";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        jwtStrategy.extractJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: env.SECRET_KEY})
  }
  private static extractJwt(req:RequestType) {
    if (req && 'user_token' in req.cookies && req.cookies.user_token.length > 0) {
      return req.cookies.user_token
    }
  }
  async validate(payload: any) {
    return { email:payload.email, userId:payload.sub }
  }
}

