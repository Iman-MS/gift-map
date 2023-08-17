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
  if (params.userID) {
    const userResponse = await fetch(`/api/v1/users/${params.userID}`);
    const userResponseData = await userResponse.json();

    const giftsResponse = await fetch(
      `/api/v1/users/${params.userID}/gifts/all`
    );
    const giftsResponseData = await giftsResponse.json();

    return { user: userResponseData.data, gifts: giftsResponseData.data };
  } else {
    const giftsResponse = await fetch(`/api/v1/gifts`);
    const giftsResponseData = await giftsResponse.json();

    return { gifts: giftsResponseData.data };
  }
};
