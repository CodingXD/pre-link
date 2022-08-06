import { MouseEventHandler } from "react";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
}

export default function LinkButton({
  children,
  type = "button",
  onClick,
  className,
}: Props) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
