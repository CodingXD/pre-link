import { MouseEventHandler } from "react";
import Spinner from "../spinner";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  loading?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  icon,
  loading = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 divide-x"
      disabled={loading}
    >
      {loading ? <Spinner /> : icon}&nbsp;
      <span className="pl-2">{children}</span>
    </button>
  );
}
