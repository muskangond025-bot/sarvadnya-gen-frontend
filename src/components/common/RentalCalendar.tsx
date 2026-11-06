"use client";

import { useState } from "react";
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
}

export function RentalCalendar({
  selectionMode = "range",
  selectedRanges = [],
  onRangesChange,
  selectedDates = [],
  onDatesChange,
  minDate,
  maxDate,
}: RentalCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const effectiveMinDate = minDate || today;

  // Global mouse up to handle drag end outside cells
  useState(() => {
    if (typeof window !== "undefined") {
      const handleGlobalMouseUp = () => {
        if (isDragging) {
          setIsDragging(false);
          setSelectionStart(null);
          setHoverDate(null);
        }
      };
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  });

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

  const handleMouseDown = (date: Date) => {
    if (date < effectiveMinDate) return;
    if (maxDate && date > maxDate) return;

    if (selectionMode === "individual") {
      // Individual mode: select/deselect immediately
      const isSelected = isDateSelectedIndividually(date);
      if (isSelected) {
        onDatesChange?.(
          selectedDates.filter((d) => d.toDateString() !== date.toDateString())
        );
      } else {
        onDatesChange?.([...selectedDates, date]);
      }
    } else {
      // Range mode: Start dragging
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

  return (
    <div className="w-full ">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
          className="text-white/50 hover:text-[#00ff8f] transition-colors p-3"
        >
          <svg
            className="w-8 h-8"
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
        <h3 className="text-4xl md:text-5xl font-bold text-white font-['Poppins',sans-serif]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
            )
          }
          className="text-white/50 hover:text-[#00ff8f] transition-colors p-3"
        >
          <svg
            className="w-8 h-8"
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
      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-white/30 text-sm md:text-base py-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className="grid grid-cols-7 gap-1 touch-none" // touch-none is important to prevent browser processing touches
        onMouseLeave={() => {
          // If mouse leaves the entire grid while dragging, we could choose to cancel or keep dragging.
          // For simplicity, let's keep dragging enabled so you can re-enter.
          // Or strictly relying on global mouseup.
        }}
      >
        {days.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = date < effectiveMinDate;
          const isFuture = maxDate ? date > maxDate : false;
          const isDisabled = isPast || isFuture;

          // Selection state based on mode
          const selected =
            selectionMode === "range"
              ? isDateSelectedInRange(date)
              : isDateSelectedIndividually(date);
          const preview = selectionMode === "range" && isDateInPreview(date);
          const rangeStart = selectionMode === "range" && isRangeStart(date);
          const rangeEnd = selectionMode === "range" && isRangeEnd(date);

          // Is this date the start of the current drag selection?
          const isDragStart =
            selectionMode === "range" &&
            selectionStart?.toDateString() === date.toDateString();

          return (
            <button
              key={idx}
              data-date={date.toISOString()}
              onMouseDown={(e) => {
                e.preventDefault();
                handleMouseDown(date);
              }}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseUp={() => handleMouseUp(date)}
              // Touch Events
              onTouchStart={(e) => {
                // allow scroll if not valid date? no, prevent default for drag intent
                // only prevent default if we actually start a drag?
                // Let's try preventing mostly to simulate robust app feel.
                // Actually for a calendar grid, scroll is usually vertical outside grid.
                // Inside grid, touchmove should correspond to selection.
                // e.preventDefault(); // handled in handler if needed
                handleTouchStart(e, date);
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              disabled={isDisabled}
              className={cn(
                "aspect-square flex items-center justify-center text-lg md:text-xl font-medium transition-all duration-150 relative select-none", // Added select-none
                !isCurrentMonth && "opacity-20",
                isDisabled && "opacity-10 cursor-not-allowed",

                // Drag start indicator
                isDragStart && "bg-[#00ff8f] text-black font-bold rounded-l-lg",

                // Range start and end dates (committed)
                rangeStart && "rounded-l-lg bg-[#00ff8f] text-black font-bold",
                rangeEnd && "rounded-r-lg bg-[#00ff8f] text-black font-bold",

                // Active Drag Preview OR Committed Range Selection (middle parts)
                ((selectionMode === "range" &&
                  (selected || preview) &&
                  !rangeStart &&
                  !rangeEnd &&
                  !isDragStart) ||
                  (selectionMode === "individual" && selected)) &&
                  "bg-brand-green-dark text-white",

                // Individual mode selected - round corners
                selectionMode === "individual" &&
                  selected &&
                  "rounded-lg bg-[#00ff8f] text-black font-bold",

                // Today indicator
                isToday &&
                  !selected &&
                  !preview &&
                  !isDragStart &&
                  "text-[#00ff8f]",

                // Default hover state
                !selected &&
                  !preview &&
                  !isDragStart &&
                  isCurrentMonth &&
                  !isDisabled &&
                  "text-white hover:text-[#00ff8f]"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selected Ranges Display - Range Mode */}
      {selectionMode === "range" && selectedRanges.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {selectedRanges.map((range) => (
            <div
              key={range.id}
              className="flex items-center gap-4 bg-brand-green px-6 py-3 rounded-xl"
            >
              <span className="text-black text-base md:text-lg font-semibold">
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
                onClick={() => removeRange(range.id)}
                className="text-black/60 hover:text-black transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
        <div className="mt-8 flex flex-wrap gap-3">
          {selectedDates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date) => (
              <div
                key={date.toISOString()}
                className="flex items-center gap-3 bg-brand-green px-4 py-2 rounded-xl"
              >
                <span className="text-black text-base font-semibold">
                  {date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <button
                  onClick={() => removeDate(date)}
                  className="text-black/60 hover:text-black transition-colors"
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

      {/* Helper text for range mode */}
      {selectionMode === "range" && isDragging && (
        <p className="text-[#00ff8f]/60 mt-4 text-lg text-center animate-pulse">
          Release to select range
        </p>
      )}
    </div>
  );
}
