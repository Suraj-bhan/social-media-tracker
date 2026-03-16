'use client'

import * as React from 'react'
import { CalendarIcon, Clock, X, ChevronDown } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format, subDays, subWeeks, subMonths, startOfDay, endOfDay, isToday, isThisWeek, isThisMonth } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type AdvancedDateFilterValue = {
  from: Date | undefined
  to: Date | undefined
  preset?: string
  timeRange?: 'all-day' | 'business-hours' | 'custom'
}

interface AdvancedDateFilterProps {
  value?: AdvancedDateFilterValue
  onChange?: (value: AdvancedDateFilterValue) => void
  className?: string
}

const datePresets = [
  {
    label: 'Today',
    value: 'today',
    description: 'Posts from today',
    getDateRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    description: 'Posts from yesterday',
    getDateRange: () => {
      const yesterday = subDays(new Date(), 1)
      return {
        from: startOfDay(yesterday),
        to: endOfDay(yesterday),
      }
    },
  },
  {
    label: 'Last 3 days',
    value: '3days',
    description: 'Posts from the last 3 days',
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 2)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'This week',
    value: 'week',
    description: 'Posts from this week',
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last week',
    value: 'lastweek',
    description: 'Posts from last week',
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 13)),
      to: endOfDay(subDays(new Date(), 7)),
    }),
  },
  {
    label: 'This month',
    value: 'month',
    description: 'Posts from this month',
    getDateRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 3 months',
    value: '3months',
    description: 'Posts from the last 3 months',
    getDateRange: () => ({
      from: startOfDay(subMonths(new Date(), 3)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 6 months',
    value: '6months',
    description: 'Posts from the last 6 months',
    getDateRange: () => ({
      from: startOfDay(subMonths(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
]

const popularPresets = ['today', 'week', 'month']

export function AdvancedDateFilter({ value, onChange, className }: AdvancedDateFilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  })
  const [isOpen, setIsOpen] = React.useState(false)

  const handlePresetClick = (preset: typeof datePresets[0]) => {
    const range = preset.getDateRange()
    setDate(range)
    onChange?.({
      from: range.from,
      to: range.to,
      preset: preset.value,
      timeRange: value?.timeRange || 'all-day'
    })
    setIsOpen(false)
  }

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    onChange?.({
      from: selectedDate?.from,
      to: selectedDate?.to,
      preset: undefined,
      timeRange: value?.timeRange || 'all-day'
    })
  }

  const handleClear = () => {
    setDate(undefined)
    onChange?.({
      from: undefined,
      to: undefined,
      preset: undefined,
      timeRange: 'all-day'
    })
    setIsOpen(false)
  }

  const formatDateRange = () => {
    if (!date?.from) return 'Select date range'

    if (value?.preset) {
      const preset = datePresets.find(p => p.value === value.preset)
      if (preset) return preset.label
    }

    if (date.from && date.to) {
      if (date.from.getTime() === date.to.getTime()) {
        return format(date.from, 'MMM dd, yyyy')
      }
      return `${format(date.from, 'MMM dd')} - ${format(date.to, 'MMM dd, yyyy')}`
    }

    return format(date.from, 'MMM dd, yyyy')
  }

  const getPresetStats = (preset: typeof datePresets[0]) => {
    // This would typically come from your data
    const mockCounts = {
      'today': 12,
      'yesterday': 8,
      '3days': 24,
      'week': 45,
      'lastweek': 38,
      'month': 156,
      '3months': 423,
      '6months': 892,
    }
    return mockCounts[preset.value as keyof typeof mockCounts] || 0
  }

  return (
    <div className={cn('grid gap-2 w-full', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-between text-left font-normal min-w-0',
              !date?.from && 'text-muted-foreground'
            )}
          >
            <div className="flex items-center min-w-0 flex-1">
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{formatDateRange()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 max-w-[95vw]" align="start" sideOffset={4}>
          <div className="flex flex-col lg:flex-row max-w-[800px]">
            {/* Quick Presets */}
            <div className="flex flex-col border-r lg:border-r lg:border-b-0 border-b lg:min-w-[200px] w-full lg:w-auto">
              <div className="p-3 pb-2">
                <h4 className="font-medium text-sm mb-3 text-foreground">Popular ranges</h4>
                <div className="space-y-1">
                  {datePresets
                    .filter(preset => popularPresets.includes(preset.value))
                    .map((preset) => {
                      const isSelected = value?.preset === preset.value
                      const count = getPresetStats(preset)

                      return (
                        <Button
                          key={preset.value}
                          variant={isSelected ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full justify-between text-left"
                          onClick={() => handlePresetClick(preset)}
                        >
                          <span>{preset.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                        </Button>
                      )
                    })}
                </div>

                <Separator className="my-3" />

                <h4 className="font-medium text-sm mb-3 text-foreground">All ranges</h4>
                <div className="space-y-1 max-h-[150px] overflow-y-auto">
                  {datePresets.map((preset) => {
                    const isSelected = value?.preset === preset.value
                    const count = getPresetStats(preset)

                    return (
                      <Button
                        key={preset.value}
                        variant={isSelected ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-between text-left"
                        onClick={() => handlePresetClick(preset)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-sm">{preset.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {preset.description}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {count}
                        </Badge>
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
                  <X className="w-4 h-4 mr-2" />
                  Clear filter
                </Button>
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3 overflow-hidden">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={1}
                disabled={(date) => date > new Date()}
                className="rounded-md"
              />

              {/* Time Range Selector */}
              <div className="mt-3 pt-3 border-t hidden sm:block">
                <label className="text-sm font-medium mb-2 block">Time of day</label>
                <Select
                  value={value?.timeRange || 'all-day'}
                  onValueChange={(timeRange: 'all-day' | 'business-hours' | 'custom') => {
                    onChange?.({
                      from: date?.from,
                      to: date?.to,
                      preset: value?.preset,
                      timeRange
                    })
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-day">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        All day
                      </div>
                    </SelectItem>
                    <SelectItem value="business-hours">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Business hours (9 AM - 5 PM)
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Custom time range
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Button */}
              <div className="mt-3 pt-3 border-t">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}