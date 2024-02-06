import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./auth.constant";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret,
        });
      }
    async validate(payload:any){
      // console.log("authJwtStrat:",{id:payload.sub,email:payload.email})
        return {id:payload.sub,email:payload.email}
    }
}