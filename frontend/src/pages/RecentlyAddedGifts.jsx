import React from "react";

import ProfileContent from "../components/ProfileContent";

const RecentlyAddedGiftsPage = () => {
  return <ProfileContent isRecentlyAddedGiftsPage={true} />;
};

export default RecentlyAddedGiftsPage;

export const loader = async () => {
  const response = await fetch("/api/v1/gifts/all?limit=15");
  const responseData = await response.json();

  return responseData.data;
};
