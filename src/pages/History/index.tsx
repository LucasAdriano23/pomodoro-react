import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplates";
import styles from './styles.module.css';
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { useEffect, useState } from "react";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { showMessage } from "../../adapters/showMessage";

export function History(){

    const { state, dispatch } = useTaskContext();
    const hasTasks = state.tasks.length > 0;

    const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: 'startDate',
            direction: 'desc'
        }
    });

    useEffect(() => {
        setSortTaskOptions( prevState => ({
            ...prevState,
            tasks: sortTasks({
                tasks: state.tasks,
                direction: prevState.direction,
                field: prevState.field
            }),
        }));
    },[state.tasks]);

    useEffect(() => {
        return () => {
            showMessage.dismiss()
        }
    },[]);

    function handleSortTasks({field} : Pick<SortTasksOptions, 'field'>){
        const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';

        setSortTaskOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTaskOptions.tasks,
                field: field
            }),
            direction: newDirection,
            field,
        });
    }

    function handleResetHistory(){
        showMessage.dismiss();
        showMessage.confirm('Tem certeza que deseja excluir o histórico?', (confirmation) => {
            if(confirmation){
                dispatch({ type: TaskActionTypes.RESET_STATE });
            }
        });
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>Histórico</span>
                    {hasTasks && (
                    <span className={styles.buttonContainer}><DefaultButton icon={<TrashIcon/>} color='red' onClick={handleResetHistory} title='Apagar todo o histórico' aria-label='Apagar todo o histórico'/></span>
                    )}
                </Heading>
            </Container>

            <Container>
                {hasTasks && (
                <div className={styles.resposiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={ () => handleSortTasks({ field: 'name' }) }>Tarefa</th>
                                <th onClick={ () => handleSortTasks({ field: 'duration' }) }>Duração</th>
                                <th onClick={ () => handleSortTasks({ field: 'startDate' }) }>Data</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortTaskOptions.tasks.map(task => {

                                const taskTypeDictionary = {
                                    workTime: 'Foco',
                                    shortBreakTime: 'Descanso curto',
                                    longBreakTime: 'Descanso longo'
                                };

                                return (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.duration} min</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{getTaskStatus(task, state.activeTask)}</td>
                                        <td>{taskTypeDictionary[task.type]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                )}

                {!hasTasks && (
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Ainda não existem tarefas criadas.
                    </p>
                )}
            </Container>
        </MainTemplate>
    )
}