import { randomUUID } from 'node:crypto';
import { resolve, join } from 'node:path';
import { appendFile, stat, mkdir } from 'node:fs/promises';

import { logGenerator } from '../utils/logGenerator.js';

async function requestLogger(req, res, next) {
	try {
		const filePath = resolve(import.meta.dirname, '..', 'logs');

		await stat(filePath).catch(async (err) => {
			if (err.code === 'ENOENT') {
				await mkdir(filePath);
				return;
			}

			throw new Error(`${err.code}: ${err.trace}`);
		});

		const logInfo = logGenerator(randomUUID(), req.method, req.path);

		await appendFile(join(filePath, 'requests.log'), logInfo, {
			encoding: 'utf-8',
		});

		next();
	} catch (err) {
		console.error(err);

		res.status(500).send('Internal Server Error');
	}
}

export default requestLogger;
