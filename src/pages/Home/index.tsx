import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Cowntdown';
import {
  HomeContainer,
  StartCowntdownButton,
  StopCowntdownButton,
} from './styles';
import { HandPalm, Play } from 'phosphor-react';
import { useCyclesContext } from '../../contexts/CyclesContext';

type ICycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
};

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 05 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const {
    cycles,
    setCyclesHandler,
    interruptCyclesHandler,
    amountSecondsPast,
    setAmountSecondsPastHandler,
  } = useCyclesContext();

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = new Date().getTime().toString();

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCyclesHandler(newCycle);
    setActiveCycleId(id);
    setAmountSecondsPastHandler(0);

    reset();
  }

  const handleInterruptCycle = () => {
    interruptCyclesHandler();
    setActiveCycleId(null);
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCowntdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} /> Interromper
          </StopCowntdownButton>
        ) : (
          <StartCowntdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> começar
          </StartCowntdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
