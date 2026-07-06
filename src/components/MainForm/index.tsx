import { Cycles } from '../../components/Cycles';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { PlayCircleIcon } from 'lucide-react';

export function MainForm(){
    return (
    <form className='form' action="">
        <div className="formRow">
        <DefaultInput 
            type='text' 
            id="meuInput" 
            labelText="Task"
            placeholder='Digite algo'
            defaultValue='Valor preenchido'
            disabled
        />
        </div> 

        <div className="formRow">
        <p>
            Lorem ipsum dolor sit amet.
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