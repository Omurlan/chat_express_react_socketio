const baseUrl = "http://localhost:8000/api";

const get = async (url) => {
  try {
    const response = await fetch(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      throw new Error(message);
    }

    return data;
  } catch (error) {
    return error;
  }
};
const post = async (url, body) => {
  try {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }

      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const api = {
  post,
  get,
};
