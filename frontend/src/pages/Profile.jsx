import React from "react";

import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
  return (
    <>
      <ProfileContent />
    </>
  );
};

export default ProfilePage;

export const loader = async ({ params }) => {
  let response;

  if (params.userID) {
    response = await fetch(`/api/v1/users/${params.userID}/gifts/all`);
  } else {
    response = await fetch(`/api/v1/gifts`);
  }

  const responseData = await response.json();

  return responseData.data;
};
