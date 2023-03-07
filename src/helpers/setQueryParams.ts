
/**
 * @description 
 * to make query param api
 * @example 
 * setQueryParams({ limit: 10, gift_template_id: "1232asdasdbhasd", keyword: undefined })
 * => "?limit=10&gift_template_id=1232asdasdbhasd"
 */
export default function setQueryParams<T = object>(props: T | object): string {
  if (typeof props !== "object") throw "setQueryParams params must be an object";
  
  let results = "?";
  const getEntries = Object.entries(props ?? {}).filter(([key, value]) => value !== undefined);

  getEntries.forEach(([key, value], index) => {
    results += `${key}=${value}${index === (getEntries.length - 1) ? "" : "&"}`;
  });

  return results;
}