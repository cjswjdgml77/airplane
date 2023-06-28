import { create } from "zustand";

export type TGame = {
  stage: string;
  setStage: (value: string) => void;
  currentText: string;
  setText: (value: string) => void;
};

export default create<TGame>((set) => ({
  stage: "initial",
  setStage: (value) =>
    set((state) => {
      if (state.stage === value) return {};
      return { stage: value };
    }),
  currentText: "",
  setText: (value) =>
    set((state) => {
      if (state.currentText === value) return {};
      return { currentText: value };
    }),
}));
