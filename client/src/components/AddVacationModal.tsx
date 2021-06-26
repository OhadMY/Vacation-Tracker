import React, { FC } from "react";
import { Modal } from "@material-ui/core";
import { VacationForm } from "./VacationForm";
import { useAppDispatch } from "../app/hooks";
import { newVacation } from "../app/slices/vacationsSlice";
import { Vacation } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddVacationModal: FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleAddVacation = async (v: Omit<Vacation, "vacID">) => {
    await dispatch(
      newVacation({
        vacDest: v.vacDest,
        vacDesc: v.vacDesc,
        startDate: v.startDate,
        endDate: v.endDate,
        vacPrice: v.vacPrice,
        vacImage: v.vacImage,
      })
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <VacationForm add={handleAddVacation} />
      </>
    </Modal>
  );
};
