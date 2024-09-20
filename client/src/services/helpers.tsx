export const fetchData = async (
  url: string,
  method: string,
  payload: object = {}
) => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      payload.token = token;
    }

    const params = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorisation: `Bearer ${token}`,
      }),
      token: token,
    };

    if (method !== "GET") {
      params.body = JSON.stringify(payload);
    }

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${backendURL}/api/${url}`, params);

    return res;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

export const fetchCountriesVisited = async (userId: string) => {
  try {
    const token = window.localStorage.getItem("token");

    const params = {
      method: "GET",
      headers: new Headers({
        Authorisation: `Bearer ${token}`,
      }),
      token: token,
    };

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(
      `${backendURL}/api/${userId}/getCountriesVisisted`,
      params
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
