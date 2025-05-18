import * as XLSX from "xlsx";
import { HeadCell } from "../components/inventory/InventoryListForm";
import ExcelIcon from "../assets/images/GrayThem/excel24.png";

interface ExportToExcelProps<T> {
  headCells: HeadCell<T>[];
  data: T[];
}

const ExcelExport = <T extends object>({
  data,
  headCells,
}: ExportToExcelProps<T>) => {
  const fileName = "data_export.xlsx";

  const handleExport = () => {
    // Only export columns defined in headCells, with Farsi headers
    const exportData = data.map((item) => {
      const row: Record<string, any> = {};
      headCells.forEach((cell) => {
        row[cell.label] = (item as any)[cell.id];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex flex-col items-center justify-center  cursor-pointer px-4"
    onClick={handleExport}>
      <img src={ExcelIcon} />
      <p className="text-xs">اکسل</p>
    </div>
  );
};

export default ExcelExport;
