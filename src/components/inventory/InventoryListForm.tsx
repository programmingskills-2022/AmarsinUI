import { useEffect, useState } from "react";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Autocomplete,
  TextField,
} from "@mui/material";
import useTable from "../../hooks/useTable";
import { useBrandStore } from "../../store/brandStore";
import { convertToFarsiDigits } from "../../utilities/general";
import { useInventoryStore } from "../../store/inventoryStore";
import { InventoryItem } from "../../types/inventory";
import { useAuthStore } from "../../store/authStore";
import { useInventory } from "../../hooks/useInventory";
import { useBrand } from "../../hooks/useBrands";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";

export type HeadCell<T> = {
  id: keyof T;
  label: string;
  disableSorting?: boolean;
  isNumber?: boolean;
};

export const headCells: HeadCell<InventoryItem>[] = [
  {
    id: "id",
    label: "شناسه برند",
    disableSorting: true,
  },
  { id: "bn", label: "برند" },
  { id: "fn", label: "نام کالا" },
  { id: "s", label: "قابل فروش", isNumber: true },
  { id: "ns", label: "غیر قابل فروش", isNumber: true },
  { id: "c", label: "بچ", isNumber: true },
  { id: "uid", label: "UID", isNumber: true },
  { id: "gtin", label: "GTIN", isNumber: true },
  { id: "ed", label: "انقضاء", isNumber: true },
];

export default function InventoryListForm() {
  const { getInventoryList, error, isLoading } = useInventory();


  const { authApiResponse } = useAuthStore();
  const { systemId, yearId } = authApiResponse?.data.result.initData || {};

  const [search, setSearch] = useState<string>("");
  const [brand, setBrand] = useState<{ id: string; title: string } | null>({
    id: "72",
    title: "سیمرغ",
  });

  const { brands, setField: setBrandField } = useBrandStore();
  const { getBrands } = useBrand();
  const { setField, inventoryList } = useInventoryStore();
  //if error occurred then navigate to login page
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    setBrandField("accSystem", systemId);
    setBrandField("search", search);
    getBrands();
  }, [search, systemId]);

  useEffect(() => {
    setField("accSystem", systemId);
    setField("accYear", yearId);
    setField("brandId", brand === null || !brand ? 72 : brand.id);
    getInventoryList();
    // eslint-disable-next-line
  }, [systemId, yearId, brand?.id]);

  const [filterFn] = useState<{
    fn: (items: InventoryItem[]) => InventoryItem[];
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
  } = useTable<InventoryItem>(
    inventoryList.rpProviderInventories,
    headCells,
    filterFn,
    brand?.id // Pass as resetPageSignal
  );

  if (error) return <div>Error: {error.message} </div>;

  return (
    <>
      <Paper className="p-2 m-2 w-full">
        <Toolbar>
          <Autocomplete
            options={brands.map((b) => ({
              id: b.id,
              title: b.text,
            }))}
            renderOption={(props, option) => (
              <li
                {...props}
                className="text-sm md:text-base p-2"
                key={option.id}
              >
                {option.title}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="برند"
                onChange={(event) => setSearch(event.target.value)}
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" }, // text-xs for mobile, default for desktop
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }, // input text
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }, // label text
                  },
                }}
              />
            )}
            value={brand}
            onChange={(_event, newValue) => {
              return setBrand(newValue);
            }}
            getOptionLabel={(option) => option.title || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="پیدا نشد"
            className="w-full"
          />
        </Toolbar>
        {isLoading ? (
          <div className="text-center">{<Skeleton />}</div>
        ) : recordsAfterPagingAndSorting().length > 0 ? (
          <div style={{ height: "70vh", overflowY: "auto" }}>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, idx) => (
                  <TableRow key={idx}>
                    {(isMobile ? mobileMainColumns : headCells).map(
                      (cell: HeadCell<InventoryItem>) => {
                        const value = item[cell.id];
                        const displayValue =
                          cell.isNumber && value !== undefined && value !== null
                            ? convertToFarsiDigits(value)
                            : value;
                        return (
                          <TableCell
                            key={String(cell.id)}
                            className={isMobile ? "text-xs" : ""}
                          >
                            {displayValue}
                          </TableCell>
                        );
                      }
                    )}
                    {isMobile && mobileRestColumns.length > 0 && (
                      <TableCell className="text-xs">
                        {mobileRestColumns.map(
                          (cell: HeadCell<InventoryItem>) => {
                            const value = item[cell.id];
                            const displayValue =
                              cell.isNumber &&
                              value !== undefined &&
                              value !== null
                                ? convertToFarsiDigits(value)
                                : value;
                            return (
                              <div key={String(cell.id)}>
                                <strong>{cell.label}:</strong> {displayValue}
                              </div>
                            );
                          }
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </div>
        ) : (
          <p className="p-6 text-red-400 text-sm md:text-base font-bold">
            هیچ کالایی یافت نشد.
          </p>
        )}
      </Paper>
    </>
  );
}
