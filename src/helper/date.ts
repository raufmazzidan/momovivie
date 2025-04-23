import { format, formatDistanceToNow } from "date-fns";

export interface IDateFormatProps {
  date?: string | Date | null;
  format: "dd MMMM yyyy" | string;
  emptyMessage?: string;
}

export const dateFormatFromNow = (date: string) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

export const dateFormat = ({
  date,
  format: pattern,
  emptyMessage = "-",
}: IDateFormatProps) => {
  if (!date) {
    return emptyMessage;
  }

  try {
    const res = format(new Date(date), pattern);
    return res;
  } catch (error) {
    return emptyMessage;
  }
};
