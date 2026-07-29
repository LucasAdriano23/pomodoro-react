import { useRef } from 'react';
import { Cycles } from '../../components/Cycles';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../../components/Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm(){
    const taskNameInput= useRef<HTMLInputElement>(null);
    const { state, dispatch } = useTaskContext();
    const lastTaskName = state.taks[state.tasks.length - 1]?.name || '';

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        showMessage.dissmiss();

        if(taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if(!taskName){
            showMessage.error('Digite o nome da tarefa!');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        };

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask});

        showMessage.success('Tarefa iniciada!');
    }

    function handleInterruptTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        showMessage.dissmiss();
        showMessage.info('Tarefa interrompida!');
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    }

    return (
    <form onSubmit={handleCreateNewTask} className='form' action="">
        <div className="formRow">
            <DefaultInput 
                type='text' 
                id="meuInput" 
                labelText="Task"
                placeholder='Digite algo'
                disabled={!!state.activeTask}
                ref={taskNameInput}
                defaultValue={lastTaskName}
            />
        </div> 

        <div className="formRow">
            <Tips/>
        </div>

        <div className="formRow">
            <Cycles/>
        </div>

        <div className="formRow">
            {!state.activeTask && (
                <DefaultButton type="submit" title="Iniciar nova tarefa" aria-label="Iniciar nova tarefa" icon={<PlayCircleIcon/>} />
            )}

            {!!state.activeTask && (
                <DefaultButton type="button" title="Interromper nova tarefa" aria-label="Interromper nova tarefa" onClick={e => handleInterruptTask(e)} icon={<StopCircleIcon/>} color='red' />
            )}
        </div>
    </form>
    );
}