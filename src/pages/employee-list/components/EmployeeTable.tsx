import { useState } from "react";
import type { UserDetails } from "../../../types/employee.type";
import Modal from "../../../components/modal/Modal";
import { useNavigate, type NavigateFunction } from "react-router-dom";
function TableCells({ children }: { children: React.ReactNode }) {
  return <div className="table-cell">{children}</div>;
}
interface ActionButtonGroupProps {
  user_id: string;
  navigator: NavigateFunction;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}
function ActionButtonGroup({
  user_id,
  navigator,
  setUser,
}: ActionButtonGroupProps) {
  const handleDeleteClick = (user: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setUser(user);
    // setisModalOpen(true);
  };
  const handleEditClicked = (user_id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator(`edit/${user_id}`);
  };

  return (
    <>
      <div className="action-button-group">
        <button onClick={(event) => handleDeleteClick(user_id, event)}>
          <img src="/assets/bin.svg" />
        </button>
        <button onClick={(event) => handleEditClicked(user_id, event)}>
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

export const EmployeeTable = ({ data }: { data: UserDetails[] }) => {
  function handleRowClick() {
    navigate("1");
  }
  function confirmDeleteUser(user_id: string) {
    console.log("Deletinngggg", user_id);
    setDeleteEmployee(null);
  }
  const [deleteEmployee, setDeleteEmployee] = useState<string | null>(null);
  const columnHeaders: {
    title: string;
    accessor: keyof UserDetails | "action";
  }[] = [
    {
      title: "Employee Name",
      accessor: "employee_name",
    },
    {
      title: "Employee ID",
      accessor: "employee_id",
    },
    {
      title: "Joining Date",
      accessor: "joining_date",
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
          <div className="table-row" onClick={handleRowClick}>
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
                      user_id={user.employee_id}
                      navigator={navigate}
                    />
                  </TableCells>
                );
              else if (column.accessor === "joining_date")
                return (
                  <TableCells>{user.joining_date.split("T")[0]}</TableCells>
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
