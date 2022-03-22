let tskoliapiURL = process.env.REACT_APP_TSKOLI_API;
let horsemernapiURL = process.env.REACT_APP_HORSEMERN_API;

if (process.env.REACT_APP_NODE_ENV === "development") {
  tskoliapiURL = "http://localhost:3001/api/v1";
  horsemernapiURL = "http://localhost:8080/api";
}

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
    fetch(`${horsemernapiURL}${path}`, {
      method: "GET",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),

  post: (path, body) =>
    fetch(`${horsemernapiURL}${path}`, {
      method: "POST",
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
    fetch(`${horsemernapiURL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),

  delete: (path, body) =>
    fetch(`${horsemernapiURL}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    }).then(async (res) => ({ data: await res.json(), status: res.status })),
};

export { tskoliAPI, horsemernAPI };
