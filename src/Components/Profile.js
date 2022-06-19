import * as React from "react";
import Card from "@mui/material/Card";
import pic from "../static/pic.jpg";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

export default function ProfileCard() {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardMedia
        component="img"
        height="240"
        width="140"
        image={pic}
        alt="anuska"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Anuska Sthapit
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hi! I am an aspiring web developer and someone who loves to learn new
          things.{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}
