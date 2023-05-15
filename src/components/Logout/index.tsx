import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-0 rounded-md ml-4 mt-2" onClick={handleLogout}>
      <span className="text-white">Logout</span>
    </button>
  );
};

export default Logout;