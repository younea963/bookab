// determine what set of credentials to return
import prodKeys from './prod.js';
let credentials;


if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  credentials =  prodKeys;
} else {
  // we are in development - return the dev keys!!!
  const devKeys = (await import('./dev.js')).default;
  credentials = devKeys
  };


export default credentials;