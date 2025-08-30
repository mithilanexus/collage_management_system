"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const DatePicker = ({
    label,
    value,
    onChange,
    placeholder = "Select date",
    required = false,
    className,
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <Label htmlFor="date-picker" className="px-1">
                    {label} {required && "*"}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date-picker"
                        variant="outline"
                        className={cn(
                            "w-full justify-between font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? format(value, "PPP") : placeholder}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onChange(date)
                            setOpen(false) // closes after selecting
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
