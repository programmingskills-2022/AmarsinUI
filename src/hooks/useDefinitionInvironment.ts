import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../api/axios";
import { useDefinitionInvironmentStore } from "../store/definitionInvironmentStore";
import { DefinitionInvironment } from "../types/definitionInvironment";

export function useDefinitionInvironment() {
  const { setDefinitionInvironment } = useDefinitionInvironmentStore();

  const query = useQuery<
    DefinitionInvironment,
    Error,
    DefinitionInvironment,
    unknown[]
  >({
    queryKey: ["definitionInvironment"],
    queryFn: async () => {
      const response = await api.get(`/api/Definition/Environment`);
      return response.data;
    },

    refetchOnWindowFocus: true, // Refetch data when the window is focused
    refetchOnReconnect: true, // Refetch data when the network reconnects
    onSuccess: (data: DefinitionInvironment) => {
      setDefinitionInvironment(data);
    },
  } as UseQueryOptions<DefinitionInvironment, Error, DefinitionInvironment, unknown[]>);

  return {
    //getDefinitionInvironment: () => query.refetch(), // Optional manual trigger
    isLoading: query.isLoading,
    error: query.error,
    definitionInvironment: query.data ?? {
      years: [],
      systems: [],
      charts: [],
      yearId: 0,
      systemId: 0,
      chartId: 0,
      curDate: "",
      curYear: 0,
      curMonth: 0,
      curDay: 0,
      curTime: "",
      curMYear: 0,
      curMMonth: 0,
      curMDay: 0,
    },
  };
}

// import { useMutation } from "@tanstack/react-query";
// import api from "../api/axios";
// import { useDefinitionInvironmentStore } from "../store/definitionInvironmentStore";

// export function useDefinitionInvironment() {
//   const { setDefinitionInvironment } = useDefinitionInvironmentStore();

//   const definitionInvironmentMutation = useMutation({
//     mutationFn: async () => {
//       const response = await api.get(`/api/Definition/Environment`);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       //Successful
//       setDefinitionInvironment(data);
//     },
//   });

//   return {
//     getDefinitionInvironment: definitionInvironmentMutation.mutate,
//     isLoading: definitionInvironmentMutation.isPending,
//     error: definitionInvironmentMutation.error,
//   };
// }
