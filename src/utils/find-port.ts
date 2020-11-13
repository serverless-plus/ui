import pRetry from 'p-retry';
import portfinder from 'portfinder';

const defaultPort = 3000;

function defaultTo(value: any, def: any) {
  return value == null ? def : value;
}

function tryParseInt(input: any) {
  const output = parseInt(input, 10);

  if (Number.isNaN(output)) {
    return null;
  }

  return output;
}

function runPortFinder() {
  return new Promise((resolve, reject) => {
    portfinder.basePort = defaultPort;
    portfinder.getPort((error, port) => {
      if (error) {
        return reject(error);
      }

      return resolve(port);
    });
  });
}

function findPort(port: string | number): Promise<any> {
  if (port) {
    return Promise.resolve(port);
  }

  // Try to find unused port and listen on it for 3 times,
  // if port is not specified in options.
  // Because NaN == null is false, defaultTo fails if parseInt returns NaN
  // so the tryParseInt function is introduced to handle NaN
  const defaultPortRetry = defaultTo(tryParseInt(process.env.DEFAULT_PORT_RETRY), 3);

  return pRetry(runPortFinder, { retries: defaultPortRetry });
}

export default findPort;
