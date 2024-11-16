import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import UserBalance from "./UserBalance";
import UserTrans from "./UserTrans";
import UserPayment from "./UserPayment";
import { useDispatch } from "react-redux";
import { fetchUserInfo, fetchUserInfoById } from "../../Redux/UserSlice";

const User = ({ prods }) => {
  const dispatch = useDispatch();
  const userInfo = prods?.userInfo;

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfo()).then((action) => {
        const userId = action?.payload?.id;
        if (userId) {
          dispatch(fetchUserInfoById(userId));
        }
      });
    }
  }, [dispatch, userInfo]);

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 px-4 py-4 leading-10">
      <div className="p-2 w-full bg-white rounded-3xl row-span-3">
        <UserInfo prods={prods} />
      </div>
      <div className="p-4 w-full bg-white rounded-xl col-span-2">
        <UserBalance prods={prods} />
      </div>
      <div className="p-4 w-full bg-white rounded-xl row-span-2 col-span-1">
        <UserTrans prods={prods} />
      </div>
      <div className="p-4 w-full bg-white rounded-xl row-span-2 col-span-1">
        <UserPayment />
      </div>
    </div>
  );
};

export default User;
