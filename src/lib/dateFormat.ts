import { format } from "date-fns";

export const timeOfTheDay = (date: Date) => format(date, "HH:mm");
