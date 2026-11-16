"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Types
export interface DateRange {
  start: Date;
  end: Date;
  id: string;
}

export type SelectionMode = "range" | "individual";

export interface RentalCalendarProps {
  /** Selection mode: 'range' for date ranges, 'individual' for single dates */
  selectionMode?: SelectionMode;
  /** For range mode: array of date ranges */
  selectedRanges?: DateRange[];
  /** For range mode: callback when ranges change */
  onRangesChange?: (ranges: DateRange[]) => void;
  /** For individual mode: array of selected dates */
  selectedDates?: Date[];
  /** For individual mode: callback when dates change */
  onDatesChange?: (dates: Date[]) => void;
  /** Optional: minimum selectable date (defaults to today) */
  minDate?: Date;
  /** Optional: maximum selectable date */
  maxDate?: Date;
  /** Optional: color theme (defaults to dark for backward compatibility) */
  theme?: "dark" | "light";
}

export function RentalCalendar({
  selectionMode = "range",
  selectedRanges = [],
  onRangesChange,
  selectedDates = [],
  onDatesChange,
  minDate,
  maxDate,
  theme = "dark",
}: RentalCalendarProps) {
  const isLight = theme === "light";
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const effectiveMinDate = minDate || today;

  // Global mouse up to handle drag end outside cells
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setSelectionStart(null);
        setHoverDate(null);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    const startPadding = firstDay.getDay();
    for (let i = startPadding - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    const endPadding = 42 - days.length;
    for (let i = 1; i <= endPadding; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  // Range mode helpers
  const isDateInRange = (date: Date, range: DateRange) => {
    const d = date.getTime();
    return d >= range.start.getTime() && d <= range.end.getTime();
  };

  // Check if date is in an existing committed range
  const isDateSelectedInRange = (date: Date) => {
    return selectedRanges.some((range) => isDateInRange(date, range));
  };

  // Check if date is in the current drag selection
  const isDateInPreview = (date: Date) => {
    if (!selectionStart || !hoverDate) return false;
    const d = date.getTime();
    const start = Math.min(selectionStart.getTime(), hoverDate.getTime());
    const end = Math.max(selectionStart.getTime(), hoverDate.getTime());
    return d >= start && d <= end;
  };

  const isRangeStart = (date: Date) => {
    return selectedRanges.some(
      (range) => range.start.toDateString() === date.toDateString()
    );
  };

  const isRangeEnd = (date: Date) => {
    return selectedRanges.some(
      (range) => range.end.toDateString() === date.toDateString()
    );
  };

  // Individual mode helpers
  const isDateSelectedIndividually = (date: Date) => {
    return selectedDates.some((d) => d.toDateString() === date.toDateString());
  };

  // Check if the exact same range already exists (prevent duplicates, not overlaps)
  const isExactRangeDuplicate = (start: Date, end: Date) => {
    return selectedRanges.some(
      (range) =>
        range.start.getTime() === start.getTime() &&
        range.end.getTime() === end.getTime()
    );
  };

  // --- Date Interaction Handlers ---

  const handleDateClick = (date: Date) => {
    if (date < effectiveMinDate) return;
    if (maxDate && date > maxDate) return;

    // Normalize date to local midnight
    const cleanDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // If user clicks a padding day from next or prev month, flip currentMonth
    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }

    if (selectionMode === "individual") {
      // Smart 2-Click Range Selection:
      // 1. If currently 1 date selected and user clicks a different date -> create range
      if (selectedDates.length === 1 && !isDateSelectedIndividually(cleanDate)) {
        const first = selectedDates[0];
        const start = first < cleanDate ? first : cleanDate;
        const end = first < cleanDate ? cleanDate : first;
        const rangeDates: Date[] = [];
        const cur = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const targetEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        while (cur <= targetEnd) {
          rangeDates.push(new Date(cur));
          cur.setDate(cur.getDate() + 1);
        }
        onDatesChange?.(rangeDates);
      } else if (selectedDates.length > 1) {
        // 2. If a range is already selected and user clicks any date -> start fresh selection
        onDatesChange?.([cleanDate]);
      } else {
        // 3. If 0 dates selected or user re-clicks the same single date:
        const isSelected = isDateSelectedIndividually(cleanDate);
        if (isSelected) {
          onDatesChange?.([]);
        } else {
          onDatesChange?.([cleanDate]);
        }
      }
    } else {
      // Range mode (single click when not dragging): create a single-day range
      if (!isDragging) {
        const newRange: DateRange = {
          start: cleanDate,
          end: cleanDate,
          id: `${cleanDate.getTime()}-${cleanDate.getTime()}`,
        };
        if (!isExactRangeDuplicate(cleanDate, cleanDate)) {
          onRangesChange?.([...selectedRanges, newRange]);
        }
      }
    }
  };

  const handleMouseDown = (date: Date) => {
    if (date < effectiveMinDate) return;
    if (maxDate && date > maxDate) return;

    if (selectionMode === "range") {
      setIsDragging(true);
      setSelectionStart(date);
      setHoverDate(date); // Init preview
    }
  };

  const handleMouseEnter = (date: Date) => {
    if (selectionMode === "range" && isDragging && selectionStart) {
      // While dragging, update the end of the preview range
      setHoverDate(date);
    }
  };

  const handleMouseUp = (date: Date) => {
    if (selectionMode === "range" && isDragging && selectionStart) {
      // Finalize range selection
      const start = selectionStart < date ? selectionStart : date;
      const end = selectionStart < date ? date : selectionStart;

      setIsDragging(false);
      setSelectionStart(null);
      setHoverDate(null);

      // Validate range: duplicates
      if (isExactRangeDuplicate(start, end)) {
        return;
      }

      const newRange: DateRange = {
        start,
        end,
        id: `${start.getTime()}-${end.getTime()}`,
      };

      onRangesChange?.([...selectedRanges, newRange]);
    }
  };

  const removeRange = (id: string) => {
    onRangesChange?.(selectedRanges.filter((r) => r.id !== id));
  };

  const removeDate = (date: Date) => {
    onDatesChange?.(
      selectedDates.filter((d) => d.toDateString() !== date.toDateString())
    );
  };

  // --- Touch Interaction Handlers ---

  const getTargetDateFromTouch = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return null;

    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return null;

    // Find the closest button with data-date attribute
    const button = element.closest("button[data-date]");
    if (!button) return null;

    const dateStr = button.getAttribute("data-date");
    if (!dateStr) return null;

    return new Date(dateStr);
  };

  const handleTouchStart = (e: React.TouchEvent, date: Date) => {
    // Prevent default to stop scrolling/zooming while interacting with calendar
    // But maybe let it scroll if purely tapping?
    // For drag-to-select, we usually want to prevent scroll.
    // e.preventDefault(); // Moved to individual call sites if needed, or handle carefully.

    // Logic same as mouse down
    handleMouseDown(date);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent scrolling while dragging
    if (isDragging) {
      e.preventDefault();
      const date = getTargetDateFromTouch(e);
      if (date) {
        handleMouseEnter(date);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // For touch end, touches list is empty, use changedTouches or state
    // We rely on current state (selectionStart) and the last hovered date is implicit?
    // Actually handleMouseUp needs a 'date'.
    // In drag mode, 'handleMouseUp' uses 'date' to finalize range.
    // But 'hoverDate' tracks the current end.
    // We can modify handleMouseUp to use hoverDate if date is not passed/available?
    // Or we just rely on the last successful touchMove updating hoverDate,
    // and we need to pass 'hoverDate' to the finalizer logic.

    if (
      selectionMode === "range" &&
      isDragging &&
      selectionStart &&
      hoverDate
    ) {
      // logic from handleMouseUp using hoverDate as 'date'
      const date = hoverDate;
      const start = selectionStart < date ? selectionStart : date;
      const end = selectionStart < date ? date : selectionStart;

      setIsDragging(false);
      setSelectionStart(null);
      setHoverDate(null);

      if (isExactRangeDuplicate(start, end)) return;

      const newRange: DateRange = {
        start,
        end,
        id: `${start.getTime()}-${end.getTime()}`,
      };

      onRangesChange?.([...selectedRanges, newRange]);
    } else if (isDragging) {
      // Reset if invalid
      setIsDragging(false);
      setSelectionStart(null);
      setHoverDate(null);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isLight) {
    return (
      <div className="w-full select-none">
        {/* Tactile Calendar Sheet Top Header Bar */}
        <div className="bg-[#18181B] text-white px-4 sm:px-6 py-4 rounded-t-2xl border-b-2 border-[#FF5500] flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
              )
            }
            aria-label="Previous month"
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-[#FF5500] text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h3 className="font-sans text-lg sm:text-2xl font-extrabold tracking-tight text-white">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
              )
            }
            aria-label="Next month"
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-[#FF5500] text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Printed Calendar Weekday Strip */}
        <div className="grid grid-cols-7 bg-[#FAF8F5] border-x border-b border-[#E8E2D9]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
            <div
              key={day}
              className={cn(
                "text-center py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold border-r last:border-r-0 border-[#E8E2D9]",
                idx === 0 ? "text-[#FF5500]" : "text-[#111315]"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Crisp 1px Cell-Bordered Calendar Grid Sheet */}
        <div
          className="grid grid-cols-7 gap-px bg-[#E8E2D9] border-x border-b border-[#E8E2D9] rounded-b-2xl overflow-hidden touch-none shadow-xs"
          onMouseLeave={() => {
            // Handled via global mouseup listener
          }}
        >
          {days.map((date, idx) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const isPast = date < effectiveMinDate;
            const isFuture = maxDate ? date > maxDate : false;
            const isDisabled = isPast || isFuture;

            const selected =
              selectionMode === "range"
                ? isDateSelectedInRange(date)
                : isDateSelectedIndividually(date);
            const preview = selectionMode === "range" && isDateInPreview(date);
            const rangeStart = selectionMode === "range" && isRangeStart(date);
            const rangeEnd = selectionMode === "range" && isRangeEnd(date);
            const isDragStart =
              selectionMode === "range" &&
              selectionStart?.toDateString() === date.toDateString();

            const sortedIndividual =
              selectionMode === "individual"
                ? [...selectedDates].sort((a, b) => a.getTime() - b.getTime())
                : [];
            const isFirstIndividual =
              selectionMode === "individual" &&
              selected &&
              sortedIndividual[0]?.toDateString() === date.toDateString();
            const isLastIndividual =
              selectionMode === "individual" &&
              selected &&
              sortedIndividual[sortedIndividual.length - 1]?.toDateString() === date.toDateString();
            const isMidIndividual =
              selectionMode === "individual" &&
              selected &&
              !isFirstIndividual &&
              !isLastIndividual;

            const isHighlightedEnd =
              isDragStart ||
              rangeStart ||
              rangeEnd ||
              isFirstIndividual ||
              isLastIndividual;

            const isMidRange =
              (selectionMode === "range" &&
                (selected || preview) &&
                !rangeStart &&
                !rangeEnd &&
                !isDragStart) ||
              isMidIndividual;

            return (
              <button
                key={idx}
                type="button"
                data-date={date.toISOString()}
                onClick={() => handleDateClick(date)}
                onMouseDown={(e) => {
                  if (selectionMode === "range") {
                    e.preventDefault();
                    handleMouseDown(date);
                  }
                }}
                onMouseEnter={() => handleMouseEnter(date)}
                onMouseUp={() => {
                  if (selectionMode === "range") {
                    handleMouseUp(date);
                  }
                }}
                onTouchStart={(e) => {
                  if (selectionMode === "range") {
                    handleTouchStart(e, date);
                  }
                }}
                onTouchMove={(e) => {
                  if (selectionMode === "range") {
                    handleTouchMove(e);
                  }
                }}
                onTouchEnd={(e) => {
                  if (selectionMode === "range") {
                    handleTouchEnd(e);
                  }
                }}
                disabled={isDisabled}
                className={cn(
                  "h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center text-sm sm:text-base font-bold transition-colors relative select-none",
                  isHighlightedEnd
                    ? "bg-[#FF5500] text-white font-black"
                    : isMidRange
                    ? "bg-[#FFE7D6] text-[#C74000] font-bold"
                    : isDisabled
                    ? "bg-[#FAF8F5] text-[#8C857B] cursor-not-allowed"
                    : !isCurrentMonth
                    ? "bg-[#FAF8F5]/60 text-[#A8A29E] hover:bg-white hover:text-[#111315] cursor-pointer"
                    : isToday
                    ? "bg-[#FFF5EE] text-[#FF5500] font-black hover:bg-[#FF5500] hover:text-white cursor-pointer"
                    : "bg-white text-[#111315] hover:bg-[#FFF5EE] hover:text-[#FF5500] cursor-pointer"
                )}
              >
                <span>{date.getDate()}</span>
                {isToday && (
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-0.5",
                      isHighlightedEnd ? "bg-white" : "bg-[#FF5500]"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Ranges Display */}
        {selectionMode === "range" && selectedRanges.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {selectedRanges.map((range) => (
              <div
                key={range.id}
                className="flex items-center gap-2.5 bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#111315] px-4 py-2 rounded-full"
              >
                <span className="text-xs sm:text-sm font-bold">
                  {range.start.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  {" → "}
                  {range.end.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
                <button
                  type="button"
                  onClick={() => removeRange(range.id)}
                  className="text-[#FF5500] hover:text-[#111315] transition-colors cursor-pointer"
                  aria-label="Remove range"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Dates Display */}
        {selectionMode === "individual" && selectedDates.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {[...selectedDates]
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date) => (
                <div
                  key={date.toISOString()}
                  className="flex items-center gap-2 bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#111315] px-3.5 py-1.5 rounded-full"
                >
                  <span className="text-xs sm:text-sm font-bold">
                    {date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDate(date)}
                    className="text-[#FF5500] hover:text-[#111315] transition-colors cursor-pointer"
                    aria-label="Remove date"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        )}

        {selectionMode === "range" && isDragging && (
          <p className="text-[#FF5500] mt-4 text-sm font-semibold text-center animate-pulse">
            Release to select range
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
            )
          }
          aria-label="Previous month"
          className={cn(
            "transition-all p-2.5 sm:p-3 rounded-xl cursor-pointer",
            isLight
              ? "bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315] hover:border-[#FF5500] hover:text-[#FF5500]"
              : "text-white/50 hover:text-[#00ff8f]"
          )}
        >
          <svg
            className={cn(isLight ? "w-5 h-5 sm:w-6 sm:h-6" : "w-8 h-8")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3
          className={cn(
            "font-bold tracking-tight",
            isLight
              ? "text-xl sm:text-2xl md:text-3xl text-[#111315] font-sans"
              : "text-4xl md:text-5xl text-white font-['Poppins',sans-serif]"
          )}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            )
          }
          aria-label="Next month"
          className={cn(
            "transition-all p-2.5 sm:p-3 rounded-xl cursor-pointer",
            isLight
              ? "bg-[#FAF8F5] border border-[#E8E2D9] text-[#111315] hover:border-[#FF5500] hover:text-[#FF5500]"
              : "text-white/50 hover:text-[#00ff8f]"
          )}
        >
          <svg
            className={cn(isLight ? "w-5 h-5 sm:w-6 sm:h-6" : "w-8 h-8")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={cn(
              "text-center py-2",
              isLight
                ? "text-[#524E48] font-mono text-xs uppercase tracking-wider font-bold"
                : "text-white/30 text-sm md:text-base font-medium"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className="grid grid-cols-7 gap-1 sm:gap-2 touch-none"
        onMouseLeave={() => {
          // Handled via global mouseup listener
        }}
      >
        {days.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = date < effectiveMinDate;
          const isFuture = maxDate ? date > maxDate : false;
          const isDisabled = isPast || isFuture;

          const selected =
            selectionMode === "range"
              ? isDateSelectedInRange(date)
              : isDateSelectedIndividually(date);
          const preview = selectionMode === "range" && isDateInPreview(date);
          const rangeStart = selectionMode === "range" && isRangeStart(date);
          const rangeEnd = selectionMode === "range" && isRangeEnd(date);

          const isDragStart =
            selectionMode === "range" &&
            selectionStart?.toDateString() === date.toDateString();

          return (
            <button
              key={idx}
              type="button"
              data-date={date.toISOString()}
              onClick={() => handleDateClick(date)}
              onMouseDown={(e) => {
                if (selectionMode === "range") {
                  e.preventDefault();
                  handleMouseDown(date);
                }
              }}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseUp={() => {
                if (selectionMode === "range") {
                  handleMouseUp(date);
                }
              }}
              onTouchStart={(e) => {
                if (selectionMode === "range") {
                  handleTouchStart(e, date);
                }
              }}
              onTouchMove={(e) => {
                if (selectionMode === "range") {
                  handleTouchMove(e);
                }
              }}
              onTouchEnd={(e) => {
                if (selectionMode === "range") {
                  handleTouchEnd(e);
                }
              }}
              disabled={isDisabled}
              className={cn(
                "aspect-square flex items-center justify-center transition-all duration-150 relative select-none",
                isLight
                  ? "text-sm sm:text-base font-semibold rounded-xl"
                  : "text-lg md:text-xl font-medium",
                !isCurrentMonth && (isLight ? "text-[#B5AEA4]" : "opacity-20"),
                isDisabled &&
                  (isLight
                    ? "cursor-not-allowed text-[#8C857B] bg-[#FAF8F5]/70"
                    : "opacity-10 cursor-not-allowed"),

                // Drag start indicator
                isDragStart &&
                  (isLight
                    ? "bg-[#FF5500] text-white font-bold rounded-l-xl"
                    : "bg-[#00ff8f] text-black font-bold rounded-l-lg"),

                // Range start and end dates
                rangeStart &&
                  (isLight
                    ? "rounded-l-xl bg-[#FF5500] text-white font-bold"
                    : "rounded-l-lg bg-[#00ff8f] text-black font-bold"),
                rangeEnd &&
                  (isLight
                    ? "rounded-r-xl bg-[#FF5500] text-white font-bold"
                    : "rounded-r-lg bg-[#00ff8f] text-black font-bold"),

                // Range middle
                selectionMode === "range" &&
                  (selected || preview) &&
                  !rangeStart &&
                  !rangeEnd &&
                  !isDragStart &&
                  (isLight
                    ? "bg-[#FF5500]/15 text-[#FF5500] font-bold"
                    : "bg-brand-green-dark text-white"),

                // Individual mode selected
                selectionMode === "individual" &&
                  selected &&
                  (isLight
                    ? "rounded-xl bg-[#FF5500] text-white font-bold shadow-md shadow-[#FF5500]/25"
                    : "rounded-lg bg-[#00ff8f] text-black font-bold"),

                // Today indicator
                isToday &&
                  !selected &&
                  !preview &&
                  !isDragStart &&
                  (isLight
                    ? "text-[#FF5500] ring-1 ring-[#FF5500]/45 bg-[#FF5500]/[0.05] font-bold"
                    : "text-[#00ff8f]"),

                // Default interactive tile
                !selected &&
                  !preview &&
                  !isDragStart &&
                  isCurrentMonth &&
                  !isDisabled &&
                  (isLight
                    ? "text-[#111315] hover:bg-[#FAF8F5] hover:text-[#FF5500] border border-transparent hover:border-[#E8E2D9] cursor-pointer"
                    : "text-white hover:text-[#00ff8f]")
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selected Ranges Display - Range Mode */}
      {selectionMode === "range" && selectedRanges.length > 0 && (
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
          {selectedRanges.map((range) => (
            <div
              key={range.id}
              className={cn(
                "flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl",
                isLight
                  ? "bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#111315]"
                  : "bg-brand-green text-black"
              )}
            >
              <span className="text-sm sm:text-base font-semibold">
                {range.start.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
                {" → "}
                {range.end.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <button
                type="button"
                onClick={() => removeRange(range.id)}
                className={cn(
                  "transition-colors cursor-pointer",
                  isLight
                    ? "text-[#FF5500] hover:text-[#111315]"
                    : "text-black/60 hover:text-black"
                )}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected Dates Display - Individual Mode */}
      {selectionMode === "individual" && selectedDates.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {[...selectedDates]
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date) => (
              <div
                key={date.toISOString()}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-full",
                  isLight
                    ? "bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#111315]"
                    : "bg-brand-green text-black rounded-xl"
                )}
              >
                <span className="text-xs sm:text-sm font-semibold">
                  {date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <button
                  type="button"
                  onClick={() => removeDate(date)}
                  className={cn(
                    "transition-colors cursor-pointer",
                    isLight
                      ? "text-[#FF5500] hover:text-[#111315]"
                      : "text-black/60 hover:text-black"
                  )}
                  aria-label="Remove date"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Helper text for range mode */}
      {selectionMode === "range" && isDragging && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg text-center animate-pulse",
            isLight ? "text-[#FF5500]" : "text-[#00ff8f]/60"
          )}
        >
          Release to select range
        </p>
      )}
    </div>
  );
}
