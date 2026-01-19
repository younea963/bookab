// determine what set of credentials to return
let credentials;
import prodKeys from './prod.js';
import devKeys from './dev.js';

if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  credentials = {
    prodKeys
  };
} else {
  // we are in development - return the dev keys!!!
  credentials = {
    devKeys
  };
}

export default credentials;