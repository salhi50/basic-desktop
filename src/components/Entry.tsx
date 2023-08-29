import React from "react";
import type EntryCell from "../types/EntryCell";
import File from "../assets/file.svg";
import Folder from "../assets/folder.svg";

interface EntryProps {
  entry: EntryCell["entry"];
  cellId: EntryCell["id"];
  isSelected: boolean;
}

const Entry: React.FC<EntryProps> = ({ entry, cellId, isSelected = false }) => {
  return (
    <>
      <div
        className={`w-100 border border-start-0 border-top-0 h-100 d-flex align-items-center justify-content-center`}
        data-cell-id={cellId}
        // Highlighted state
        style={{ backgroundColor: isSelected ? "rgba(227, 192, 41, .5)" : "" }}
      >
        {entry && (
          <div className="vstack align-items-center p-1">
            <div
              style={{
                backgroundImage: `url(${entry.type === "folder" ? Folder : File})`,
                width: "100%",
                height: "100%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            />
            <span>{entry.label}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Entry;
