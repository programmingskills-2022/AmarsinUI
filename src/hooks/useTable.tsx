import React, { useState, ReactNode, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { convertToFarsiDigits } from "../utilities/general";

type HeadCell<T> = {
  id: keyof T;
  label: string;
  disableSorting?: boolean;
};

type FilterFn<T> = {
  fn: (items: T[]) => T[];
};

type UseTableReturn<T> = {
  TblContainer: React.FC<{ children: ReactNode }>;
  TblHead: React.FC;
  TblPagination: React.FC;
  recordsAfterPagingAndSorting: () => T[];
  isMobile: boolean;
  mobileMainColumns: HeadCell<T>[];
  mobileRestColumns: HeadCell<T>[];
};

export default function useTable<T>(
  records: T[],
  headCells: HeadCell<T>[],
  filterFn: FilterFn<T>,
  resetPageSignal?: any
): UseTableReturn<T> {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const mobileMainColumns = headCells.slice(0, 3);
  const mobileRestColumns = headCells.slice(3);

  const pageNumbers = [5, 10, 25];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pageNumbers[1]);
  const pages = pageNumbers.map((num) => ({
    label: convertToFarsiDigits(num),
    value: num,
  }));

  const [order, setOrder] = useState<"asc" | "desc" | undefined>();
  const [orderBy, setOrderBy] = useState<keyof T | "">("");
  useEffect(() => {
    setPage(0);
  }, [resetPageSignal]);

  const tableStyles: SxProps = {
    mt: 3,
    "& thead th": {
      fontWeight: 600,
      color: theme.palette.grey[600],
      backgroundColor: theme.palette.grey[300],
    },
    "& tbody td": {
      fontWeight: 300,
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  };

  const TblContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Table sx={tableStyles}>{children}</Table>
  );

  const TblHead: React.FC = () => {
    const handleSortRequest = (cellId: keyof T) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {(isMobile ? mobileMainColumns : headCells).map((headCell) => (
            <TableCell
              key={String(headCell.id)}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
          {isMobile && mobileRestColumns.length > 0 && (
            <TableCell>جزئیات</TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  // Custom Pagination Actions
  function TablePaginationActions(props: any) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    return (
      <div style={{ display: "flex" }}>
        <IconButton
          onClick={() => onPageChange(null, 0)}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPage />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(null, page - 1)}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(null, page + 1)}
          disabled={page >= lastPage}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(null, lastPage)}
          disabled={page >= lastPage}
          aria-label="last page"
        >
          <LastPage />
        </IconButton>
      </div>
    );
  }

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination: React.FC = () => (
    <div dir="rtl" className={isMobile ? "text-xs font-bold" : ""}>
      <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records ? records.length : 0}
        onPageChange={handleChangePage}
        ActionsComponent={TablePaginationActions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={
          isMobile ? "تعداد" : "تعداد نمایش داده شده در هر صفحه:"
        }
        labelDisplayedRows={({ from, to, count }) =>
          `${convertToFarsiDigits(from)}-${convertToFarsiDigits(
            to
          )} از ${convertToFarsiDigits(count)}`
        }
        dir="rtl"
      />
    </div>
  );

  const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (
    order: "asc" | "desc" | undefined,
    orderBy: keyof T
  ): ((a: T, b: T) => number) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array: T[], comparator: (a: T, b: T) => number): T[] => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const recordsAfterPagingAndSorting = (): T[] => {
    const sorted = order && orderBy ? getComparator(order, orderBy) : () => 0;
    return stableSort(filterFn.fn(records), sorted).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    isMobile,
    mobileMainColumns,
    mobileRestColumns,
  };
}
