/* eslint-disable react/prop-types */
// TableComponent.js
import React, { useMemo } from "react";
import { Typography } from "@material-tailwind/react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

const TableComponent = ({ columns, data }) => {
  
const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          hiddenColumns: [
            "biddingTimerId",
            "dealer_id",
            "salesPersonId",
            "brandDataId",
            "beadingCarId",
            "carId",
            "userId",
            "bidCarId",
            "biddingTimerStatus",
            "userFormId"
          ], //use property option, in columns define id name "id"
        },
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

  // console.log("headerGroups",headerGroups);
  // console.log("headerGroups",page?.map((headerGroup, index) => (index)));
  // Memoize the header rendering
  const renderHeader = useMemo(() => {
    return headerGroups.map((headerGroup, index) => (
      <tr key={index} {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, index) => (
          <th
            key={index}
            {...column.getHeaderProps(column.getSortByToggleProps())}
            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
          >
            {column.render("Header")}
            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
          </th>
        ))}
      </tr>
    ));
  }, [headerGroups]);

  // Memoize the row rendering
  const renderRows = useMemo(() => {
    return page.map((row, index) => {
      const isLast = data?.length - 1 === index;
      const classes = isLast ? "p-1" : "p-3 border-b border-blue-gray-50";
      prepareRow(row);
      return (
        <tr {...row.getRowProps()} key={index}>
          {row.cells.map((cell, i) => (
            <td key={i} {...cell.getCellProps()} className={classes}>
              <Typography color="blue-gray" className="font-normal text-lg">
                {cell.render("Cell")}
              </Typography>
            </td>
          ))}
        </tr>
      );
    });
  }, [page, prepareRow, data]);

  if (!data) return null;

  return (
    <>
      <div className="h-full w-full">
        <table {...getTableProps()} className="w-full table-auto text-center">
          <thead>{renderHeader}</thead>
          <tbody {...getTableBodyProps()}>{renderRows}</tbody>
        </table>
      </div>
    </>
  );
};

// Add a display name for the memoized component
const MemoizedTableComponent = React.memo(TableComponent);
MemoizedTableComponent.displayName = "TableComponent";

export default MemoizedTableComponent;
