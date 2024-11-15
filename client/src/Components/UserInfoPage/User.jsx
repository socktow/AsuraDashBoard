import React from 'react';
import UserInfo from './UserInfo';
import UserBalance from './UserBalance';
import UserTrans from './UserTrans';
import UserPayment from './UserPayment';

const User = () => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 px-4 py-4 leading-10">
      <div className="p-2 w-full bg-white rounded-3xl row-span-3">
        <UserInfo />
      </div>
      <div className="p-4 w-full bg-white rounded-xl col-span-2">
        <UserBalance />
      </div>
      <div className="p-4 w-full bg-white rounded-xl row-span-2 col-span-1">
        <UserTrans />
      </div>
      <div className="p-4 w-full bg-white rounded-xl row-span-2 col-span-1">
        <UserPayment />
      </div>
    </div>
  );
}

export default User;
