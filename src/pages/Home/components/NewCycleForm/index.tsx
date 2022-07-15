import { useFormContext } from 'react-hook-form';
import { FormContentContainer, MinutesAmountInput, TaskInput } from './styles';
import { useCyclesContext } from '../../../../contexts/CyclesContext';

export const NewCycleForm = () => {
  const { activeCycle } = useCyclesContext();
  const { register } = useFormContext();

  return (
    <FormContentContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-sugestions"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-sugestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContentContainer>
  );
};
