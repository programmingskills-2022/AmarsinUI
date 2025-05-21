import { TableBody, TableCell, TableRow } from "@mui/material";

import { convertToFarsiDigits } from "../../utilities/general";
import { useState } from "react";
import useTable, { HeadCell, HeaderGroup } from "../../hooks/useTable";

type TableProps<T> = {
  data: T[];
  headCells: HeadCell<T>[];
  headerGroups?: HeaderGroup[];
  resetPageSignal: string | undefined;
};

export function Table<T>({
  data,
  headCells,
  headerGroups,
  resetPageSignal,
}: TableProps<T>) {
  const [filterFn] = useState<{
    fn: (items: T[]) => T[];
  }>({
    fn: (items) => items,
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    isMobile,
    mobileMainColumns,
    mobileRestColumns,
  } = useTable<T>(
    data,
    headCells,
    headerGroups ?? [],
    filterFn,
    resetPageSignal
  );
  return (
    <div style={{ height: "70vh", overflowY: "auto" }}>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, idx) => (
            <TableRow key={idx}>
              {(isMobile ? mobileMainColumns : headCells).map(
                (cell: HeadCell<T>) => {
                  let displayValue;
                  if (cell.id === "index") {
                    displayValue = idx + 1; // 1-based row number
                  } else {
                    const value = item[cell.id];
                    displayValue =
                      cell.isNumber && value !== undefined && value !== null
                        ? convertToFarsiDigits(
                            value as string | number | null | undefined
                          )
                        : value;
                  }
                  return (
                    <TableCell
                      key={String(cell.id)}
                      className={isMobile ? "text-xs" : ""}
                    >
                      {displayValue !== undefined && displayValue !== null
                        ? String(displayValue)
                        : ""}
                    </TableCell>
                  );
                }
              )}
              {isMobile && mobileRestColumns.length > 0 && (
                <TableCell className="text-xs">
                  {mobileRestColumns.map((cell: HeadCell<T>) => {
                  let displayValue;
                  if (cell.id === "index") {
                    displayValue = idx + 1; // 1-based row number
                  } else {
                    const value = item[cell.id];
                    displayValue =
                      cell.isNumber && value !== undefined && value !== null
                        ? convertToFarsiDigits(
                            value as string | number | null | undefined
                          )
                        : value;
                  }
                    return (
                      <div key={String(cell.id)}>
                        <strong>{cell.label}:</strong>
                        {displayValue !== undefined && displayValue !== null
                          ? String(displayValue)
                          : ""}
                      </div>
                    );
                  })}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}
