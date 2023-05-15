import React from "react";

const CourseCard = ({ course }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex gap-4 drop-shadow-lg mt-2 mx-64 mb-4">
      {/* Icon */}
      <div className="w-[10%] flex items-center justify-center">
        <img src={course.image} alt="portal-logo" className="rounded-md" />
      </div>
      {/* Contenido */}
      <div className="w-[50%]">
        <h3 className="text-lg flex items-center gap-4 mb-2">
          {course.name}{" "}
          <span className="text-xs px-1 py-2 bg-purple-100 text-purple-600 font-bold rounded-md">
            {course.type}
          </span>
          <span className="text-xs px-1 py-2 bg-green-100 text-green-600 font-bold rounded-md">
            <p>$ {course.price}</p>
          </span>
        </h3>
        <p className="text-gray-500 text-xs">{course.product_code}</p>
      </div>
      <div className="w-[40%]">
        <p className="text-blue-400 text-xs">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
