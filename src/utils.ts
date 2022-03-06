/**
 * Parse string into
 * @param source - Source string
 * @param single - True, if source string contains only one param
 */
export const parseParameters = (source: string, single = true): string | string[] => {
  return single ? source.split('_')[1] : source.split('_');
};
