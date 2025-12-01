const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api/v1";

export default async function dataLoader(loaderUrl) {
  console.log(API_BASE_URL);
  try {
    const res = await fetch(`${API_BASE_URL}${loaderUrl}`, {
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
