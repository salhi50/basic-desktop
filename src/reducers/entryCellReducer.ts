import type Entry from "../types/Entry";
import type EntryCell from "../types/EntryCell";
import { ENTRY_CELLS_KEY } from "../constants";
import generateDefaultEntryCells from "../utils/generateDefaultEntryCells";

export const initializer = () => {
  const loc = localStorage.getItem(ENTRY_CELLS_KEY);
  if (loc !== null) {
    return JSON.parse(loc);
  } else {
    return generateDefaultEntryCells();
  }
};

export type State = EntryCell[];

export enum Actions {
  FILL,
  EMPTY,
  UPDATE,
}

export type FillAction = {
  type: Actions.FILL;
  cellId: EntryCell["id"];
  newEntry: Entry;
};
export type EmptyAction = {
  type: Actions.EMPTY;
  cellId: EntryCell["id"];
};
export type UpdateAction = {
  type: Actions.UPDATE;
  cellId: EntryCell["id"];
  update: Omit<EntryCell, "id">;
};

export type Action = FillAction | EmptyAction | UpdateAction;

const entryCellReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.FILL:
      return state.map((cell) =>
        cell.id === action.cellId ? { ...cell, entry: action.newEntry } : cell,
      );
    case Actions.EMPTY:
      return state.map((cell) => (cell.id === action.cellId ? { ...cell, entry: null } : cell));
    case Actions.UPDATE:
      return state.map((cell) =>
        cell.id === action.cellId ? { ...cell, ...action.update } : cell,
      );
    default:
      return state;
  }
};

export default entryCellReducer;
