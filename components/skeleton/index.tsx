import styles from "./index.module.css";

interface Props {
  size?: "md" | "sm" | "xs" | "full";
}

export default function Skeleton({ size = "full" }: Props) {
  let classes = "bg-gray-300 py-1 rounded-full relative overflow-hidden";
  if (size === "sm") {
    classes += " w-1/3";
  } else if (size === "md") {
    classes += " w-2/3";
  } else if (size === "xs") {
    classes += " w-1/12";
  } else {
    classes += " w-full";
  }
  return (
    <div className={classes}>
      <div className={`absolute top-0 left-0 w-full h-full ${styles.wrapper}`}>
        <div className="w-1/2 h-full bg-white/20 -skew-x-[20deg]"></div>
      </div>
    </div>
  );
}
