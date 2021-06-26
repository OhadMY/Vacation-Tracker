import React, { FC } from "react";
import { Modal } from "@material-ui/core";
import { VacationForm } from "./VacationForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editVacation } from "../app/slices/vacationsSlice";
import { Vacation } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const EditVacationModal: FC<Props> = ({ open, onClose }) => {
  const vacation = useAppSelector((state) => state.vacations.adminEditVacation);
  const dispatch = useAppDispatch();

  const handleEditVacation = async (v: Vacation) => {
    if (vacation) {
      await dispatch(
        editVacation({
          vacID: v.vacID,
          vacDest: v.vacDest,
          vacDesc: v.vacDesc,
          startDate: v.startDate,
          endDate: v.endDate,
          vacPrice: v.vacPrice,
          vacImage: v.vacImage,
        })
      );
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <VacationForm vacation={vacation} edit={handleEditVacation} />
      </>
    </Modal>
  );
};
