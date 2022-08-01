interface Props {
  size?: "md" | "sm" | "xs" | "full";
}

export default function Skeleton({ size = "full" }: Props) {
  let classes = "bg-gray-300 py-1 rounded-full";
  if (size === "sm") {
    classes += " w-1/3";
  } else if (size === "md") {
    classes += " w-2/3";
  } else if (size === "xs") {
    classes += " w-1/12";
  } else {
    classes += " w-full";
  }
  return <div className={classes}></div>;
}
