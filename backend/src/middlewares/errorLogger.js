import { resolve, join } from 'path';
import { appendFile } from 'fs/promises';
import { randomUUID } from 'crypto';

import { logGenerator } from '../utils/logGenerator';
import { ensureLogsDirectory, logToFile } from '../utils/logGenerator';

async function errorLogger(err, req, res, _next) {
	try {
		const logsDir = resolve(import.meta.dirname, '..', 'logs');
		await ensureLogsDirectory(logsDir);

		const logInfo = logGenerator(randomUUID(), req.method, req.path, err);
		await logToFile(logsDir, logInfo, 'errors');

		res
			.status(err.statusCode || 500)
			.json({ message: err.message || 'Something went wrong' });
	} catch (error) {
		console.error('Error in errorLogger middleware:', error);
		res.sendStatus(500);
	}
}

export default errorLogger;
