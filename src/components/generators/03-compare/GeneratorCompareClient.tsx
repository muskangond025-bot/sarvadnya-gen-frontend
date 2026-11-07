"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Fuel,
  Volume2,
  Shield,
  X,
  Check,
  Zap,
  ChevronDown,
} from "lucide-react";

// Types
interface Generator {
  id: string;
  name: string;
  brand: string;
  kva: string;
  type: string;
  pricePerDay: string;
  runtime: string;
  fuelType: string;
  noiseLevel: string;
  bestFor: string;
  hasAutoStart: boolean;
  hasRemoteMonitoring: boolean;
}

interface GeneratorCompareClientProps {
  generators: Generator[];
}

// Feature labels for comparison
const COMPARISON_FEATURES = [
  { key: "runtime", label: "How Long It Runs", icon: Clock },
  { key: "fuelType", label: "Fuel Type", icon: Fuel },
  { key: "noiseLevel", label: "Noise Level", icon: Volume2 },
  { key: "hasAutoStart", label: "Auto Start", icon: Zap },
  { key: "hasRemoteMonitoring", label: "Remote Monitoring", icon: Shield },
] as const;

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #FF5500 transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #F0ECE1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #FF5500;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #E04400;
  }
`;

// Generator Dropdown with Animations (kept for header selects)
function GeneratorDropdown({
  availableGenerators,
  onSelect,
  placeholder = "Select Generator",
  customTrigger,
}: {
  availableGenerators: Generator[];
  onSelect: (id: string) => void;
  placeholder?: string;
  customTrigger?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${customTrigger ? "w-full h-full" : ""}`}>
      {customTrigger ? (
        <div onClick={() => setIsOpen(!isOpen)} className="w-full h-full">
          {customTrigger}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-6 py-4 text-[18px] text-[#625D55] hover:text-[#FF5500] font-['Outfit',sans-serif] transition-colors"
        >
          <span>{placeholder}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown with animation - opens UPWARD */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-[300px] max-h-[400px] overflow-y-auto bg-white border border-[#E8E2D9] rounded-xl z-50 custom-scrollbar shadow-2xl"
            >
              {availableGenerators.map((gen, index) => (
                <motion.button
                  key={gen.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onSelect(gen.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-6 py-4 hover:bg-[#FAF8F5] transition-colors border-b border-[#E8E2D9] last:border-b-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-[#111315] font-['Poppins',sans-serif]">
                      {gen.kva}
                    </span>
                    <span className="text-[#FF5500] text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-[#71695F] text-[14px] font-['Outfit',sans-serif]">
                      {gen.pricePerDay}/day
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Add Generator Column - Inline list that replaces the card
function AddGeneratorColumn({
  availableGenerators,
  onSelect,
  rowHeights,
}: {
  availableGenerators: Generator[];
  onSelect: (id: string) => void;
  rowHeights: { header: string; row: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      key="add-generator"
      layoutId="add-column"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="border-l border-[#E8E2D9] bg-white"
      style={{ width: "calc(100% / 3)", flexShrink: 0 }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Collapsed state - Show "Add Generator" card
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full p-4"
          >
            <div
              onClick={() => setIsExpanded(true)}
              className="h-full w-full border-2 border-dashed border-[#E8E2D9] rounded-xl flex flex-col items-center justify-center gap-4 hover:border-[#FF5500]/60 hover:bg-[#FAF8F5] transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center group-hover:bg-[#FF5500]/15 transition-colors">
                <span className="text-3xl text-[#8C8275] group-hover:text-[#FF5500] transition-colors">
                  +
                </span>
              </div>
              <span className="text-[#71695F] text-lg font-['Outfit',sans-serif] group-hover:text-[#111315] transition-colors font-medium">
                Add Generator
              </span>
            </div>
          </motion.div>
        ) : (
          // Expanded state - Show generator list in place
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full bg-white"
          >
            {/* Header with close button */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-[#E8E2D9]"
              style={{ height: rowHeights.header }}
            >
              <span className="text-[#111315] text-lg font-['Outfit',sans-serif] font-bold">
                Select Generator
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 text-[#71695F] hover:text-[#111315] transition-colors rounded-full hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Generator List - scrollable */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {availableGenerators.map((gen, index) => (
                <motion.button
                  key={gen.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    onSelect(gen.id);
                    setIsExpanded(false);
                  }}
                  className="w-full text-left px-6 py-4 hover:bg-[#FF5500]/10 transition-colors border-b border-[#E8E2D9] last:border-b-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-[#111315] font-['Poppins',sans-serif]">
                      {gen.kva}
                    </span>
                    <span className="text-[#FF5500] text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-[#71695F] text-[14px] font-['Outfit',sans-serif]">
                      {gen.pricePerDay}/day
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Generator Column - Shows generator info OR selection list (full column transition)
function GeneratorColumn({
  generator,
  availableGenerators,
  selectedIds,
  onReplace,
  onRemove,
  showRemove,
  highlightDifferences,
  selectedGenerators,
  idx,
  rowHeights,
}: {
  generator: Generator;
  availableGenerators: Generator[];
  selectedIds: string[];
  onReplace: (newId: string) => void;
  onRemove: () => void;
  showRemove: boolean;
  highlightDifferences: boolean;
  selectedGenerators: Generator[];
  idx: number;
  rowHeights: { header: string; row: string };
}) {
  const [isChanging, setIsChanging] = useState(false);

  return (
    <motion.div
      key={generator.id}
      layoutId={generator.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 35,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
      }}
      className="border-r border-[#E8E2D9] last:border-r-0 relative bg-white"
      style={{ width: "calc(100% / 3)", flexShrink: 0 }}
    >
      <AnimatePresence mode="wait">
        {!isChanging ? (
          // Normal view - Show generator info
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {/* Remove Button */}
            {showRemove && (
              <button
                onClick={onRemove}
                className="absolute top-4 right-4 p-2 text-[#8C8275] hover:text-red-500 transition-colors z-20 rounded-full hover:bg-[#FAF8F5]"
                aria-label="Remove generator"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Generator Header */}
            <div
              className="px-6 py-8 flex flex-col gap-3 relative border-b border-[#E8E2D9]"
              style={{ height: rowHeights.header }}
            >
              <span className="text-[28px] font-bold text-[#111315] font-['Poppins',sans-serif] pr-8">
                {generator.kva}
              </span>
              <span className="text-[#FF5500] text-[18px] font-['Outfit',sans-serif] font-medium">
                {generator.brand} - {generator.type}
              </span>
              <span className="text-[#111315] font-['Outfit',sans-serif] text-[20px]">
                <span className="text-[#FF5500] font-bold">
                  {generator.pricePerDay}
                </span>
                <span className="text-[#71695F]">/day</span>
              </span>

              {/* Change Button */}
              <button
                onClick={() => setIsChanging(true)}
                className="mt-auto w-full px-4 py-2 text-[15px] text-[#111315] bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg font-['Outfit',sans-serif] font-medium cursor-pointer flex items-center justify-between hover:bg-[#EFECE6] transition-colors"
              >
                <span>Change Generator</span>
                <ChevronDown className="w-4 h-4 text-[#71695F]" />
              </button>
            </div>

            {/* Feature Values */}
            {COMPARISON_FEATURES.map((feature) => {
              const value = generator[feature.key as keyof Generator];
              const firstValue =
                selectedGenerators[0]?.[feature.key as keyof Generator];
              const isDifferent =
                highlightDifferences && idx > 0 && value !== firstValue;

              return (
                <div
                  key={`${generator.id}-${feature.key}`}
                  className="px-6 py-6 border-b border-[#E8E2D9] flex items-center"
                  style={{ height: rowHeights.row }}
                >
                  <div
                    className={`${
                      isDifferent ? "text-[#FF5500] font-bold" : "text-[#111315]"
                    } transition-colors duration-300`}
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-6 h-6 text-[#FF5500]" />
                      ) : (
                        <X className="w-6 h-6 text-[#9A9388]" />
                      )
                    ) : (
                      <span className="font-['Outfit',sans-serif] text-[18px]">
                        {String(value)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          // Changing view - Show generator selection list
          <motion.div
            key="changing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full bg-white"
          >
            {/* Header with close button */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-[#E8E2D9]"
              style={{ height: rowHeights.header }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[#111315] text-lg font-['Outfit',sans-serif] font-bold">
                  Select Generator
                </span>
                <span className="text-[#71695F] text-xs font-['Outfit',sans-serif]">
                  Choose replacement
                </span>
              </div>
              <button
                onClick={() => setIsChanging(false)}
                className="p-2 text-[#71695F] hover:text-[#111315] transition-colors rounded-full hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Generator List */}
            <div
              className="overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "400px" }}
            >
              {availableGenerators.map((gen, index) => (
                <motion.button
                  key={gen.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    if (gen.id !== generator.id) {
                      onReplace(gen.id);
                    }
                    setIsChanging(false);
                  }}
                  className={`w-full text-left px-6 py-4 hover:bg-[#FF5500]/10 transition-colors border-b border-[#E8E2D9] last:border-b-0 ${
                    gen.id === generator.id ? "bg-[#FF5500]/10" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-bold text-[#111315] font-['Poppins',sans-serif]">
                        {gen.kva}
                      </span>
                      {gen.id === generator.id && (
                        <span className="text-xs text-[#FF5500] bg-[#FF5500]/15 px-2 py-0.5 rounded font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-[#FF5500] text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-[#71695F] text-[14px] font-['Outfit',sans-serif]">
                      {gen.pricePerDay}/day
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Main Component
export function GeneratorCompareClient({
  generators,
}: GeneratorCompareClientProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    generators.slice(0, 3).map((g) => g.id)
  );
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Memoize selected generators to prevent unnecessary re-renders
  const selectedGenerators = React.useMemo(
    () =>
      selectedIds
        .map((id) => generators.find((g) => g.id === id))
        .filter(Boolean) as Generator[],
    [selectedIds, generators]
  );

  const availableToAdd = React.useMemo(
    () => generators.filter((g) => !selectedIds.includes(g.id)),
    [generators, selectedIds]
  );

  const addGenerator = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeGenerator = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((gid) => gid !== id));
    }
  };

  const replaceGenerator = (oldId: string, newId: string) => {
    // Prevent replacing with an already-selected generator
    if (selectedIds.includes(newId) && newId !== oldId) return;
    setSelectedIds(selectedIds.map((id) => (id === oldId ? newId : id)));
  };

  const clearAll = () => {
    setSelectedIds([generators[0]?.id || ""]);
  };

  const ROW_HEIGHTS = {
    header: "200px",
    row: "80px",
  };

  return (
    <>
      {/* Inject custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={highlightDifferences}
            onChange={(e) => setHighlightDifferences(e.target.checked)}
            className="sr-only"
          />
          <motion.div
            animate={{
              backgroundColor: highlightDifferences
                ? "#FF5500"
                : "#E8E2D9",
            }}
            className="w-12 h-6 rounded-full"
          >
            <motion.div
              animate={{
                x: highlightDifferences ? 24 : 2,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white mt-0.5 shadow-xs"
            />
          </motion.div>
          <span className="text-[#111315] text-[18px] font-['Outfit',sans-serif] font-medium">
            Highlight Differences
          </span>
        </label>

        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-[#FF5500] hover:text-[#111315] transition-colors font-['Outfit',sans-serif] text-[18px] font-medium"
        >
          <X className="w-5 h-5" />
          Clear All
        </button>
      </div>

      {/* Comparison Area */}
      <div className="border border-[#E8E2D9] rounded-2xl bg-white overflow-hidden shadow-xs flex">
        {/* Features Column (Fixed/Sticky) */}
        <div className="flex-none bg-[#FAF8F5] z-10 w-64 border-r border-[#E8E2D9]">
          {/* Header Placeholder */}
          <div
            className="px-6 py-8 text-[#71695F] font-['Outfit',sans-serif] font-bold text-[18px] flex items-start border-b border-[#E8E2D9]"
            style={{ height: ROW_HEIGHTS.header }}
          >
            Features
          </div>
          {/* Feature Lists */}
          {COMPARISON_FEATURES.map((feature) => (
            <div
              key={feature.key}
              className="px-6 py-6 flex items-center border-b border-[#E8E2D9]"
              style={{ height: ROW_HEIGHTS.row }}
            >
              <div className="flex items-center gap-3.5 text-[#111315]">
                <feature.icon className="w-5 h-5 text-[#FF5500] shrink-0" />
                <span className="font-['Outfit',sans-serif] text-[17px] font-medium">
                  {feature.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Generators Area - Flex for smooth animations */}
        <div className="flex-1 overflow-x-auto custom-scrollbar">
          <div className="flex h-full min-w-full">
            <AnimatePresence mode="sync" initial={false}>
              {selectedGenerators.map((gen, idx) => (
                <GeneratorColumn
                  key={gen.id}
                  generator={gen}
                  availableGenerators={generators.filter(
                    (g) => g.id === gen.id || !selectedIds.includes(g.id)
                  )}
                  selectedIds={selectedIds}
                  onReplace={(newId) => replaceGenerator(gen.id, newId)}
                  onRemove={() => removeGenerator(gen.id)}
                  showRemove={selectedIds.length > 1}
                  highlightDifferences={highlightDifferences}
                  selectedGenerators={selectedGenerators}
                  idx={idx}
                  rowHeights={ROW_HEIGHTS}
                />
              ))}

              {/* Add Generator Column */}
              {selectedIds.length < 3 && availableToAdd.length > 0 && (
                <AddGeneratorColumn
                  availableGenerators={availableToAdd}
                  onSelect={addGenerator}
                  rowHeights={ROW_HEIGHTS}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex items-center gap-2 mt-4 text-[#8C8275] text-[14px] font-['Outfit',sans-serif]">
        <span>←</span>
        <span>Scroll to see all comparisons</span>
        <span>→</span>
      </div>
    </>
  );
}
