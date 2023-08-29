import React from "react";
import type Position from "../types/Position";

const useContextMenu = <C extends HTMLElement | null>(
  menuContainerRef: React.MutableRefObject<C>,
  onOpen?: (e: MouseEvent) => unknown,
) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState<Position>({
    x: 0,
    y: 0,
  });

  const showMenu = React.useCallback((e: MouseEvent) => {
    setIsMenuVisible(true);
    if (onOpen instanceof Function) onOpen(e);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  React.useEffect(() => {
    const menuContainer = menuContainerRef.current;

    function handleContextMenu(e: MouseEvent) {
      // If Right button is clicked
      if (e.button === 2) {
        e.stopPropagation();
        e.preventDefault();
        showMenu(e);
        setMousePosition({ x: e.x, y: e.y });
      }
    }

    function handleWindowResize(e: UIEvent) {
      closeMenu();
      setMousePosition({ x: 0, y: 0 });
    }

    if (menuContainer) {
      menuContainer.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("resize", handleWindowResize);
    }

    return () => {
      menuContainer?.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [menuContainerRef]);

  return {
    mousePosition,
    isMenuVisible,
    showMenu,
    closeMenu,
  };
};

export default useContextMenu;
