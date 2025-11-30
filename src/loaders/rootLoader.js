import dataLoader from "./dataLoader";

export default async function rootLoader() {
  const user = await dataLoader("/users/me");
  const notifications = await dataLoader("/notifications");

  return { user, notifications };
}
