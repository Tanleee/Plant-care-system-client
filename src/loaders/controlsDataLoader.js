import dataLoader from "./dataLoader";

export default async function controlsDataLoader() {
  return await dataLoader("/api/v1/deviceControl");
}
