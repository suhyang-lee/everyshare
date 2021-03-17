import authAPI from 'lib/api/auth';
import cookie from 'utils/cookie';
import USER from 'actions/userAction';

const Auth = {
  validateAuth: async (ctx) => {
    const prevCookie = ctx.req ? ctx.req.headers.cookie : '';
    if (ctx.req && cookie) authAPI.defaults.headers.Cookie = prevCookie;

    if (prevCookie) {
      const access = cookie.getCookie(ctx.req, 'access_token') || undefined;
      const refresh = cookie.getCookie(ctx.req, 'refresh_token') || undefined;

      if (!access && !refresh) return;

      if (!access && refresh) {
        const res = await authAPI.post('/auth/token');
        cookie.setCookie(ctx, 'access_token', res.data.accessToken);
      }

      ctx.store.dispatch({
        type: USER.LOAD_USER_INFO_REQUEST,
      });
    }
  },

  invalidateAuth: async (ctx) => {
    const prevCookie = ctx.req ? ctx.req.headers.cookie : '';
    if (!prevCookie) return;

    const access = cookie.getCookie(ctx.req, 'access_token') || undefined;

    if (access) cookie.removeCookie(ctx, 'access_token');
  },
};

export default Auth;
