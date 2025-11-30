import dataLoader from "./dataLoader";

export default async function notificationDataLoader() {
  return await dataLoader("/api/v1/notification");
}
