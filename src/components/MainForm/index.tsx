import { Cycles } from '../../components/Cycles';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm(){

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log('handleCreateNewTask');
    }

    return (
    <form onSubmit={handleCreateNewTask} className='form' action="">
        <div className="formRow">
            <DefaultInput 
                type='text' 
                id="meuInput" 
                labelText="Task"
                placeholder='Digite algo'
            />
        </div> 

        <div className="formRow">
            <p>
                Próximo intervalo é de 25min
            </p>
        </div>

        <div className="formRow">
            <Cycles/>
        </div>

        <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon/>} />
        </div>
    </form>
    );
}