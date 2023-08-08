import React from "react";

import { Outlet, useNavigation } from "react-router-dom";

import ProfileNavigaion from "../components/ProfileNavigation";
import Loading from "../components/Loading";

const ProfileLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <main style={{ position: "relative" }}>
        <ProfileNavigaion />
        {navigation.state === "loading" && <Loading />}
        <Outlet />
      </main>
    </>
  );
};

export default ProfileLayout;
