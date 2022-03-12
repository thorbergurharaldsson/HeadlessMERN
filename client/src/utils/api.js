
const dev = process.env.DEV;
const tskoliapi = dev
  ? "http://localhost:3001/api/v1"
  : "https://tskoli-intranet-api-alpha.vercel.app/api/v1";

const api = {
  get: (path) =>
    fetch(`${tskoliapi}${path}`, {
      method: "GET",
      credentials: "include",
      headers: {},
    }).then(async (res) => ({ data: await res.json(), status: res.status })),
};

export default api;
// Vercel
