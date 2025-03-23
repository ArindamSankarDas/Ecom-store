export async function ensureLogsDirectory(logsDir) {
	try {
		await stat(logsDir);
	} catch (err) {
		if (err.code === 'ENOENT') {
			try {
				await mkdir(logsDir, { recursive: true });
			} catch (mkdirErr) {
				console.error('Error creating logs directory:', mkdirErr);
				throw mkdirErr;
			}
		} else {
			throw err;
		}
	}
}

export async function logToFile(logsDir, logInfo, filename) {
	const logFilePath = join(logsDir, `${filename}.log`);
	try {
		await appendFile(logFilePath, logInfo, { encoding: 'utf-8' });
	} catch (fileErr) {
		console.error(`${filename.toUpperCase()} writing to log file:`, fileErr);
		throw fileErr;
	}
}

export function logGenerator(id, method, path, err = undefined) {
	const timestamp = new Date();

	if (err) {
		const errorMessage = err.message || 'No error message provided';
		const errorStack = err.stack || 'No stack trace provided';

		return `[${timestamp.toISOString()}] [${id}] ${method} ${path} [${errorMessage}] Stack-Trace:${errorStack} \n\n`;
	}

	return `[${timestamp.toISOString()}] [${id}] ${method} ${path} \n`;
}
