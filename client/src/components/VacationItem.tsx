import {
  Box,
  createStyles,
  Grid,
  Theme,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isAdmin } from "../app/slices/userSlice";
import {
  deleteVacation,
  followedSelector,
  followVacation,
} from "../app/slices/vacationsSlice";
import { Vacation } from "../types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: "100%",
    },
    media: {
      height: 300,
    },
    cardActions: {
      paddingLeft: "15px",
      flexDirection: "column",
      alignItems: "flex-start",
      flexGrow: 1,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
  })
);

interface Props {
  vacation: Vacation;
  handleOpenEditModalAdmin: (vacation: Vacation) => void;
}

export const VacationItem: FC<Props> = ({
  vacation,
  handleOpenEditModalAdmin,
}) => {
  const classes = useStyles();

  const admin = useAppSelector(isAdmin);
  const followed = useAppSelector((state) => {
    if (!admin) return followedSelector(state, vacation);
    else return false;
  });

  const dispatch = useAppDispatch();

  const handleFollowVacation = () => {
    dispatch(followVacation({ vacID: vacation.vacID, followed }));
  };

  const handleDeleteVacation = () => {
    dispatch(deleteVacation({ vacID: vacation.vacID }));
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={vacation.vacImage}
            title={vacation.vacDest}
          />
          <CardContent>
            <Box>
              <Typography gutterBottom variant="h4" component="h2">
                {vacation.vacDest}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                {vacation.vacDesc}
              </Typography>
            </Box>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Box
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                flexGrow: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Start Date: {moment(vacation.startDate).format("LL")}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                End Date: {moment(vacation.endDate).format("LL")}
              </Typography>
              <Box style={{ marginTop: 10 }}>
                <Typography variant="body1" color="textSecondary" component="p">
                  Price: ${vacation.vacPrice}
                </Typography>
              </Box>
            </Box>
            {!admin && (
              <Button
                size="small"
                color="primary"
                onClick={handleFollowVacation}
                style={{ width: "100%" }}
              >
                {followed ? (
                  <Tooltip title="Follow Vacation">
                    <FavoriteIcon></FavoriteIcon>
                  </Tooltip>
                ) : (
                  <Tooltip title="Unfollow Vacation">
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </Tooltip>
                )}
              </Button>
            )}
          </CardActions>
          {admin && (
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <Button
                size="small"
                color="primary"
                onClick={() => handleOpenEditModalAdmin(vacation)}
              >
                <Tooltip title="Edit Vacation">
                  <EditIcon></EditIcon>
                </Tooltip>
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleDeleteVacation}
              >
                <Tooltip title="Delete Vacation">
                  <DeleteIcon></DeleteIcon>
                </Tooltip>
              </Button>
            </Box>
          )}
        </Card>
      </Grid>
    </>
  );
};
