'use client'

import * as React from 'react'
import { Calendar, CalendarDays, Clock } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format, subDays, subWeeks, subMonths, startOfDay, endOfDay } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type DateFilterValue = {
  from: Date | undefined
  to: Date | undefined
  preset?: string
}

interface DateFilterProps {
  value?: DateFilterValue
  onChange?: (value: DateFilterValue) => void
  className?: string
}

const presets = [
  {
    label: 'Today',
    value: 'today',
    icon: Clock,
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 7 days',
    value: 'week',
    icon: CalendarDays,
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 30 days',
    value: 'month',
    icon: Calendar,
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 3 months',
    value: '3months',
    icon: Calendar,
    getDateRange: () => ({
      from: startOfDay(subMonths(new Date(), 3)),
      to: endOfDay(new Date()),
    }),
  },
]

export function DateFilter({ value, onChange, className }: DateFilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  })

  const handlePresetClick = (preset: typeof presets[0]) => {
    const range = preset.getDateRange()
    setDate(range)
    onChange?.({
      from: range.from,
      to: range.to,
      preset: preset.value,
    })
  }

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    onChange?.({
      from: selectedDate?.from,
      to: selectedDate?.to,
      preset: undefined,
    })
  }

  const handleClear = () => {
    setDate(undefined)
    onChange?.({
      from: undefined,
      to: undefined,
      preset: undefined,
    })
  }

  const formatDateRange = () => {
    if (!date?.from) return 'Pick a date range'

    if (value?.preset) {
      const preset = presets.find(p => p.value === value.preset)
      if (preset) return preset.label
    }

    if (date.from && date.to) {
      return `${format(date.from, 'MMM dd')} - ${format(date.to, 'MMM dd')}`
    }

    return format(date.from, 'MMM dd, yyyy')
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !date?.from && 'text-muted-foreground'
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Preset buttons */}
            <div className="flex flex-col border-r">
              <div className="p-3">
                <h4 className="font-medium text-sm mb-3">Quick select</h4>
                <div className="space-y-1">
                  {presets.map((preset) => {
                    const Icon = preset.icon
                    const isSelected = value?.preset === preset.value

                    return (
                      <Button
                        key={preset.value}
                        variant={isSelected ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handlePresetClick(preset)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {preset.label}
                      </Button>
                    )
                  })}
                </div>

                <Separator className="my-3" />

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground"
                  onClick={handleClear}
                >
                  Clear filter
                </Button>
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={1}
                disabled={(date) => date > new Date()}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}