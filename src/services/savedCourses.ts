import axios from "axios";
import { Product } from "../interfaces/products";
import { useState } from "react";
import refreshToken from "./refreshToken";

const savedCourses = async (courses: Product[]) => {
  const userData = JSON.parse(localStorage.getItem("userData") ?? "");
  const authTokens = JSON.parse(localStorage.getItem("authTokens") ?? "");
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);

  if (userData.expirated_date === today) {
    const newAccessToken = await refreshToken(authTokens.refresh);
    setAccessToken(newAccessToken);
  }
  for (const course of courses) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/course/",
        { 
          course,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      console.log(response.status)
    } catch (error) {
      console.error(error);
    }
  }
};

export default savedCourses;
