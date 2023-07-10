import React, { useState, useEffect } from "react";

const ProfileContent = () => {
  const [gifts, setGifts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/v1/gifts");
      const responseData = await response.json();
      setGifts(responseData.data);
    };

    fetchData();
  }, []);

  console.log(gifts);

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
