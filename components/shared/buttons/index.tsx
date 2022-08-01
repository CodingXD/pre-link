import { MouseEventHandler } from "react";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "primary";
}

export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
}: Props) {
  let classes =
    "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
