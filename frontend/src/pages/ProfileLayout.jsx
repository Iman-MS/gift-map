import React from "react";

import { Outlet, useNavigation } from "react-router-dom";

import ProfileNavigation from "../components/ProfileNavigation";
import Loading from "../components/Loading";

const ProfileLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <ProfileNavigation />
      <main>
        {/* {navigation.state === "loading" && <Loading />} */}
        {/* {true && <Loading />} */}
        <Outlet />
      </main>
    </>
  );
};

export default ProfileLayout;
