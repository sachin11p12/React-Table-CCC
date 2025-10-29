import React, { useState } from "react";
import { useTable } from "react-table"; // we will use useSortBy for sorting
import { countriesData } from "../data/Countries";


const TableComponent = () => {
  const data = React.useMemo(() => countriesData, []);

  const columns = React.useMemo(
    () => [
      { Header: "Country", accessor: "country" },
      { Header: "Currency", accessor: "currency" },
      { Header: "Capital", accessor: "capital" },
    ],
    []
  );

//   const tableInstance = useState({columns, data}, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">React Table</h1>
      <table
        {...getTableProps()}
        className="min-w-full border border-gray-300 rounded-md shadow-md"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left border-b font-semibold"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
