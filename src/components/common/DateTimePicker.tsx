"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
export type PickerMode = "time" | "date" | "datetime";

export interface DateTimePickerProps {
  mode?: PickerMode;
  value?: { date?: Date; time?: string };
  onChange?: (value: { date?: Date; time?: string }) => void;
  minDate?: Date;
  maxDate?: Date;
  is24Hour?: boolean;
  placeholder?: string;
  className?: string;
}

// Format helpers
const formatTime = (hours: number, minutes: number, is24Hour: boolean) => {
  if (is24Hour) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const parseTime = (timeStr: string): { hours: number; minutes: number } => {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) return { hours: hours + 12, minutes };
  if (period === "AM" && hours === 12) return { hours: 0, minutes };
  return { hours, minutes };
};

// Clock Face Component (Google Pixel style)
function ClockFace({
  value,
  onChange,
  selectingMinutes,
  is24Hour,
}: {
  value: { hours: number; minutes: number };
  onChange: (value: { hours: number; minutes: number }) => void;
  selectingMinutes: boolean;
  is24Hour: boolean;
}) {
  const numbers = selectingMinutes
    ? [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
    : is24Hour
    ? [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ]
    : [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const currentValue = selectingMinutes ? value.minutes : value.hours;
  const radius = 110;
  const innerRadius = is24Hour && !selectingMinutes ? 70 : radius;

  const getPosition = (index: number, total: number, r: number) => {
    const angle = (index * 360) / total - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * r,
      y: Math.sin(rad) * r,
    };
  };

  const handleClick = (num: number) => {
    if (selectingMinutes) {
      onChange({ ...value, minutes: num });
    } else {
      onChange({ ...value, hours: num });
    }
  };

  // Calculate hand angle
  const getHandAngle = () => {
    if (selectingMinutes) {
      return (value.minutes / 60) * 360 - 90;
    }
    if (is24Hour) {
      return ((value.hours % 12) / 12) * 360 - 90;
    }
    return ((value.hours % 12) / 12) * 360 - 90;
  };

  const handAngle = getHandAngle();
  const handLength = selectingMinutes
    ? radius - 20
    : (is24Hour && value.hours > 11 ? innerRadius : radius) - 20;

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Clock background */}
      <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10" />

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00ff8f] z-20" />

      {/* Clock hand */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-[#00ff8f] z-10"
        style={{
          width: handLength + 20,
          transformOrigin: "0 50%",
        }}
        animate={{
          rotate: handAngle,
          x: "-0%",
          y: "-50%",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Hand end circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#00ff8f] translate-x-[50%]" />
      </motion.div>

      {/* Numbers - Inner ring for 24h mode (13-23, 0) */}
      {is24Hour && !selectingMinutes && (
        <>
          {[0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num, idx) => {
            const pos = getPosition(idx, 12, innerRadius);
            const isSelected = value.hours === num;
            return (
              <motion.button
                key={`inner-${num}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClick(num)}
                className={`absolute flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full transition-colors z-30 ${
                  isSelected
                    ? "bg-[#00ff8f] text-black"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                style={{
                  left: `calc(50% + ${pos.x}px - 16px)`,
                  top: `calc(50% + ${pos.y}px - 16px)`,
                }}
              >
                {num}
              </motion.button>
            );
          })}
        </>
      )}

      {/* Numbers - Outer ring */}
      {(selectingMinutes
        ? numbers
        : is24Hour
        ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        : numbers
      ).map((num, idx) => {
        const total = selectingMinutes ? 12 : 12;
        const pos = getPosition(idx, total, radius);
        const isSelected = selectingMinutes
          ? value.minutes === num
          : value.hours === num || (is24Hour && value.hours === num);
        const displayNum = selectingMinutes
          ? num.toString().padStart(2, "0")
          : num;

        return (
          <motion.button
            key={num}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(num)}
            className={`absolute flex items-center justify-center w-10 h-10 text-lg font-medium rounded-full transition-colors z-30 ${
              isSelected
                ? "bg-[#00ff8f] text-black"
                : "text-white hover:bg-white/10"
            }`}
            style={{
              left: `calc(50% + ${pos.x}px - 20px)`,
              top: `calc(50% + ${pos.y}px - 20px)`,
            }}
          >
            {displayNum}
          </motion.button>
        );
      })}
    </div>
  );
}

// Mini Calendar Component
function MiniCalendar({
  value,
  onChange,
  minDate,
  maxDate,
}: {
  value: Date | undefined;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [viewDate, setViewDate] = useState(value || new Date());

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === viewDate.getMonth() &&
      value.getFullYear() === viewDate.getFullYear()
    );
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const disabled = isDateDisabled(date);
    days.push(
      <motion.button
        key={day}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={() => !disabled && onChange(date)}
        disabled={disabled}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
          isSelected(day)
            ? "bg-[#00ff8f] text-black"
            : isToday(day)
            ? "border border-[#00ff8f] text-[#00ff8f]"
            : disabled
            ? "text-white/20 cursor-not-allowed"
            : "text-white hover:bg-white/10"
        }`}
      >
        {day}
      </motion.button>
    );
  }

  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
        </motion.button>
        <span className="text-white font-semibold">
          {viewDate.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
        </motion.button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div
            key={idx}
            className="w-9 h-9 flex items-center justify-center text-white/40 text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
}

// Main DateTimePicker Component
export function DateTimePicker({
  mode = "time",
  value,
  onChange,
  minDate,
  maxDate,
  is24Hour = false,
  placeholder = "Select...",
  className = "",
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"date" | "time">(
    mode === "time" ? "time" : "date"
  );
  const [selectingMinutes, setSelectingMinutes] = useState(false);
  const [tempTime, setTempTime] = useState<{ hours: number; minutes: number }>({
    hours: value?.time ? parseTime(value.time).hours : 8,
    minutes: value?.time ? parseTime(value.time).minutes : 0,
  });
  const [tempDate, setTempDate] = useState<Date | undefined>(value?.date);
  const [period, setPeriod] = useState<"AM" | "PM">(
    value?.time ? (parseTime(value.time).hours >= 12 ? "PM" : "AM") : "AM"
  );

  const displayValue = useMemo(() => {
    const parts: string[] = [];
    if ((mode === "date" || mode === "datetime") && value?.date) {
      parts.push(
        value.date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
    if ((mode === "time" || mode === "datetime") && value?.time) {
      parts.push(value.time);
    }
    return parts.length > 0 ? parts.join(" • ") : placeholder;
  }, [mode, value, placeholder]);

  const handleTimeChange = useCallback(
    (newTime: { hours: number; minutes: number }) => {
      setTempTime(newTime);
    },
    []
  );

  const handleHoursClick = () => {
    setSelectingMinutes(false);
  };

  const handleMinutesClick = () => {
    setSelectingMinutes(true);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    if (!is24Hour) {
      let newHours = tempTime.hours;
      if (newPeriod === "PM" && tempTime.hours < 12) {
        newHours = tempTime.hours + 12;
      } else if (newPeriod === "AM" && tempTime.hours >= 12) {
        newHours = tempTime.hours - 12;
      }
      setTempTime({ ...tempTime, hours: newHours });
    }
  };

  const handleConfirm = () => {
    const timeStr = formatTime(tempTime.hours, tempTime.minutes, is24Hour);
    onChange?.({
      date: tempDate,
      time: mode !== "date" ? timeStr : undefined,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setTempTime({
      hours: value?.time ? parseTime(value.time).hours : 8,
      minutes: value?.time ? parseTime(value.time).minutes : 0,
    });
    setTempDate(value?.date);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full p-4 bg-black text-left rounded-xl border border-white/10 flex items-center justify-between hover:border-[#00ff8f]/50 transition-colors"
      >
        <span
          className={
            value?.date || value?.time ? "text-white" : "text-white/40"
          }
        >
          {displayValue}
        </span>
        <svg
          className="w-5 h-5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mode === "time" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          )}
        </svg>
      </motion.button>

      {/* Picker Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-black border border-white/10 rounded-3xl p-6 z-50"
            >
              {/* Mode Tabs (for datetime mode) */}
              {mode === "datetime" && (
                <div className="flex gap-2 mb-6">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("date")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "date"
                        ? "bg-[#00ff8f] text-black"
                        : "border border-white/10 text-white hover:border-white/20"
                    }`}
                  >
                    Date
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("time")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      activeTab === "time"
                        ? "bg-[#00ff8f] text-black"
                        : "border border-white/10 text-white hover:border-white/20"
                    }`}
                  >
                    Time
                  </motion.button>
                </div>
              )}

              {/* Time Picker */}
              {(mode === "time" ||
                (mode === "datetime" && activeTab === "time")) && (
                <div className="space-y-6">
                  {/* Time Display */}
                  <div className="flex items-center justify-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleHoursClick}
                      className={`text-6xl font-light px-4 py-2 rounded-xl transition-colors ${
                        !selectingMinutes
                          ? "bg-[#00ff8f]/20 text-[#00ff8f]"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {is24Hour
                        ? tempTime.hours.toString().padStart(2, "0")
                        : (tempTime.hours % 12 || 12)
                            .toString()
                            .padStart(2, "0")}
                    </motion.button>
                    <span className="text-6xl font-light text-white/40">:</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMinutesClick}
                      className={`text-6xl font-light px-4 py-2 rounded-xl transition-colors ${
                        selectingMinutes
                          ? "bg-[#00ff8f]/20 text-[#00ff8f]"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {tempTime.minutes.toString().padStart(2, "0")}
                    </motion.button>

                    {/* AM/PM Toggle */}
                    {!is24Hour && (
                      <div className="flex flex-col gap-1 ml-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlePeriodChange("AM")}
                          className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                            period === "AM"
                              ? "bg-[#00ff8f] text-black"
                              : "text-white/40 hover:text-white"
                          }`}
                        >
                          AM
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlePeriodChange("PM")}
                          className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                            period === "PM"
                              ? "bg-[#00ff8f] text-black"
                              : "text-white/40 hover:text-white"
                          }`}
                        >
                          PM
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Clock Face */}
                  <ClockFace
                    value={tempTime}
                    onChange={handleTimeChange}
                    selectingMinutes={selectingMinutes}
                    is24Hour={is24Hour}
                  />
                </div>
              )}

              {/* Date Picker */}
              {(mode === "date" ||
                (mode === "datetime" && activeTab === "date")) && (
                <MiniCalendar
                  value={tempDate}
                  onChange={setTempDate}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex-1 py-3 border border-white/10 text-white rounded-xl font-medium hover:border-white/20 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-[#00ff8f] text-black rounded-xl font-bold"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DateTimePicker;
