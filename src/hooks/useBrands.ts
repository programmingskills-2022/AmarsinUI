import { useMutation } from "@tanstack/react-query";
import { useBrandStore } from "../store/brandStore";
import { BrandRequest } from "../types/brand";
import api from "../api/axios";

export function useBrand() {
  const { accSystem, lastId, page, usrPerm, search, setBrands } =
    useBrandStore();

  const brandMutation = useMutation({
    mutationFn: async () => {
      const params: BrandRequest = {
        accSystem,
        lastId,
        page,
        usrPerm,
        search,
      };
      console.log("brand params", params);
      const response = await api.get(
        `/api/Brand/search?accSystem=${params.accSystem}&page=${params.page}&lastId=${params.lastId}&usrPerm=${params.usrPerm}&search=${encodeURI(search?? '')}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      const { results } = data;

      console.log("results:", results);

      //Successful
      setBrands(results);
    },
  });

  return {
    getBrands: brandMutation.mutate,
    isLoading: brandMutation.isPending,
    error: brandMutation.error,
  };
}
