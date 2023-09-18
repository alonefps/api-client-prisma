export function debug(message: string, error?: string | undefined) {
  if (process.env.DEBUG_MODE === "true") {
    console.log(`${message}`);

    if (error !== undefined) {
      console.error(error);
    }

    return;
  }
}
