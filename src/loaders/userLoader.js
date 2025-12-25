import dataLoader from "./dataLoader";

export default async function userLoader() {
  const user = await dataLoader("/users/me");

  return user ;
}
