import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from "@material-ui/core";
import randomColor from "../../utils/randomColor";
import RedirectButton from "../navigation/RedirectButton";
import { roomCardStyles as useStyles } from "../../utils/makeStylers";

/**
 * Returns card item with data of room object passed.
 * @function RoomCard
 * @param {object} room - .
 * @returns {div}
 */
const RoomCard = ({ room }) => {
  const classes = useStyles();
  const memberLengthStr = `${room.members.length} member${
    room.members.length !== 1 ? "s" : ""
  }`;

  return (
    <Card className={classes.root}>
      <div>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: randomColor() }}>
              {room.name[0].toUpperCase()}
            </Avatar>
          }
          title={room.name}
          subheader={memberLengthStr}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {room.description}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.center}>
        <RedirectButton to={`rooms/${room._id}`} text={"Enter Room"} />
      </CardActions>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object,
};

export default RoomCard;
