const closureURL = () => {
  const url = "https://everyshare-server.herokuapp.com";
  //const url = "http://localhost:3060";
  return {
    getServerURL: () => url,
  };
};

const ServerURL = closureURL();

export { ServerURL };
