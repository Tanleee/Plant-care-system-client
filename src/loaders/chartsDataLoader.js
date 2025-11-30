import dataLoader from "./dataLoader";

export default async function chartsDataLoader() {
  const sensorDataArchieve = await dataLoader("/sensor-data-archieve");
  const sensorData = await dataLoader("/sensor-data");

  return { sensorDataArchieve, sensorData };
}
