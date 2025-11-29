import dataLoader from "./dataLoader";

export default function historyDataLoader() {
  return dataLoader("/api/v1/controlLog");
}
