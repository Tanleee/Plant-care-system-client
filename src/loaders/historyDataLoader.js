import dataLoader from "./dataLoader";

export default async function historyDataLoader() {
  const controlLog = await dataLoader("/control-log");
  const sensorData = await dataLoader("/sensor-data");

  return { controlLog, sensorData };
}
