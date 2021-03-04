const closureURL = () => {
  const url = "http://15.164.98.155";
  //const url = "http://localhost:3060";
  return {
    getServerURL: () => url,
  };
};

const ServerURL = closureURL();

export { ServerURL };
