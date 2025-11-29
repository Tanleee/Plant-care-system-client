export default async function currentUserLoader() {
  try {
    const res = await fetch('/api/v1/users/me', {
      credentials: 'include'
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.data.data;
    /*eslint-disable*/
  } catch (err) {
    return null;
  }
}
