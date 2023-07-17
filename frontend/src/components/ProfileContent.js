import React, { useState } from "react";

import { useLoaderData } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AddIconButton from "./AddIconButton";

import classes from "./ProfileContent.module.css";

const ProfileContent = () => {
  const [gifts, setGifts] = useState(useLoaderData());

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes["add-icon"]}>
          <AddIconButton />
        </div>
        {gifts && (
          <ul className={classes.list}>
            {gifts.map((gift) => (
              <Card
                key={gift._id}
                sx={{ width: "40rem" }}
                className={classes.gift}
              >
                <CardActionArea>
                  {gift.photo && (
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="gift image"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {gift.title}
                    </Typography>
                    {gift.description && (
                      <Typography variant="body2" color="text.secondary">
                        {gift.description}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <EditIcon />
                  </Button>
                  <Button size="small" color="error">
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
