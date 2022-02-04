const getUserInfo = async () => {
  const response = await fetch(
    "https://tskoli-intranet-api-alpha.vercel.app/api/v1/auth/me",
    {
      credentials: "include",
    }
  );
  const user = await response.json();

  return user;
};

export default getUserInfo;
