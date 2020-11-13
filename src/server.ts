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
async function startServer(route = '/'): Promise<Server> {
  const PORT = await findPort(process.env.PORT as string);
  const server = app.listen(PORT, async () => {
    const url = `http://localhost:${PORT}`;
    const openUrl = `${url}${route}`;
    console.log(`  App is running at ${url} in ${app.get('env')} mode`);
    try {
      await open(openUrl, { wait: false, url: true });
      console.log(`  Serverless config page is opened.`);
    } catch (e) {
      // no op
    }
    console.log('  Press CTRL-C to stop\n');
  });

  return server;
}

export { startServer };
