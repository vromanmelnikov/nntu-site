import { configureStore } from "@reduxjs/toolkit";
import changeReducer from "./changeReducer";
import editorReducer from "./editorReducer";
import mentorListReducer from "./mentorListReducer";
import scheduleReducer from "./scheduleReducer";
import dragReducer from './dragReducer';

export default configureStore({
    reducer: {
        schedule: scheduleReducer,
        editor: editorReducer,
        change: changeReducer,
        mentorList: mentorListReducer,
        drag: dragReducer
    }
})