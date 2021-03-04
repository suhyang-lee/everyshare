import { useCallback } from "react";
import { ServerURL } from "config/config";

export const onNaverLogin = useCallback(() => {
  const currentUrl = document.location.href;
  window.location.href = `${ServerURL.getServerURL()}/auth/naver?redirect_url=${encodeURIComponent(
    currentUrl,
  )}`;
}, []);
