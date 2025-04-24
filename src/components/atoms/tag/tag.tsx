import cn from "../../../helper/cn";
import { TagProps } from "./tag.types";

function Tag(props: TagProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-pink-500 px-1 rounded-xs text-xs inline-flex text-center",
        props.className
      )}
    />
  );
}

export default Tag;
