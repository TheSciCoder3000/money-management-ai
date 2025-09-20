import React, { useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DatePickerProps {
  onValueChange?: (date: DateRange | undefined) => void;
}
const DateRangePicker: React.FC<DatePickerProps> = ({ onValueChange }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (onValueChange) onValueChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit pl-3 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {date?.from && date?.to ? (
            `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd")}`
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
