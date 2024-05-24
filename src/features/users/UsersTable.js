import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import { fetchUsers, editUser, deleteUser } from "./usersSlice";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);

  const [editingRowId, setEditingRowId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => {
          return editingRowId === row.original.id ? (
            <input
              value={editedUser.name || row.original.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          ) : (
            row.original.name
          );
        },
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row }) => {
          return editingRowId === row.original.id ? (
            <input
              value={editedUser.username || row.original.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
            />
          ) : (
            row.original.username
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ row }) => {
          return editingRowId === row.original.id ? (
            <input
              value={editedUser.email || row.original.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          ) : (
            row.original.email
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            {editingRowId === row.original.id ? (
              <>
                <button onClick={() => handleSave(row.original.id)}>
                  Save
                </button>
                <button onClick={() => setEditingRowId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(row.original)}>Edit</button>
                <button onClick={() => handleDelete(row.original.id)}>
                  Delete
                </button>
              </>
            )}
          </>
        ),
      },
    ],
    [editingRowId, editedUser]
  );

  const handleEdit = (user) => {
    setEditingRowId(user.id);
    setEditedUser(user);
  };

  const handleSave = (id) => {
    dispatch(editUser({ id, user: editedUser }));
    setEditingRowId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: users,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  if (userStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (userStatus === "failed") {
    return <div>Error loading users</div>;
  }

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default UsersTable;
