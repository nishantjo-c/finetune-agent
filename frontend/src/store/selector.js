import { createSelector } from "@reduxjs/toolkit";

export function selectorState (state){
    const messageState = (state) => state;

    const selectMessage = createSelector([messageState], (msg) => {
        return [...msg];
    })
}