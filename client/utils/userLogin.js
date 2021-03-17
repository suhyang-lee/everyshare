import { ServerURL } from 'config/config';

const onCallbackUserLogin = ({ snsName }) => {
  window.location.href = `${ServerURL.getServerURL()}/auth/${snsName}`;
};

export default onCallbackUserLogin;
