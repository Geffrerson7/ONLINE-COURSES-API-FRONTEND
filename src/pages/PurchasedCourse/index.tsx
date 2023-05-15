import { useState, useEffect } from "react";
import refreshToken from "../../services/refreshToken";
import CourseCard from "../../components/CourseCard";
import { type Product } from "../../interfaces/products";
import axios from "axios";
import { Header } from "../../components";

const PurchasedCourses = () => {
  const userData = JSON.parse(localStorage.getItem("userData") ?? "");
  const authTokens = JSON.parse(localStorage.getItem("authTokens") ?? "");
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const [courses, setCourses] = useState<Product[]>([]);
  const [cachedData, setCachedData] = useState<{ courses?: Product[] }>({});
  const BASE_URL = "http://127.0.0.1:8000/course/";

  useEffect(() => {
    const today = new Date().toISOString().replace("T", " ").slice(0, 19);

    const fetchCourses = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.courses) {
        setCourses(cachedData.courses);
      } else {
        try {
          const response = await axios.get(BASE_URL, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
          const data = response.data;
          console.log(data);
          setCachedData({ courses: data.results });
          setCourses(data.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCourses();
  }, [authTokens, cachedData, userData]);

  return (
    <>
      <Header />
      <div className="mt-16">
        <h1 className="text-2xl text-center text-white mb-8">
          Lista de cursos comprados
        </h1>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <h1 className="text-2xl mt-8 text-center text-white">
            No hay cursos comprados
          </h1>
        )}
      </div>
    </>
  );
};

export default PurchasedCourses;
