import Logout from "@/features/Settings/Logout";
import React from "react";

const Settings = () => {
  return (
    <div className="p-7">
      <h1 className="mb-8 text-4xl">Settings</h1>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Settings;
