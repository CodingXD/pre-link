import { MouseEventHandler } from "react";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  loading?: boolean;
}

export default function IconButton({
  children,
  type = "button",
  onClick,
  icon,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 divide-x"
    >
      {icon}&nbsp;
      <span className="pl-2">{children}</span>
    </button>
  );
}
