import { useEffect, useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWokerManager } from "../../workers/TimeWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children } : TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);

    useEffect(() => {        
        const worker = TimerWokerManager.getInstance();

        if(!state.activeTask){
            worker.terminate();
            return;
        }

        worker.onmessage(e => {
            const countDownSeconds = e.data;

            if(countDownSeconds <= 0){
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