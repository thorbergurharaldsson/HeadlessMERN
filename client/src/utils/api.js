const tskoliapiURL = "https://tskoli-intranet-api-alpha.vercel.app/api/v1";

const tskoliAPI = {
  get: (path) =>
    fetch(`${tskoliapiURL}${path}`, {
      method: "GET",
      credentials: "include",
      headers: {},
    }).then(async (res) => ({ data: await res.json(), status: res.status })),
};

const horsemernAPI = {
  get: (path) =>
    fetch(`${process.env.HORSEMERN_PUBLIC_API_URL}${path}`, {
      method: "GET",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),

  post: (path, body) =>
    fetch(`${process.env.HORSEMERN_PUBLIC_API_URL}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    }).then(async (res) => {
      return {
        data: await res.json(),
        status: res.status,
      };
    }),

  patch: (path, body) =>
    fetch(`${process.env.HORSEMERN_PUBLIC_API_URL}${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),

  delete: (path, body) =>
    fetch(`${process.env.HORSEMERN_PUBLIC_API_URL}${path}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),
};

export { tskoliAPI, horsemernAPI };
