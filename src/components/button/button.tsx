import Style from './button.module.css';

interface IButton {
    text: string;
    onClick: () => void;
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    style?: React.CSSProperties;
}

export default function Button({ text, onClick, disabled, style, type }: IButton) {
  return (
    <button className={Style.button} 
      onClick={onClick} 
      disabled={disabled} 
      type={type}
      style={style}>
      {text}
    </button>
  );
}