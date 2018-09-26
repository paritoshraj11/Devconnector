import passportJwt from "passport-jwt";
import { User } from "../models/index";
import { keys } from "./connection";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

const jwtAuthentication = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        let user = await User.findById(jwt_payload._id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log(">>>>Error in jwtAuthentication", err);
        throw new Error(err);
      }
    })
  );
};

module.exports = {
  jwtAuthentication
};
