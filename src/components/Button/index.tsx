import { MouseEventHandler, ReactElement, ReactText } from "react";

interface ButtonProps {
  children: ReactElement | ReactText;
  onClick: MouseEventHandler;
  styleType?: 'default' | 'send';
}

export function Button ({ children, onClick, styleType = 'default' }: ButtonProps) {
  const baseStyle = {
      backgroundColor: 'black',
      borderRadius: '10px',
      border: '1px solid #ccc',
      color: 'white',
      cursor: 'pointer',
      display: 'inline-block',
      marginBottom: '15px',
    padding: '12px 20px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const styles = {
    default: {
      ...baseStyle,
      backgroundColor: 'black',
      color: 'white',
    },
    send: {
      ...baseStyle,
      backgroundColor: 'green',
      color: 'white',
    }
  };

  const hoverStyles = {
    default: {
      backgroundColor: 'darkgray',
    },
    send: {
      backgroundColor: 'lightgreen',
    }
  };

  const currentStyle = styles[styleType];
  const currentHoverStyle = hoverStyles[styleType];

  return (
    <button
      style={currentStyle}
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = currentHoverStyle.backgroundColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = currentStyle.backgroundColor)}
    >
      {children}
    </button>
  );
};
