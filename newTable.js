import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditableTable from "./EditableTable_1";
import {
  fetchData,
  deleteData,
  startEdit,
  updateData,
  cancelEdit,
  addData,
} from "../store/tableSlice";

const Table = () => {
  const dispatch = useDispatch();
  const { data, editRowId, status, error } = useSelector(
    (state) => state.table
  );
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  const handleButtonClick = (action, row) => {
    switch (action) {
      case "edit":
        dispatch(startEdit(row.id));
        setEditData(row);
        break;
      case "save":
        dispatch(updateData({ ...row, ...editData }));
        break;
      case "cancel":
        dispatch(cancelEdit());
        break;
      case "delete":
        dispatch(deleteData(row.id));
        break;
      case "add":
        const newRow = { id: data.length + 1, name: "", age: "" }; // Customize as needed
        dispatch(addData(newRow));
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            {editRowId === row.original.id ? (
              <>
                <button onClick={() => handleButtonClick("save", row.original)}>
                  Save
                </button>
                <button
                  onClick={() => handleButtonClick("cancel", row.original)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleButtonClick("edit", row.original)}>
                  Edit
                </button>
                <button
                  onClick={() => handleButtonClick("delete", row.original)}
                >
                  Delete
                </button>
              </>
            )}
          </>
        ),
      },
    ],
    [editRowId, handleButtonClick, editData, dispatch]
  );

  return (
    <div>
      <button onClick={() => handleButtonClick("add")}>Add New Row</button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <EditableTable
          data={data}
          columns={columns}
          editRowId={editRowId}
          editData={editData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default Table;
