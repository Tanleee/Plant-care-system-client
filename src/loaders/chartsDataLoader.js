import dataLoader from "./dataLoader";

export default async function chartsDataLoader() {
  const sensorDataArchieve = await dataLoader("/api/v1/sensorDataArchieve");
  const sensorData = await dataLoader("/api/v1/sensorData");

  return { sensorDataArchieve, sensorData };
}
