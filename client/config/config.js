const closureURL = () => {
  const url = "http://api.everyshare.shop";
  //const url = "http://localhost:3060";
  return {
    getServerURL: () => url,
  };
};

const ServerURL = closureURL();

export { ServerURL };
