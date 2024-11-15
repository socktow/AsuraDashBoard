import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo, fetchUserInfoById } from "../Redux/UserSlice";  // Cập nhật import

const Testpage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const userById = useSelector((state) => state.user.userById); 

  useEffect(() => {
    dispatch(fetchUserInfo()).then((action) => {
      const userId = action.payload.id;
      if (userId) {
        dispatch(fetchUserInfoById(userId));
      }
    });
  }, [dispatch]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    fontFamily: "'Arial', sans-serif",
  };

  const cardStyle = {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
  };

  const titleStyle = {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  };

  const loadingStyle = {
    fontSize: "18px",
    color: "#999",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {userInfo ? (
          <>
            <p style={titleStyle}>
              Xin chào, {userInfo.username}! <br />
              <span style={{ fontSize: "16px", color: "red" }}>
                ID: {userInfo.id}
              </span>
              <br />
              <span style={{ fontSize: "16px", color: "red" }}>
                Avatar ID: {userInfo.avatarid}
                <br />
                Banner ID: {userInfo.bannerid}
              </span>
            </p>
          </>
        ) : (
          <p style={loadingStyle}>Loading user information...</p>
        )}

        <br />
        {userById ? (
          <>
            <p style={titleStyle}>
              <span>Thông tin từ userById:</span>
              <br />
              <span>ID: {userById.id}</span>
              <br />
              <span>Total XP: {userById.totalxp}</span>
              <br />
              <span>Balance: {userById.balance}</span>
            </p>
          </>
        ) : (
          <p style={loadingStyle}>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Testpage;
