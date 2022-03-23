const horsemernAPI = {
  get: (path) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: "GET",
    }).then(async (res) => {
      return await res.json();
    }),
};

const fetcher = async (path) => {
  return await horsemernAPI.get(`${path}`);
};

export { fetcher };
