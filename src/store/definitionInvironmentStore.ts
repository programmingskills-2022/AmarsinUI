import { create } from "zustand";
import { DefinitionInvironmentState } from "../types/definitionInvironment";

export const useDefinitionInvironmentStore = create<DefinitionInvironmentState>()((set) => ({
  definitionInvironment: {
    years: [],
    systems: [],
    charts: [],
    yearId: 0,
    systemId: 0,
    chartId: 0,
    curDate: '',
    curYear: 0,
    curMonth: 0,
    curDay: 0,
    curTime: '',
    curMYear: 0,
    curMMonth: 0,
    curMDay: 0
  },
  setDefinitionInvironment: (definitionInvironment) => set({ definitionInvironment }),
}));
