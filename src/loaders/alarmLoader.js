import dataLoader from "./dataLoader";

export default async function rootLoader() {
  const alarm = await dataLoader("/alarm");

  return alarm ;
}
