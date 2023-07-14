import React, { useState } from "react";

import { useLoaderData } from "react-router-dom";

const ProfileContent = () => {
  const [gifts, setGifts] = useState(useLoaderData());

  return (
    <>
      <div>this is the homepage</div>
      {gifts && (
        <ul>
          {gifts.map((gift) => (
            <li key={gift._id}>{gift.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProfileContent;
