import dataLoader from "./dataLoader";

export default function currentUserLoader() {
  return dataLoader("/api/v1/users/me");
}
