import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { MainTemplate } from "../../templates/MainTemplates";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings(){
    const { state, dispatch } = useTaskContext();
    const workTimeInput = useRef<HTMLInputElement | null>(null);
    const shortBreakTimeInput = useRef<HTMLInputElement | null>(null);
    const longBreakTimeInput = useRef<HTMLInputElement | null>(null);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const workTime = Number(workTimeInput.current?.value);
        const shortBreakTime = Number(shortBreakTimeInput.current?.value);
        const longBreakTime = Number(longBreakTimeInput.current?.value);

        const formErrors = [];
        const workTimeInvalid = 'Tempo de Foco inválido';
        const shortBreakTimeInvalid = 'Tempo de Descanso Curto inválido';
        const longBreakTimeInvalid = 'Tempo de Descanso Longo inválido';

        if(isNaN(workTime)){
            formErrors.push(`${workTimeInvalid}, utilize apenas números!`);
        }else if(workTime <= 0){
            formErrors.push(`${workTimeInvalid}, utilize apenas números maior que zero!`);
        }else if(workTime > 99) {
            formErrors.push(`${workTimeInvalid}, digite um valor menor ou igual a 99!`);
        }

        if(isNaN(shortBreakTime)){
            formErrors.push(`${shortBreakTimeInvalid}, utilize apenas números!`);
        }else if(shortBreakTime <= 0){
            formErrors.push(`${shortBreakTimeInvalid}, utilize apenas números maior que zero!`);
        }else if(shortBreakTime > 30) {
            formErrors.push(`${shortBreakTimeInvalid}, digite um valor menor ou igual a 30!`);
        }

        if(isNaN(longBreakTime)){
            formErrors.push(`${longBreakTimeInvalid}, utilize apenas números!`);
        }else if(longBreakTime <= 0){
            formErrors.push(`${longBreakTimeInvalid}, utilize apenas números maior que zero!`);
        }else if(longBreakTime > 60) {
            formErrors.push(`${longBreakTimeInvalid}, digite um valor menor ou igual a 60!`);
        }

        if(formErrors.length > 0){
            formErrors.forEach( error => {
                showMessage.error(error);
            })
            return;
        }

        dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload:{
            workTime,
            shortBreakTime,
            longBreakTime
        }});

        showMessage.success('Configurações salvas!')

    }

    return (
        <MainTemplate>
            <Container>
                Configurações
            </Container>

            <Container>
                <p style={{ textAlign: 'center'}}>Modifique as configurações para tempo de foco, descanso curto e descanso longo.</p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} action="" className="form">
                    <div className="formRow">
                        <DefaultInput 
                        id="workTime" 
                        labelText="Foco"
                        type="number" 
                        ref={workTimeInput}
                        defaultValue={state.config.workTime}/>
                    </div>

                    <div className="formRow">
                        <DefaultInput 
                        id="shortBreakTime"
                        type="number" 
                        labelText="Descanso Curto" 
                        ref={shortBreakTimeInput} 
                        defaultValue={state.config.shortBreakTime}/>
                    </div>

                    <div className="formRow">
                        <DefaultInput 
                        id="longBreakTime"
                        type="number" 
                        labelText="Descanso Longo" 
                        ref={longBreakTimeInput} 
                        defaultValue={state.config.longBreakTime}/>
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon/>}
                        aria-label="Salvar configurações" 
                        title="Salvar configurações" />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    )
}