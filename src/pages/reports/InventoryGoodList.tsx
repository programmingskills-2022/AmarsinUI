import PageTitle from "../../components/layout/PageTitle";
import  InventoryGoodListForm, { headCells } from "../../components/inventory/InventoryGoodListForm";
import ExcelExport from "../../utilities/ExcelExport";
import { useBrandStore } from "../../store/brandStore";
import { useEffect } from "react";
import { useGeneralContext } from "../../context/GeneralContext";
import { useInventoryGoodList } from "../../hooks/useInventoryGoodList";

export default function InventoryGoodList() {

  const {inventoryList} = useInventoryGoodList()
  const {setField}=useBrandStore()
  const {systemId}=useGeneralContext()

  useEffect(()=>{
    setField("accSystem",systemId)
    
  },[])

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col bg-gray-200 pt-2">
      {/* Top header */}
      <header className="flex items-center justify-between border-gray-300">
        <PageTitle />
        <ExcelExport data={inventoryList.rpProviderInventories} headCells={headCells}  />
      </header>
      {/* Sub-header */}

      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-2">
        <InventoryGoodListForm/>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 text-xs text-gray-500 px-4 py-1 flex justify-between"></footer>
    </div>
  );
}
