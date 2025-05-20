import * as XLSX from "xlsx";
import { HeadCell } from "../components/inventory/InventoryListForm";
import ExcelIcon from "../assets/images/GrayThem/excel24.png";
import Modal from "../components/layout/Modal";
import { useState, useEffect } from "react";

interface ExportToExcelProps<T> {
  headCells: HeadCell<T>[];
  data: T[];
}

const ExcelExport = <T extends object>({
  data,
  headCells,
}: ExportToExcelProps<T>) => {
  const fileName = "data_export.xlsx";
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data);
  useEffect(() => {
    let timeoutId: number;
    if (isModalOpen) {
      timeoutId = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen]);

  const handleExport = () => {
    
    if (!data || data.length === 0) {
      setIsModalOpen(true);
      return;
    }
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
    <>
      <div className="flex flex-col items-center justify-center  cursor-pointer px-4"
      onClick={handleExport}>
        <img src={ExcelIcon} />
        <p className="text-xs">اکسل</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="اطلاعاتی برای انتقال به اکسل وجود ندارد."
      />
    </>
  );
};

export default ExcelExport;
