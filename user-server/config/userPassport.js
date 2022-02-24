const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./keys').mysqlConfig;
const keys = require('./keys');
const opts = {}
const handle = require('../utils/handle');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretUser;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        let sql = `select * from users where account = '${jwt_payload.account}' and identity=${jwt_payload.identity}`;
        handle(db, sql, (err, user) => {
            let formatData = JSON.parse(JSON.stringify(user))
            if (formatData.length != 0) {
                return done(null, formatData[0]);
            }
            return done(null, false);
        })
    }));
}