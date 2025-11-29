import dataLoader from "./dataLoader";

export default function controlsDataLoader() {
  return dataLoader("/api/v1/deviceControl");
}
