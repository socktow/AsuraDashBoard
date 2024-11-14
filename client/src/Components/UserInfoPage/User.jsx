import React from 'react'
import UserInfo from './UserInfo'

const User = () => {
  return (
    <div className="w-full  bg-gray-100">
      <div className="flex w-full h-full">
        <div className="w-1/ bg-white border-r border-gray-300 p-4">
          <UserInfo />
        </div>
        <div className="w-1/2 bg-white border-r border-gray-300 p-4">
          Page 2
        </div>
        <div className="w-1/2 bg-white p-4">
          Page 3
        </div>
      </div>
    </div>
  )
}

export default User;
