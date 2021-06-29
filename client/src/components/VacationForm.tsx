import MomentUtils from "@date-io/moment";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import moment from "moment";
import React, { FC, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Vacation } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  vacation?: Vacation | null;
  edit?: (v: Vacation) => void;
  add?: (v: Omit<Vacation, "vacID">) => void;
}

export const VacationForm: FC<Props> = ({ vacation, edit, add }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [currentStartDate, setCurrentStartDate] = React.useState<string>(
    moment(vacation ? vacation.startDate : undefined).format("YYYY-MM-DD")
  );
  const [currentEndDate, setCurrentEndDate] = React.useState<string>(
    moment(vacation ? vacation.endDate : undefined).format("YYYY-MM-DD")
  );
  const [currentDest, setCurrentDest] = useState(
    vacation ? vacation.vacDest : ""
  );
  const [currentDesc, setCurrentDesc] = useState(
    vacation ? vacation.vacDesc : ""
  );
  const [currentPrice, setCurrentPrice] = useState(
    vacation ? vacation.vacPrice : ""
  );
  const [currentImage, setCurrentImage] = useState(
    vacation ? vacation.vacImage : ""
  );

  const handleStartDate = (date: MaterialUiPickersDate) => {
    if (date) setCurrentStartDate(date.format("YYYY-MM-DD"));
  };
  const handleEndDate = (date: MaterialUiPickersDate) => {
    if (date) setCurrentEndDate(date.format("YYYY-MM-DD"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper} style={modalStyle}>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Edit Vacation
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Vacation Image"
                value={currentImage}
                onChange={(e) => setCurrentImage(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Vacation Destination"
                value={currentDest}
                onChange={(e) => setCurrentDest(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Vacation Description"
                value={currentDesc}
                onChange={(e) => setCurrentDesc(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Vacation Price"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  style={{ width: "100%" }}
                  disablePast
                  margin="normal"
                  id="date-picker-dialog"
                  label="Start Date"
                  format="DD/MM/yyyy"
                  value={currentStartDate}
                  onChange={handleStartDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputProps={{ readOnly: true }}
                  maxDate={currentEndDate}
                />
                <KeyboardDatePicker
                  style={{ width: "100%" }}
                  disablePast
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  format="DD/MM/yyyy"
                  value={currentEndDate}
                  onChange={handleEndDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputProps={{ readOnly: true }}
                  minDate={currentStartDate}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Button
              style={{ width: "100%" }}
              color="primary"
              variant="contained"
              onClick={() => {
                if (vacation && edit) {
                  edit({
                    vacID: vacation.vacID,
                    vacDest: currentDest,
                    vacDesc: currentDesc,
                    startDate: currentStartDate,
                    endDate: currentEndDate,
                    vacPrice: currentPrice,
                    vacImage: currentImage,
                  });
                } else if (add) {
                  add({
                    vacDest: currentDest,
                    vacDesc: currentDesc,
                    startDate: currentStartDate,
                    endDate: currentEndDate,
                    vacPrice: currentPrice,
                    vacImage: currentImage,
                  });
                }
                if (location.pathname !== "/") {
                  history.push("/");
                }
              }}
            >
              SUBMIT
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
