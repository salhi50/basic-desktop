import React from "react";
import { createPortal } from "react-dom";
import type Position from "../types/Position";
import getContextMenuPosition from "../utils/getContextMenuPosition";
import useCloseOnClickOutside from "../hooks/useCloseOnClickOutside";

interface ContextMenuProps {
  children: React.ReactNode;
  mousePosition: Position;
  closeMenu: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children = "",
  mousePosition = { x: 0, y: 0 },
  closeMenu,
}) => {
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      const menuPosition = getContextMenuPosition(menu, mousePosition);
      menu.style.left = menuPosition.x + "px";
      menu.style.top = menuPosition.y + "px";
    }
  }, [mousePosition]);

  useCloseOnClickOutside(menuRef, closeMenu);

  return createPortal(
    <div
      className="dropdown-menu d-block context-menu shadow border-opacity-50 border"
      ref={menuRef}
    >
      {children}
    </div>,
    document.body,
  );
};

export default ContextMenu;
