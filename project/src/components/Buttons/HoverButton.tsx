import React, { ReactNode } from "react";

interface HoverButtonProps {
  onClickFunction: () => void;
  children: ReactNode;
}

const HoverButton = (props: HoverButtonProps) => {
  const { onClickFunction, children } = props;

  function handleMouseLeave(event: any) {
    event.target.style.background = "#3d77e4";
    event.target.style.borderImage = null;
  }

  function handleMouseMove(event: any) {
    const rect = event.target.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (event.target instanceof HTMLButtonElement) {
      event.target.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`;
      event.target.style.borderImage = `radial-gradient(20% 75% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 1 / 1px / 0px stretch `;
    } else {
      event.target.parentElement.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`;
      event.target.parentElement.style.borderImage = `radial-gradient(20% 75% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 1 / 1px / 0px stretch `;
    }
  }

  return (
    <button
      onClick={() => onClickFunction()}
      onMouseLeave={(e) => handleMouseLeave(e)}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      {children}
    </button>
  );
};

export default HoverButton;
