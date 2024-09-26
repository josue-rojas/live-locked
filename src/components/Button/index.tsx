import { MouseEventHandler, ReactElement, ReactText } from "react";

interface ButtonProps {
  children: ReactElement | ReactText;
  onClick: MouseEventHandler;
}

export function Button ({ children, onClick }: ButtonProps) {
  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '8px', // Smooth edges
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition on hover
  };

  const hoverStyle = {
    backgroundColor: 'darkgray', // Optional: change color on hover
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
    >
      {children}
    </button>
  );
};
