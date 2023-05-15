import axios from "axios";

const refreshToken = async (refresh_token:string) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/user/refresh-token/",
      {
        refresh: refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default refreshToken;