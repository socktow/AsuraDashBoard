import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfo from "../Components/UserInfoPage/UserInfo";
import { fetchUserInfo } from "../Redux/UserSlice";
import { FaDiscord } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("discord_token", token);
      urlParams.delete("token");
      window.history.replaceState(null, null, window.location.pathname);
      dispatch(fetchUserInfo());
      navigate("/user");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("discord_token");
    if (token && !user) {
      dispatch(fetchUserInfo());
      navigate("/user");
    }
  }, [dispatch, navigate, user]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
        {status === "loading" && (
          <span className="text-gray-300 animate-pulse">Loading...</span>
        )}
        {status === "failed" && (
          <span className="text-red-500 animate-bounce">Error fetching user data.</span>
        )}
        {user ? (
          <UserInfo user={user} />
        ) : (
          <span className="text-white text-lg">Not logged in.</span>
        )}

        {!user && (
          <a
            className="flex items-center py-3 px-6 mt-6 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 text-white font-semibold text-lg transition-transform transform hover:scale-105 shadow-lg"
            href="http://localhost:4000/auth/discord/login"
          >
            <FaDiscord className="mr-3 text-2xl" />
            <span>Sign in with Discord</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default Login;
