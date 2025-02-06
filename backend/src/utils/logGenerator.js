export function logGenerator(id, method, path) {
  const date = new Date();

  return `[${date.toISOString()}] [${id}] ${method} ${path}  \n`;
}
