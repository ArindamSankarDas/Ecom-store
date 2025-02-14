export function logGenerator(id, method, path, err = undefined) {
  const timestamp = new Date();

  if (err) {
    const errorMessage = err.message || "No error message provided";
    const errorStack = err.stack || "No stack trace provided";

    const requestInfo = {
      method,
      path,
    };

    const logEntry = {
      timestamp,
      id,
      message: errorMessage,
      stack: errorStack,
      request: requestInfo,
    };

    return JSON.stringify(logEntry) + "\n";
  }

  return `[${timestamp.toISOString()}] [${id}] ${method} ${path}  \n`;
}
