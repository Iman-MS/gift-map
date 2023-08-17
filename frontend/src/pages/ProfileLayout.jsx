import React from "react";

import { Outlet, useNavigation } from "react-router-dom";

import ProfileNavigation from "../components/ProfileNavigation";
import Loading from "../components/Loading";

const ProfileLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <main
        style={{
          position: "relative",
          backgroundColor: "#F4EDFD",
          minHeight: "100vh",
        }}
      >
        <ProfileNavigation />
        {navigation.state === "loading" && <Loading />}
        <Outlet />
      </main>
    </>
  );
};

export default ProfileLayout;
