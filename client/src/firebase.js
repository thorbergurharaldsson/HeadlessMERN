const prod = process.env.PROD;
const tskoliapi = prod
  ? "https://tskoli-intranet-api-alpha.vercel.app/api/v1/auth/me"
  : "http://localhost:3001/api/v1/auth/me";

const checkTskoliAuth = async () => {
  await fetch(tskoliapi, {
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 401) {
        console.log("auth failed");
      }
    })
    .catch((err) => {
      throw new Error(err.status);
    });
};

export const signInWithTskoli = async () => {
  let authenticated = false;
  // check if user is logged in to tskoli.dev
  const loggedIn = await fetch(tskoliapi, {
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 401) {
        const tskoliLogin = window.open("https://io.tskoli.dev/");
        const interval = setInterval(() => {
          if (tskoliLogin.closed) {
            checkTskoliAuth();
            clearInterval(interval);
          }
        }, 1000);
      } else {
        authenticated = true;
        return response.json();
      }
    })
    .catch((err) => {
      throw new Error(err.status);
    });
  const user = loggedIn;
  if (authenticated === true) {
    return user;
  }
};
