const passport = require("passport");
const { Strategy: KakaoStrategy } = require("passport-kakao");
const User = require("../../models/user.model");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/api/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          // console.log("exUser", exUser);

          if (exUser) {
            // passport.serializeUser((user, done) => {
            //   done(null, { ...exUser, accessToken });
            // });
            done(null, exUser, accessToken);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              name: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });

            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done();
        }
      }
    )
  );
};
