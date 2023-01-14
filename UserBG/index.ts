import { Plugin } from "aliucord/entities";
import { getByProps, getByName, React } from "aliucord/metro";
import { after } from "aliucord/utils/patcher";
//import { ApplicationCommandOptionType } from "aliucord/api";

export default class UserBG extends Plugin {
    public async start() {
      let userid;
      const regex = ".*?\"(http?s:\/\/.*?)\",";
      const response = await fetch("https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json");
      //this.logger.info("database " + datab);
      const datab = await response.text();
      //his.logger.info("match " + theimg);
      
      const HeaderAvatar = getByName("HeaderAvatar");
      after(HeaderAvatar, "default", (ctx, component) => {
          const [{user, style}] = ctx.args;
          userid = Object.values(user)[3]; //the most cursed way to get an id 
      }); 
        
        const ProfileBanner = getByName("ProfileBanner"); //thank you cloudburst https://github.com/c10udburst-discord/Aliucord-RightNow-Plugins 
        after(ProfileBanner, "default", (ctx, component) => {
            let [{bannerSource}] = ctx.args;
            try {
                    const join = userid + regex;
                    let theimg = datab.match(join);
                    this.logger.info("Custom Img " + theimg[1]);
                    this.logger.info("User id " + userid);
                    bannerSource = theimg[1];
            } catch(e) {
                    this.logger.info("Wrong wrong " + e);
                  } 
                } 
            //this.logger.info("Banner URi " + bnurl);
            //his.logger.info("Banner ctxargs " + Object.values(bannerSource)) 
        });
        
    }
}