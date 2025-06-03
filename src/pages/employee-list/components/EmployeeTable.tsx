import { use, useState } from "react";
import Modal from "../../../components/modal/Modal";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { Employee } from "../../../store/employee/employee.types";
import store, { useAppDispatch } from "../../../store/store";
import { removeEmployee } from "../../../store/employee/employeeReducer";
import { formatTimeStampToDate } from "../../../helpers/format-timestamp";
import { useDeleteEmployeeMutation } from "../../../api-services/employees/employee.api";

function TableCells({ children }: { children: React.ReactNode }) {
  return <div className="table-cell">{children}</div>;
}
interface ActionButtonGroupProps {
  user: Employee;
  navigator: NavigateFunction;
  setUser: React.Dispatch<React.SetStateAction<Employee | null>>;
}
function ActionButtonGroup({
  user,
  navigator,
  setUser,
}: ActionButtonGroupProps) {
  const handleDeleteClick = (user: Employee, event: React.MouseEvent) => {
    event.stopPropagation();
    setUser(user);
    // setisModalOpen(true);
  };
  const handleEditClicked = (user: Employee, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator(`edit/${user.id}`);
  };

  return (
    <>
      <div className="action-button-group">
        <button onClick={(event) => handleDeleteClick(user, event)}>
          <img src="/assets/bin.svg" />
        </button>
        <button onClick={(event) => handleEditClicked(user, event)}>
          <img src="/assets/edit.svg" />
        </button>
      </div>
    </>
  );
}
function StatusCell({ status }: { status: string }) {
  let textColor;
  let backgroundColor;
  switch (status) {
    case "ACTIVE":
      textColor = "green";
      backgroundColor = "#D3F4BE";
      break;
    case "INACTIVE":
      textColor = "red";
      backgroundColor = "#FFBFBF";
      break;

    case "PROBATION":
      textColor = "#baab27";
      backgroundColor = "#F5ECB8";
      break;

    default:
      textColor = "white";
      backgroundColor = "gray";
  }
  // console.log(status, textColor, backgroundColor);
  return (
    <div
      style={{ color: textColor, background: backgroundColor }}
      className="status-badge"
    >
      {status}
    </div>
  );
}

export const EmployeeTable = ({ data }: { data: Employee[] }) => {
  if (!data || data.length === 0) {
    return <p>There are no employees to show </p>;
  }
  const dispatch = useAppDispatch();
  const [deleteUser, { isLoading }] = useDeleteEmployeeMutation();

  function handleRowClick(user_id: string) {
    console.log("row clicked", user_id);
    navigate(user_id.toString());
  }
  function confirmDeleteUser(user: Employee) {
    console.log("Deletinngggg", user.employeeId);

    // dispatch(removeEmployee(user));
    console.log(user.employeeId);
    deleteUser(user.id);
    setDeleteEmployee(null);
  }
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  const columnHeaders: {
    title: string;
    accessor: keyof Employee | "action";
  }[] = [
    {
      title: "Employee Name",
      accessor: "name",
    },
    {
      title: "Employee ID",
      accessor: "employeeId",
    },
    {
      title: "Joining Date",
      accessor: "dateOfJoining",
    },
    {
      title: "Role",
      accessor: "role",
    },
    {
      title: "Status",
      accessor: "status",
    },
    {
      title: "Experience",
      accessor: "experience",
    },
    {
      title: "Action",
      accessor: "action",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="table-body">
      <div className="header-row">
        {columnHeaders.map((column) => {
          return (
            <TableCells>
              <p>{column.title}</p>
            </TableCells>
          );
        })}
      </div>

      {data.map((user) => {
        return (
          <div className="table-row" onClick={() => handleRowClick(user.id)}>
            {columnHeaders.map((column) => {
              if (column.accessor === "status")
                return (
                  <TableCells>
                    <StatusCell status={user[column.accessor]} />
                  </TableCells>
                );
              else if (column.accessor === "action")
                return (
                  <TableCells>
                    <ActionButtonGroup
                      setUser={setDeleteEmployee}
                      user={user}
                      navigator={navigate}
                    />
                  </TableCells>
                );
              else if (column.accessor === "dateOfJoining")
                //@ts-ignore
                return (
                  <TableCells>
                    {formatTimeStampToDate(user.dateOfJoining)}
                  </TableCells>
                );

              return (
                <TableCells>
                  <div>
                    {user[column.accessor] +
                      `${column.accessor === "experience" ? " years" : ""}`}
                  </div>
                </TableCells>
              );
            })}
          </div>
        );
      })}
      {deleteEmployee && (
        <Modal
          modalHeader="Delete Employee"
          onClose={() => setDeleteEmployee(null)}
          // setisModalOpen={setisModalOpen}
          modalContent={
            <div className="delete-user-modal">
              <p>Are you sure you want to delete this employee ?</p>
              <div className="button-group">
                <button
                  id="cancel-button"
                  onClick={() => setDeleteEmployee(null)}
                >
                  Cancel
                </button>
                <button
                  id="delete-button"
                  onClick={() => confirmDeleteUser(deleteEmployee)}
                >
                  Delete
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
