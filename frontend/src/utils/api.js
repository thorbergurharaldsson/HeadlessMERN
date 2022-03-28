// const horsemernAPI = {
//   get: (path) =>
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
//       method: "GET",
//     }).then(async (res) => ({
//       data: await res.json(),
//       status: res.status,
//     })),
// };

const horsemernAPI = {
  get: (path) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: "GET",
      headers: {},
    }).then(async (res) => ({ data: await res.json(), status: res.status })),
};

const fetcher = async (path) => {
  return await horsemernAPI.get(`${path}`);
};

export { fetcher, horsemernAPI };
