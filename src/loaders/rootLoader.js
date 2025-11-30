import dataLoader from "./dataLoader";

export default async function rootLoader() {
  const user = await dataLoader("/api/v1/users/me");
  const notifications = await dataLoader("/api/v1/notifications");

  return { user, notifications };
}
