import React from "react";

import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
  return <ProfileContent />;
};

export default ProfilePage;

export const loader = async () => {
  const response = await fetch(`/api/v1/gifts`);
  const responseData = await response.json();

  return responseData.data;
};
