import api from "./index";
import USER from "actions/userAction";
import { ServerURL } from "config/config";

const Auth = {
  validateAuth: async (ctx) => {
    const cookie = ctx.req ? ctx.req.headers.cookie : "";

    if (ctx.req && cookie) api.defaults.headers.Cookie = cookie;
    const res = await api.post(`${ServerURL.getServerURL()}/auth/token`);

    if (res.headers["set-cookie"]) {
      ctx.res.setHeader("Set-Cookie", res.headers["set-cookie"]);
    }

    ctx.store.dispatch({
      type: USER.LOAD_USER_INFO_REQUEST,
    });
  },
};

export default Auth;
