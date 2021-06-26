import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllVacations,
  fetchFollowedVacationIds,
  getVacations,
  setAdminEditVacation,
} from "../app/slices/vacationsSlice";
import { Vacation } from "../types";
import { EditVacationModal } from "./EditVacationModal";
import { VacationItem } from "./VacationItem";

export const VacationsList = () => {
  const [openEditVacationModal, setOpenEditVacationModal] = useState(false);
  const vacations = useAppSelector(getVacations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllVacations());
    dispatch(fetchFollowedVacationIds());
  }, [dispatch]);

  const handleClose = () => {
    setOpenEditVacationModal(false);
  };

  const handleOpen = (vacation: Vacation) => {
    dispatch(setAdminEditVacation(vacation));
    setOpenEditVacationModal(true);
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {vacations.map((vacation) => (
          <VacationItem
            key={vacation.vacID}
            vacation={vacation}
            handleOpenEditModalAdmin={handleOpen}
          />
        ))}
      </Grid>
      <EditVacationModal open={openEditVacationModal} onClose={handleClose} />
    </>
  );
};
