import dataLoader from "./dataLoader";

// get latest record
export default async function sensorDataLoader() {
  const data = await dataLoader("/sensor-data?sort=-timestamp&limit=1");
  return data[0];
}
