require('dotenv').config();

const { NODE_ENVS, UNAUTHORIZED } = require('./constants');
const configurations = require('../../config');

const getDynamicEnv = async (key) => {
  if (configurations.NODE_ENV === NODE_ENVS.development) {
    return key;
  } else {
  }
};

const isEmptyArray = (input = []) => {
  return Array.isArray(input) && input?.length > 0 ? false : true;
};

const handleServerError = (err, res) => {
  if (err.message === UNAUTHORIZED) {
    res.status(401).json({ msg: 'Unauthorized' });
  } else res.status(500).send('Server Error');
};

module.exports = {
  isEmptyArray,
  getDynamicEnv,
  handleServerError,
};
