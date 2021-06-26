export interface Vacation {
  vacID: number;
  vacDest: string;
  vacDesc: string;
  startDate: string;
  endDate: string;
  vacPrice: string;
  vacImage: string;
}

export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  userName: string;
  userType: number;
}

export interface VacationSatatistic {
  vacID: number;
  vacDest: string;
  followers: number;
}

export interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface BarChartData {
  labels: string[];
  datasets: DataSet[];
}
