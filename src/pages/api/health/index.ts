import { use } from 'next-api-route-middleware';
import { withLogs } from '@/middleware/withLogs';
import packagejson from '../../../../package.json';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Checks if we can connect to the app
 */
async function health(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: 'ok', time: new Date(), version: packagejson.version });
}

export default use(withLogs('health'), health);
