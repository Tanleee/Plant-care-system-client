import getApiUrl from "../utils/getApiUrl";

export default async function dataLoader(loaderUrl) {
  try {
    const res = await fetch(getApiUrl(`/api/v1${loaderUrl}`), {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Something wrong when fetching data!");
    }

    const data = await res.json();

    return data.data.data;
    /*eslint-disable*/
  } catch (err) {
    // console.log(err.message);
    return null;
  }
}
