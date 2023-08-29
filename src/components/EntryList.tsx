import React from "react";
import { nanoid } from "nanoid";
import { Actions } from "../reducers/entryCellReducer";
import * as constants from "../constants";
import useContextMenu from "../hooks/useContextMenu";
import entryCellReducer, { initializer } from "../reducers/entryCellReducer";

import type EntryInterface from "../types/Entry";
import type EntryCell from "../types/EntryCell";

import Entry from "./Entry";
import ContextMenu from "./ContextMenu";

const { NUM_COLS, NUM_ROWS } = constants.entriesLayout;

const EntryList: React.FC = () => {
  const [entryCells, dispatch] = React.useReducer(entryCellReducer, undefined, initializer);
  const [selectedCellId, setSelectedCellId] = React.useState<EntryCell["id"] | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    localStorage.setItem(constants.ENTRY_CELLS_KEY, JSON.stringify(entryCells));
  }, [entryCells]);

  const { isMenuVisible, mousePosition, closeMenu } = useContextMenu<HTMLDivElement | null>(
    listRef,
    handleContextMenuOpen,
  );

  React.useEffect(() => {
    if (!isMenuVisible) {
      setSelectedCellId(null);
    }
  }, [isMenuVisible]);

  function handleContextMenuOpen(e: MouseEvent) {
    let cellEl = e.target as HTMLElement | null;
    let i = 0;
    while (cellEl!.getAttribute("data-cell-id") === null) {
      if (cellEl === document.body || i > 10) {
        cellEl = null;
        break;
      }
      cellEl = cellEl!.parentElement;
      // Used to prevent any infinite loop
      i++;
    }
    setSelectedCellId(() => (cellEl ? cellEl.getAttribute("data-cell-id") : null));
  }

  const createNewEntry = (type: EntryInterface["type"]) => {
    const label = prompt(`Enter ${type} name: `);
    if (selectedCellId && label) {
      dispatch({
        type: Actions.FILL,
        cellId: selectedCellId,
        newEntry: { type, label, dateCreated: new Date(), id: nanoid() },
      });
      closeMenu();
    }
  };

  const deleteEntry = () => {
    const validation = confirm("Are Sure about deleting this entry?");
    if (validation && selectedCellId) {
      dispatch({
        type: Actions.EMPTY,
        cellId: selectedCellId,
      });
      closeMenu();
    }
  };

  const renameEntry = () => {
    const newLabel = prompt("Enter new label: ");
    if (selectedCellId && focusedCell && focusedCell.entry && newLabel) {
      dispatch({
        type: Actions.UPDATE,
        cellId: selectedCellId,
        update: { entry: { ...focusedCell.entry, label: newLabel } },
      });
      closeMenu();
    }
  };

  const focusedCell = React.useMemo(() => {
    if (selectedCellId) {
      return entryCells.find((cell) => cell.id === selectedCellId) || null;
    }
    return null;
  }, [selectedCellId]);

  const contextMenuActions = React.useMemo(() => {
    if (focusedCell && focusedCell.entry === null) {
      return (
        <>
          <button
            className="dropdown-item"
            onClick={() => createNewEntry("folder")}
          >
            New folder
          </button>
          <button
            className="dropdown-item"
            onClick={() => createNewEntry("file")}
          >
            New file
          </button>
        </>
      );
    } else if (focusedCell && focusedCell.entry !== null) {
      return (
        <>
          <button
            className="dropdown-item"
            onClick={renameEntry}
          >
            Rename
          </button>
          <button
            className="dropdown-item"
            onClick={deleteEntry}
          >
            Delete
          </button>
        </>
      );
    } else {
      return null;
    }
  }, [focusedCell]);

  return (
    <>
      {isMenuVisible && (
        <ContextMenu
          mousePosition={mousePosition}
          closeMenu={closeMenu}
        >
          {contextMenuActions}
        </ContextMenu>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`,
          height: "100vh",
        }}
        ref={listRef}
      >
        {entryCells.map((cell) => (
          <Entry
            entry={cell.entry}
            key={cell.id}
            cellId={cell.id}
            isSelected={selectedCellId === cell.id}
          />
        ))}
      </div>
    </>
  );
};

export default EntryList;
