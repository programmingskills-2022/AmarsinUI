import { useInventoryStore } from "../store/inventoryStore";
import {  InventoryListRequest } from "../types/inventory";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export function useInventory() {
  const { accSystem,accYear,brandId,setInventoryList } =
    useInventoryStore();

  const inventoryMutation = useMutation({
    mutationFn: async () => {
      const params: InventoryListRequest = {
        accSystem,
        accYear,
        brandId
      };
      console.log(params)
      const url:string= `/api/ProviderInventory/list?accSystem=${params.accSystem}&accYear=${params.accYear}&brandId=${params.brandId}`
      console.log(url)
      const response = await api.get(url)
      return response.data;
    },
    onSuccess: (data) => {
      console.log('sdsd',data)
      //Successful
      setInventoryList(data);
    },
  });

  return {
    getInventoryList: inventoryMutation.mutate,
    isLoading: inventoryMutation.isPending,
    error: inventoryMutation.error,
  };
}
