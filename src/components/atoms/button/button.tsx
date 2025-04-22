import { cva } from "class-variance-authority";
import cn from "../../../helper/cn";
import { ButtonProps } from "./button.types";

const buttonStyle = cva(
  "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-input bg-transparent hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Button(props: ButtonProps) {
  const { className, variant, ...otherProps } = props;
  return (
    <button
      className={cn(buttonStyle({ variant }), className)}
      {...otherProps}
    />
  );
}

export default Button;
