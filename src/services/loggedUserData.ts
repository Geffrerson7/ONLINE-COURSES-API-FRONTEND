import axios from "axios";

const loggedUserData = async (id:string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/user/api/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default loggedUserData;