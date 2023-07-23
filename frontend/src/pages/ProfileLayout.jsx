import React from "react";

import { Outlet } from "react-router-dom";

import ProfileNavigaion from "../components/ProfileNavigation";

const ProfileLayout = () => {
  return (
    <>
      <ProfileNavigaion />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProfileLayout;
