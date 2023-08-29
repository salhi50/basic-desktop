import { entriesLayout } from "../constants";
import type EntryCell from "../types/EntryCell";

const generateDefaultEntryCells = (): EntryCell[] => {
  const numCells = entriesLayout.NUM_COLS * entriesLayout.NUM_ROWS;
  let cells: EntryCell[] = [];
  for (let i = 0; i < numCells; i++) {
    cells[i] = {
      entry: null,
      id: i.toString(),
    };
  }
  return cells;
};

export default generateDefaultEntryCells;
