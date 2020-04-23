// export { default as loginAnimate } from './loginAnimate';
// export { default as client } from './client';
// export { default as tools } from './tools';
import * as tools from './tools';
import * as client from './client';
import * as loginAnimate from './loginAnimate';

export default {
  ...tools,
  ...client,
  ...loginAnimate
};
