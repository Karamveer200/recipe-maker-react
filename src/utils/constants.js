const configurations = require('../../config');

const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  VALIDATION: 'VALIDATION',
};

const NODE_ENVS = {
  development: 'development',
  production: 'production',
  testing: 'testing',
};

const MAPPER_NAMESPACES = {
  buyOrUsePasses: 'buyOrUsePasses',
  userInformation: 'userInformation',
  topics: 'topics',
};

const QUERIES = {
  insertBuyPass: 'insertBuyPass',
};

module.exports = {
  ARRAY_KEYS,
  NODE_ENVS,
  MAPPER_NAMESPACES,
  QUERIES,
};
