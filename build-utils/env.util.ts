export const getSafeEnv = (key: string, defaultValue?: string | null) => {
  const result = process.env[key];

  if (result != null) {
    return result;
  } else if (defaultValue !== undefined) {
    if (defaultValue === null) {
      return undefined;
    }
    return defaultValue;
  } else {
    throw new Error(`Env variable "${key}" is required`);
  }
};
