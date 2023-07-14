import React from "react";

import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
  // return <ProfileContent />;
  return <div>this is the profile page</div>;
};

export default ProfilePage;

export const loader = async () => {
  const response = await fetch("http://localhost:5000/api/v1/gifts");
  const responseData = await response.json();

  return responseData;
};
