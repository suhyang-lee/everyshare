const closureURL = () => {
  //const url = "http://api.everyshare.shop";
  const url = "http://localhost:80";
  return {
    getServerURL: () => url,
  };
};

const ServerURL = closureURL();

export { ServerURL };
