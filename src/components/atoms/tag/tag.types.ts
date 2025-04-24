import { HTMLProps } from "react";

export interface TagProps extends Omit<HTMLProps<HTMLDivElement>, "size"> {
  size?: "default" | "lg";
}
