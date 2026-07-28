import { useEffect, useReducer, useRef } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWokerManager } from "../../workers/TimeWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children } : TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    useEffect(() => {        
        const worker = TimerWokerManager.getInstance();

        if(state.activeTask && playBeepRef.current === null){
            playBeepRef.current = loadBeep();
        }else if(!state.activeTask){
            worker.terminate();
            return;
        }

        worker.onmessage(e => {
            const countDownSeconds = e.data;

            if(countDownSeconds <= 0){
                if(playBeepRef.current){
                    playBeepRef.current();
                    playBeepRef.current = null;
                }

                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
                worker.terminate();
            } else {
                dispatch({
                    type: TaskActionTypes.COUNT_DOWN,
                    payload: { secondsRemaining: countDownSeconds },
                });
            }
        });

        worker.postMessage(state);
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}