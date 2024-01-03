import { isAxiosError } from 'axios';
import { Middleware } from 'next-api-route-middleware';
import winston from 'winston';
import { ILoggerArgs } from './types';

/**
 * logger - Winston logger for api routes
 */
const logger =
  process.env.NODE_ENV === 'production'
    ? winston.createLogger({ transports: [new winston.transports.Console({ level: 'info' })], format: winston.format.json() })
    : { error: (args: ILoggerArgs) => console.error(args), info: (args: ILoggerArgs) => console.info(args) };

/**
 * withLogs middleware - Logs properties from the incoming request, catches errors and logs them before returning an error response
 *
 * Logs out endpoint, body, method, query properties
 * @param endpoint - The name of the api route that is logging
 */
function withLogs(endpoint: string): Middleware {
  return async (req, res, next) => {
    const payload = { body: req.body, endpoint: `api/${endpoint}`, method: req.method, query: req.query };

    try {
      logger.info(payload);
      await next();
    } catch (error) {
      const { message, status } = isAxiosError(error) ? { message: error?.response?.data, status: error.response?.status || 500 } : { message: error, status: 500 };
      logger.error({ ...payload, error });

      // Pass the error status code and message from the failed api call back to the frontend
      return res.status(status).send({ ...message });
    }
  };
}

export { logger, withLogs };
