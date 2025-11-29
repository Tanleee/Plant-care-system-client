export default async function dataLoader(loaderUrl) {
  try {
    const res = await fetch(loaderUrl);
    if (!res.ok) {
      throw new Error("Something wrong when fetching data!");
    }

    const data = await res.json();

    return data.data.data;
  } catch (err) {
    console.log(err.message);
  }
}
