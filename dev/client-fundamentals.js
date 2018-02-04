/*
 NEEDS STANDARD FEATHERSCLI METHODS
*/
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');
const localStorage = require('localstorage-memory');
const fetch = require('node-fetch');

const feathersClient = feathers();

const defaultOpts = {
  user: {
    email: 'admin@penny.local',
    password: 'root'
  },
  server: {
    protocol: 'http',
    host: 'localhost',
    port: 8675
  }
}
let callOpts = {
  user: {
    email: 'admin@penny.local',
    password: 'root'
  }
}
let options = Object.assign(defaultOpts,callOpts);
let { server: { port: PORT, host: HOST, protocol: PROTOCOL }, user: CREDS } = options;
// console.log(PROTOCOL,PORT,HOST,CREDS)
// console.log(Object.assign({strategy: 'local'},CREDS))
// console.log(`${PROTOCOL}://${HOST}:${PORT}`)
let feathersUri = `${PROTOCOL}://${HOST}:${PORT}`
feathersClient
  .configure(rest(feathersUri).fetch(fetch))
  .configure(auth({ storage: localStorage }));

function feathersAuth() {
  return new Promise((resolve, reject) => {
    feathersClient.authenticate()
      .then(response => {
        // console.log('Authenticated local with existing creds!', response);
        // return feathersClient.passport.verifyJWT(response.accessToken);
        return feathersClient.authenticate({strategy: 'jwt',accessToken: response.accessToken});
      })
      .then(response => {
        // console.log('token Authenticated!',response.accessToken);
        resolve(response.accessToken)
      })
      .catch((error) => {
        // console.error('Error authenticating with existing creds!', error);
        reject(error)
    });
  })
}

function feathersLogin(LOGINCREDS) {
  // console.log(LOGINCREDS)
  let resObj = {}
  return new Promise((resolve, reject) => {
    feathersClient.authenticate(Object.assign({strategy: 'local'},LOGINCREDS))
      .then(response => {
        // console.log('Authenticated!');
        resObj.accessToken = response.accessToken;
        return feathersClient.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        // console.log('JWT Payload', payload);
        resObj.jwtPayload = payload;
        return feathersClient.service('users').get(payload.userId);
      })
      .then(user => {
        feathersClient.set('user', user);
        // console.log('User', feathersClient.get('user'));
        resObj.user = feathersClient.get('user');
      })
      .then(() => {
        resolve(['FCLI:LOGIN',resObj]);
      }).catch(function(error){
        let errRet = {
          type: error.type,
          name: error.name,
          message: error.message,
          code: error.code,
          className: error.className,
          data: error.data,
          // errors: error.errors,
          // response: error.response,
          // url: error.response.url,
          // headers: error.response.headers
        }
        // console.log(Object.keys(error))
        // [ 'type',
        //   'name',
        //   'message',
        //   'code',
        //   'className',
        //   'data',
        //   'errors',
        //   'response' ]
        // errRet = error
        reject({msg:'FCLI:LOGIN',err: errRet});
    });
  })
}

function inlineBool(args,boolflag) {
  ;( boolflag || Math.round(Math.random()) )
    ? ((args = 'default') => {
        console.log('truthy with args',args)
      })(args)
    : ((args = 'default') => {
        console.log('falsy with args',args)
      })(args)
}

// demo promise function
function promisingOp({args,boolflag=null}) {
  let resObj = {}
  return new Promise((resolve, reject) => {
    ;( boolflag || Math.round(Math.random()) )
      ? ((args = 'default') => {
          // console.log('truthy with args',args)
          resObj.msg = `truthy with args:${args}`
          resolve(['FCLI:PREF',resObj]);
        })(args)
      : ((args = 'default') => {
          // console.log('falsy with args',args)
          let errRet = `falsy with args:${args}`
          reject({msg:'FCLI:PREF',err: errRet});
        })(args)
  })
}
// promisingOp({args:'testi',boolflag:true}).then(function(result) { // maybe can emit event
//    console.log(`pop returned ok! :`,result)
//  }).catch(function(error) {
//    console.log(`pop returned error! :`,error)
// })
// fetchAsync({fetchUri,fetchMethod,fetchHeaders,fetchBody = null})
// fetchAsync(
//   {   fetchMethod: 'get',
//       fetchUri: 'https://jsonplaceholder.typicode.com/users',
//       fetchHeaders: { }
//   }
// )


function fetchAsync({fetchUri,fetchMethod,fetchHeaders,fetchBody = null}) {
  // needs to be asynced or promisified
  let defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  let fetchOpts = {
    method: fetchMethod,
    headers: Object.assign(defaultHeaders,fetchHeaders)
  }
  if (fetchMethod !== 'get') {
    console.log('doing a non get fetch')
    fetchOpts.body = JSON.stringify(fetchBody)
  }
  fetch(fetchUri, fetchOpts).then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    }).catch(function(err) {
      console.log(err);
  });
}
// check auth
/*
feathersAuth().then(function(result) { // maybe can emit event
   console.log(`auth returned ok! :`,result)
 }).catch(function(error) {
   console.log(`auth returned error! :`,error)
})
*/
// proper async-await with error handling
async function callFetchlib(awaitFunc,awaitOpts,thenFunc,thenOpts){
  try {
    let ref, res;
    [ref,res] = await awaitFunc(awaitOpts);
    console.log(`Awaiter succeded! :`,ref);
    // console.log(res);
    // console.log('now use res.accessToken to access resource')
    if (thenOpts.isAuth) {
      console.log('action is auth')
      thenOpts.fetchHeaders.Authorization = res.accessToken
    }
    thenFunc(thenOpts)
  } catch (error) {
      console.log(`Awaiter failed! :`, error.msg);
      console.log(error.err);
  }
}

// internal get protected route via login
// callFetchlib(
//   feathersLogin,
//   { email: 'admin@penny.local', password: 'root'},
//   fetchAsync,
//   {   fetchMethod: 'get',
//       fetchUri: `${feathersUri}/protected`,
//       isAuth: true,
//       fetchHeaders: { }
//   }
// )

// internal post unprotected
// callFetchlib(
//   promisingOp,
//   {args:'testi',boolflag:true},
//   fetchAsync,
//   {   fetchMethod: 'post',
//       fetchUri: `${feathersUri}/messages`,
//       fetchHeaders: { },
//       fetchBody: {
//         text: 'a flcient example message'
//       }
//   }
// )

// innternal get unprotected
// callFetchlib(
//   promisingOp,
//   {args:'testi',boolflag:true},
//   fetchAsync,
//   {   fetchMethod: 'get',
//       fetchUri: `${feathersUri}/messages`,
//       fetchHeaders: { }
//   }
// )

// external get unprotected
// callFetchlib(
//   promisingOp,
//   {args:'testi',boolflag:true},
//   fetchAsync,
//   {   fetchMethod: 'get',
//       fetchUri: 'https://jsonplaceholder.typicode.com/users',
//       fetchHeaders: { }
//   }
// )






