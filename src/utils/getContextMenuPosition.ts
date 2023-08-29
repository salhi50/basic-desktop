import type Position from "../types/Position";

const getContextMenuPosition = (menu: HTMLElement, mousePosition: Position): Position => {
  const menuWidth = menu.offsetWidth;
  const menuHeight = menu.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let menuX = mousePosition.x;
  let menuY = mousePosition.y;
  let hasRightOverflow = windowWidth - mousePosition.x < menuWidth;
  let hasBottomOverflow = windowHeight - mousePosition.y < menuHeight;

  if (hasRightOverflow) {
    menuX -= menuWidth;
  }
  if (hasBottomOverflow) {
    menuY -= menuHeight;
  }

  return {
    x: menuX,
    y: menuY,
  };
};

export default getContextMenuPosition;
