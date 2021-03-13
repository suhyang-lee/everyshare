import api from "./index";
import USER from "actions/userAction";
import { ServerURL } from "config/config";

const Auth = {
  validateAuth: async (ctx) => {
    const cookie = ctx.req ? ctx.req.headers.cookie : "";

    if (ctx.req && cookie) api.defaults.headers.Cookie = cookie;

    ctx.store.dispatch({
      type: USER.LOAD_USER_INFO_REQUEST,
    });
  },
};

export default Auth;
