export function logGenerator(id, method, path, err = undefined) {
  const timestamp = new Date();

  if (err) {
    const errorMessage = err.message || "No error message provided";
    const errorStack = err.stack || "No stack trace provided";

    return `[${timestamp.toISOString()}] [${id}] ${method} ${path} [${errorMessage}] Stack-Trace:${errorStack} \n\n`;
  }

  return `[${timestamp.toISOString()}] [${id}] ${method} ${path} \n`;
}
