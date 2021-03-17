import nookies from 'nookies';

const cookie = {
  getCookie: (req, cookieKey) => {
    const cookie = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith(`${cookieKey}=`));

    if (!cookie) return undefined;
    return cookie.split('=')[1];
  },

  setCookie: (ctx, key, value) => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);

    nookies.set(ctx, key, value, {
      maxAge: 30 * 60,
      path: '/',
      httpOnly: true,
    });
  },

  removeCookie: (ctx, key) => {
    nookies.destroy(ctx, key);
  },
};

export default cookie;
