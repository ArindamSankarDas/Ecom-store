import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import {
	ensureLogsDirectory,
	logGenerator,
	logToFile,
} from '../utils/logGenerator.js';

async function requestLogger(req, res, next) {
	try {
		const logsDir = resolve(import.meta.dirname, '..', 'logs');
		await ensureLogsDirectory(logsDir);

		const logInfo = logGenerator(randomUUID(), req.method, req.path);
		await logToFile(logsDir, logInfo, 'requests');

		next();
	} catch (err) {
		console.error('Error in requestLogger middleware:', err);
		res.status(500).send('Internal Server Error');
	}
}

export default requestLogger;
