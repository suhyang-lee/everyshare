const { v4: uuidv4 } = require('uuid');

const UUID = {
  getUUID: () => uuidv4(),
};

module.exports = UUID;
