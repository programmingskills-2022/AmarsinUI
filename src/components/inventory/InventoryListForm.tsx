import { useEffect, useState } from "react";
import { Paper } from "@mui/material";

import { useBrandStore } from "../../store/brandStore";
import { useInventoryStore } from "../../store/inventoryStore";
import { InventoryItem } from "../../types/inventory";
import { useInventoryGoodList } from "../../hooks/useInventoryGoodList";
import { useBrand } from "../../hooks/useBrands";
import Skeleton from "../layout/Skeleton";
import { useNavigate } from "react-router-dom";
import AutoComplete from "../controls/AutoComplete";
import { Table } from "../controls/Table";
import { useGeneralContext } from "../../context/GeneralContext";
import PersianDatePicker from "../controls/PersianDatePicker";
import Checkbox from "../controls/Checkbox";
import { HeadCell, HeaderGroup } from "../../hooks/useTable";

export const headCells: HeadCell<InventoryItem>[] = [
  {
    id: "index",
    label: "ردیف",
    disableSorting: true,
  },
  { id: "fn", label: "نام کالا" },
  { id: "s", label: "تعداد", isNumber: true },
  { id: "ns", label: "مبلغ", isNumber: true },
  { id: "c", label: "تعداد", isNumber: true },
];

const headerGroups: HeaderGroup[] = [
  { label: "", colSpan: 1 },
  { label: "", colSpan: 1 },
  { label: "ریالی", colSpan: 2 },
  { label: "آفر", colSpan: 1 },
];

export default function InventoryListForm() {
  const { inventoryList, error, isLoading } = useInventoryGoodList();

  const { systemId, yearId } = useGeneralContext();

  const [search, setSearch] = useState<string>("");

  //set params
  const [brand, setBrand] = useState<{ id: string; title: string } | null>({
    id: "0",
    title: "",
  });
  const [selectedType, setSelectedType] = useState<{
    id: string;
    title: string;
  } | null>({
    id: "0",
    title: "",
  });
  const type = [
    { id: "0", title: "فروش" },
    { id: "1", title: "برگشت از فروش" },
  ];

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasDate, setHasDate] = useState<boolean>(false);

  const { setField: setBrandField } = useBrandStore();
  const { setField } = useInventoryStore();
  //if error occurred then navigate to login page
  const navigate = useNavigate();

  const handleDateChange = (event: {
    target: { name: string; value: Date | null };
  }) => {
    if (event.target.name === "startDate") {
      setStartDate(event.target.value);
    } else {
      setEndDate(event.target.value);
    }
  };

  const handleCheckboxChange = (event: {
    target: { name: string; value: boolean };
  }) => {
    if (event.target.value === true) {
      setStartDate(new Date());
      setEndDate(new Date());
    } else {
      setStartDate(null);
      setEndDate(null);
    }
    setHasDate(event.target.value);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    setBrandField("accSystem", systemId);
    setBrandField("search", search);
  }, [search, systemId]);
  const { brands } = useBrand();

  useEffect(() => {
    setField("accSystem", systemId);
    setField("accYear", yearId);
    setField("brandId", brand === null || !brand ? 0 : brand.id);
  }, [systemId, yearId, brand?.id]);

  if (error) return <div>Error: {error.message} </div>;

  return (
    <Paper className="p-2 m-2 w-full">
      <div className="w-full flex flex-col 2xl:flex-row justify-between items-center gap-2">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <div className="w-full flex items-center gap-2  ">
            <Checkbox
              name="DateCheckbox"
              onChange={handleCheckboxChange}
              value={hasDate}
              label="تاریخ:"
            />
            <PersianDatePicker
              name="startDate"
              label="از:"
              value={startDate}
              onChange={handleDateChange}
              disabled={!hasDate}

            />
          </div>
          <div className="w-full flex items-center gap-2">
            <label className="text-sm md:text-base">تا:</label>
            <PersianDatePicker
              name="endDate"
              label="تا:"
              value={endDate}
              onChange={handleDateChange}
              disabled={!hasDate}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <div className="w-full flex items-center gap-2">
            <label htmlFor="type" className="">
              نوع:
            </label>
            <AutoComplete
              options={type}
              value={selectedType}
              handleChange={(_event, newValue) => {
                return setSelectedType(newValue);
              }}
              setSearch={setSearch}
              showLabel={false}
              inputPadding="0 !important"
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <label htmlFor="brand" className="">
              برند:
            </label>
            <AutoComplete
              options={brands.map((b) => ({
                id: b.id,
                title: b.text,
              }))}
              value={brand}
              handleChange={(_event, newValue) => {
                return setBrand(newValue);
              }}
              setSearch={setSearch}
              showLabel={false}
              inputPadding="0 !important"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">{<Skeleton />}</div>
      ) : inventoryList.rpProviderInventories.length > 0 ? (
        <Table
          data={inventoryList.rpProviderInventories}
          headCells={headCells}
          resetPageSignal={brand?.id}
          headerGroups={headerGroups}
        />
      ) : (
        <p className="p-6 text-red-400 text-sm md:text-base font-bold">
          هیچ کالایی یافت نشد.
        </p>
      )}
    </Paper>
  );
}
