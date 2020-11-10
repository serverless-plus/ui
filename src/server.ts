import { Server } from 'http';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
import open from 'open';
import { app } from './app';
import findPort from './utils/find-port';

/**
 * Start Express server.
 */
async function startServer(): Promise<Server> {
  const PORT = await findPort(process.env.PORT);
  const server = app.listen(PORT, async () => {
    const url = `http://localhost:${PORT}`;
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
