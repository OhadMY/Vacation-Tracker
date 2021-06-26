import { Container } from "@material-ui/core";
// import React, { useState, useEffect } from "react";
// import { useAppDispatch } from "../app/hooks";
// import { logout } from "../app/slices/userSlice";
// import { fetchAllVacations } from "../app/slices/vacationsSlice";
import { VacationsList } from "../components/VacationsList";

export const Home = () => {
  return (
    <Container>
      <VacationsList />
    </Container>
  );
};
