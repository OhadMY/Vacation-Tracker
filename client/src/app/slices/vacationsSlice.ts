import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Vacation } from "../../types";
import { axios } from "../../utils";
import { RootState } from "../store";

export interface VacationsState {
  list: Vacation[];
  adminEditVacation: Vacation | null;
  followedIds: number[];
  loading: boolean;
  followedVacs: number[];
}

const initialState: VacationsState = {
  list: [],
  adminEditVacation: null,
  followedIds: [],
  loading: false,
  followedVacs: [],
};

export const fetchAllVacations = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axios.get<Vacation[]>("/vacations");
    return response.data;
  }
);

export const fetchFollowedVacationIds = createAsyncThunk(
  "users/fetchFollowedVacationIds",
  async () => {
    const response = await axios.get<number[]>("/followed/userfollows");
    return response.data;
  }
);

export const deleteVacation = createAsyncThunk(
  "vacations/deletevacation",
  async ({ vacID }: { vacID: number }) => {
    if (vacID) {
      await axios.delete<number>("/vacations/deletevacation", {
        data: { vacID },
      });
    }
    return { vacID };
  }
);

export const newVacation = createAsyncThunk(
  "vacations/newvacation",
  async (vacationData: Omit<Vacation, "vacID">) => {
    const response = await axios.post<Vacation>("vacations/newvacation", {
      ...vacationData,
    });
    return response.data;
  }
);

export const followVacation = createAsyncThunk(
  "users/followVacation",
  async ({ vacID, followed }: { vacID: number; followed: boolean }) => {
    if (!followed) {
      await axios.post<number>("/followed/newfollow", {
        vacID,
      });
    } else {
      await axios.delete<number>("/followed/deletefollow", {
        data: { vacID },
      });
    }
    return { vacID, followed: !followed };
  }
);

export const editVacation = createAsyncThunk(
  "vacations/editvacation",
  async ({
    vacID,
    vacDest,
    vacDesc,
    startDate,
    endDate,
    vacPrice,
    vacImage,
  }: Vacation) => {
    if (
      vacID &&
      vacDest &&
      vacDesc &&
      startDate &&
      endDate &&
      vacPrice &&
      vacImage
    ) {
      const response = await axios.put<Vacation>(
        `vacations/editvacation/${vacID}`,
        {
          vacDest,
          vacDesc,
          startDate,
          endDate,
          vacPrice,
          vacImage,
        }
      );

      return response.data;
    }
    return {
      vacID,
      vacDest,
      vacDesc,
      startDate,
      endDate,
      vacPrice,
      vacImage,
    };
  }
);

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    setAdminEditVacation: (state, action) => {
      state.adminEditVacation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVacations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllVacations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
    builder.addCase(fetchFollowedVacationIds.fulfilled, (state, action) => {
      state.followedIds = action.payload;
      state.loading = false;
    });
    builder.addCase(followVacation.fulfilled, (state, action) => {
      if (action.payload.followed) state.followedIds.push(action.payload.vacID);
      else {
        state.followedIds = state.followedIds.filter(
          (id) => id !== action.payload.vacID
        );
      }
    });
    builder.addCase(deleteVacation.fulfilled, (state, action) => {
      state.list = state.list.filter(
        (vac) => vac.vacID !== action.payload.vacID
      );
    });
    builder.addCase(editVacation.fulfilled, (state, action) => {
      state.list = state.list.map((vac) => {
        if (vac.vacID === action.payload.vacID) {
          return action.payload;
        } else {
          return vac;
        }
      });
    });
    builder.addCase(newVacation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.list.push(action.payload);
    });
  },
});

export const { setAdminEditVacation } = vacationsSlice.actions;

export const followedSelector = (state: RootState, vacation: Vacation) => {
  let followed = false;
  state.vacations.followedIds.forEach((vacationId) => {
    if (vacation.vacID === vacationId) {
      followed = true;
    }
  });
  return followed;
};

export const getVacations = (state: RootState): Vacation[] => {
  const followedVacations = state.vacations.list.filter(({ vacID }) =>
    state.vacations.followedIds.includes(vacID)
  );

  let vacations: Vacation[] = [...followedVacations];

  const nonFollowedVacations = state.vacations.list.filter(
    ({ vacID }) => !state.vacations.followedIds.includes(vacID)
  );
  vacations = [...vacations, ...nonFollowedVacations];

  return vacations;
};
