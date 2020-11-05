import { Server } from 'http';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env') });
import open from 'open';
import { app } from './app';

// const isDev = process.env.NODE_ENV === 'development';

/**
 * Start Express server.
 */
async function startServer(): Promise<Server> {
  const server = app.listen(app.get('port'), async () => {
    const url = `http://localhost:${app.get('port')}`;
    console.log(`  App is running at ${url} in ${app.get('env')} mode`);
    try {
      await open(url, { wait: false, url: true });
      console.log(`  Serverless config page is opened.`);
    } catch (e) {
      // no op
    }
    console.log('  Press CTRL-C to stop\n');
  });

  return server;
}

export { startServer };
