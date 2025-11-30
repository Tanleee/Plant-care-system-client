import dataLoader from "./dataLoader";

export default async function historyDataLoader() {
  const controlLog = await dataLoader("/api/v1/controlLog");
  const sensorData = await dataLoader("/api/v1/sensorData");

  return { controlLog, sensorData };
}
