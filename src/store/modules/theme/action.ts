export const TYPES = {} as any;
for (const key of Object.keys(TYPES)) {
  TYPES[key] = `theme__${key}`;
}
