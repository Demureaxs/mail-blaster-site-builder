export function parseUtm(searchParams: URLSearchParams): Record<string, string> {
  const utm: Record<string, string> = {};
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  keys.forEach(key => {
    const val = searchParams.get(key);
    if (val) utm[key] = val;
  });
  
  return utm;
}
