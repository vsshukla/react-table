import React from "react";
import { useTable } from "react-table";

const EditableTable = ({
  columns,
  data,
  editRowId,
  editData,
  handleChange,
}) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (editRowId === row.original.id && cell.column.id !== "id") {
                  return (
                    <td {...cell.getCellProps()}>
                      <input
                        type="text"
                        name={cell.column.id}
                        value={editData[cell.column.id]}
                        onChange={handleChange}
                      />
                    </td>
                  );
                }
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EditableTable;
