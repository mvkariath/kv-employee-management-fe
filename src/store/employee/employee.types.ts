export interface Address {
  houseNo: number;
  line1: string;
  line2: string;
  pincode: number;
}

export const EmployeeRole = {
  UI: "UI",
  UX: "UX",
  DEVELOPER: "DEVELOPER",
  HR: "HR",
} as const;

export type Role = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export const EmployeeStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PROBATION: "PROBATION",
} as const;

export type Status = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

export interface Employee {
  id: string;
  employeeId: string;
  email: string;
  name: string;
  age: number;
  address: Address;
  password: string;
  role: Role;
  dateOfJoining: string;
  experience: number;
  status: Status;
  department_id: number | string;
}

export const EMPLOYEE_ACTION_TYPES = {
  DELETE: "employee/DELETE",
  UPDATE: "employee/UPDATE",
  CREATE: "employee/CREATE",
} as const;

export type EmployeeActionTypes =
  (typeof EMPLOYEE_ACTION_TYPES)[keyof typeof EMPLOYEE_ACTION_TYPES];

export interface EmployeeState {
  employees: Employee[];
}

export interface DeleteEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.DELETE;
  payload: string; // employee id
}

export interface UpdateEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.UPDATE;
  payload: Employee;
}
export interface CreateEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.CREATE;
  payload: Employee;
}
export type EmployeeAction =
  | DeleteEmployeeAction
  | UpdateEmployeeAction
  | CreateEmployeeAction;
