import { cva } from "class-variance-authority";
import cn from "../../../helper/cn";
import { TagProps } from "./tag.types";

const buttonStyle = cva("bg-pink-500 inline-flex text-center", {
  variants: {
    size: {
      default: "px-1 rounded-xs text-xs",
      lg: "px-2 py-0.5 rounded-sm text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Tag(props: TagProps) {
  const { size, className, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      className={cn(buttonStyle({ size }), props.className)}
    />
  );
}

export default Tag;
