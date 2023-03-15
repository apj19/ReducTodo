import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allTasks: [],
    historyTask: [],
  }
  export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      increment: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // state.value += 1
        // console.log(action.payload);
        state.allTasks.push(action.payload);
        
      },
      completeTask: (state,action) => {
        // console.log(action.payload);
        state.historyTask.push(action.payload);
       
        state.allTasks=state.allTasks.filter((t)=> t.id != action.payload.id);
      },
      editTask: (state,action) => {
        // console.log(action.payload);
        // console.log(action.payload);
        let edittaskindex=state.allTasks.findIndex((t)=> t.id ==action.payload.id);
        // console.log(edittaskindex);
         state.allTasks[edittaskindex].task=action.payload.value;
      },
      restoreTask: (state,action) => {
        state.allTasks.push(action.payload);
        state.historyTask=state.historyTask.filter((t)=> t.id != action.payload.id);
        
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
    },
  });
  export const { increment, decrement, incrementByAmount,completeTask,editTask ,restoreTask} = taskSlice.actions

export default taskSlice.reducer