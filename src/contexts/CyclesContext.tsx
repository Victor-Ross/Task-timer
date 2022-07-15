import { createContext, ReactNode, useContext, useState } from 'react';

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesContextProps {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPast: number;
  setCyclesHandler: (newCycle: ICycle) => void;
  interruptCyclesHandler: () => void;
  markCurrentCycleAsFinished: () => void;
  setAmountSecondsPastHandler: (seconds: number) => void;
}

const CyclesContext = createContext({} as ICyclesContextProps);

export const CyclesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycle, setActiveCycle] = useState<ICycle | undefined>(undefined);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPast, setAmountSecondsPast] = useState(0);

  function setCyclesHandler(newCycle: ICycle) {
    setCycles((state) => [...state, newCycle]);
  }

  function interruptCyclesHandler() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function setAmountSecondsPastHandler(seconds: number) {
    setAmountSecondsPast(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPast,
        setCyclesHandler,
        interruptCyclesHandler,
        markCurrentCycleAsFinished,
        setAmountSecondsPastHandler,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCyclesContext = () => {
  return useContext(CyclesContext);
};
