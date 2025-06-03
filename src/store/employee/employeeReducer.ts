// import { act } from "react";
// import {
//   EMPLOYEE_ACTION_TYPES,
//   type Employee,
//   type EmployeeAction,
//   type EmployeeState,
// } from "./employee.types";
// const initialState: EmployeeState = { employees: [] };
// function employeeReducer(
//   state: EmployeeState = initialState,
//   action: EmployeeAction
// ) {
//   switch (action.type) {
//     case EMPLOYEE_ACTION_TYPES.DELETE:
//       return {
//         ...state,
//         employees: state.employees.filter(
//           (employee) => employee.employeeId !== action.payload
//         ),
//       };
//     case EMPLOYEE_ACTION_TYPES.UPDATE:
//       return {
//         ...state,
//         employees: state.employees.map((employee) =>
//           employee.employeeId === action.payload.employeeId
//             ? action.payload
//             : employee
//         ),
//       };
//     case EMPLOYEE_ACTION_TYPES.CREATE:
//       const new_employee_list = [...state.employees];
//       new_employee_list.push(action.payload);
//       return {
//         ...state,
//         employees: new_employee_list,
//       };
//     //return state;
//     default:
//       return state;
//   }
// }
// export default employeeReducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee, EmployeeState } from "./employee.types";

const initialState: EmployeeState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = state.employees.filter(
        (employee) => employee.employeeId !== action.payload.employeeId
      );
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
