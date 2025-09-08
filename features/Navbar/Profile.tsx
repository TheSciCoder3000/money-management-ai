import React from "react";

const Profile = () => {
  return (
    <div className="flex gap-5">
      <div className="aspect-square w-11 rounded-md bg-gray-500"></div>
      <div>
        <h1>John Juvi De Villa</h1>
        <h2 className="text-xs text-gray-500">Basic Plan</h2>
      </div>
    </div>
  );
};

export default Profile;
