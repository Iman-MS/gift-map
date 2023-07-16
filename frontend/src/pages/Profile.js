import React from "react";

import ProfileNavigaion from "../components/ProfileNavigation";
// import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
  return (
    <>
      <ProfileNavigaion />
      {/* <ProfileContent /> */}
    </>
  );
};

export default ProfilePage;

export const loader = async () => {
  const response = await fetch(`/api/v1/gifts`);
  const responseData = await response.json();

  return responseData.data;
};
