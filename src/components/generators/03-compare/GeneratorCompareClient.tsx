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
    scrollbar-color: #00ff8f transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #00ff8f;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #00dd7a;
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
          className="flex items-center gap-3 px-6 py-4 text-[18px] text-white/60 hover:text-brand-green font-['Outfit',sans-serif] transition-colors"
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
              className="absolute bottom-full left-0 mb-2 w-[300px] max-h-[400px] overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-xl z-50 custom-scrollbar shadow-xl"
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
                  className="w-full text-left px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-white font-['Poppins',sans-serif]">
                      {gen.kva}
                    </span>
                    <span className="text-brand-green text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-white/50 text-[14px] font-['Outfit',sans-serif]">
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
      className="border-l border-white/10"
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
              className="h-full w-full border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-brand-green/50 hover:bg-white/5 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                <span className="text-3xl text-white/50 group-hover:text-brand-green transition-colors">
                  +
                </span>
              </div>
              <span className="text-white/50 text-lg font-['Outfit',sans-serif] group-hover:text-white transition-colors">
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
            className="h-full w-full"
          >
            {/* Header with close button */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-white/10"
              style={{ height: rowHeights.header }}
            >
              <span className="text-white/70 text-lg font-['Outfit',sans-serif]">
                Select Generator
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
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
                  className="w-full text-left px-6 py-4 hover:bg-brand-green/10 transition-colors border-b border-white/5 last:border-b-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[18px] font-bold text-white font-['Poppins',sans-serif]">
                      {gen.kva}
                    </span>
                    <span className="text-brand-green text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-white/50 text-[14px] font-['Outfit',sans-serif]">
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
      className="border-r border-white/10 last:border-r-0 relative"
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
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-red-500 transition-colors z-20 rounded-full hover:bg-white/5"
                aria-label="Remove generator"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Generator Header */}
            <div
              className="px-6 py-8 flex flex-col gap-3 relative"
              style={{ height: rowHeights.header }}
            >
              <span className="text-[28px] font-bold text-white font-['Poppins',sans-serif] pr-8">
                {generator.kva}
              </span>
              <span className="text-brand-green text-[18px] font-['Outfit',sans-serif]">
                {generator.brand} - {generator.type}
              </span>
              <span className="text-white font-['Outfit',sans-serif] text-[20px]">
                <span className="text-brand-green font-bold">
                  {generator.pricePerDay}
                </span>
                <span className="text-white/50">/day</span>
              </span>

              {/* Change Button */}
              <button
                onClick={() => setIsChanging(true)}
                className="mt-auto w-full px-4 py-2 text-[16px] text-white bg-white/5 border border-white/10 rounded-lg font-['Outfit',sans-serif] cursor-pointer flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <span>Change Generator</span>
                <ChevronDown className="w-4 h-4 text-white/50" />
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
                  className="px-6 py-6 border-t border-white/5 flex items-center"
                  style={{ height: rowHeights.row }}
                >
                  <div
                    className={`${
                      isDifferent ? "text-brand-green" : "text-white/80"
                    } transition-colors duration-300`}
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-6 h-6 text-brand-green" />
                      ) : (
                        <X className="w-6 h-6 text-white/30" />
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
            className="h-full"
          >
            {/* Header with close button */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-white/10"
              style={{ height: rowHeights.header }}
            >
              <div className="flex flex-col gap-2">
                <span className="text-white/70 text-lg font-['Outfit',sans-serif]">
                  Select Generator
                </span>
                <span className="text-white/40 text-sm font-['Outfit',sans-serif]">
                  Choose a generator to replace the current one
                </span>
              </div>
              <button
                onClick={() => setIsChanging(false)}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
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
                  className={`w-full text-left px-6 py-4 hover:bg-brand-green/10 transition-colors border-b border-white/5 last:border-b-0 ${
                    gen.id === generator.id ? "bg-brand-green/10" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-bold text-white font-['Poppins',sans-serif]">
                        {gen.kva}
                      </span>
                      {gen.id === generator.id && (
                        <span className="text-xs text-brand-green bg-brand-green/20 px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-brand-green text-[14px] font-['Outfit',sans-serif]">
                      {gen.brand} - {gen.type}
                    </span>
                    <span className="text-white/50 text-[14px] font-['Outfit',sans-serif]">
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
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={highlightDifferences}
            onChange={(e) => setHighlightDifferences(e.target.checked)}
            className="sr-only"
          />
          <motion.div
            animate={{
              backgroundColor: highlightDifferences
                ? "#00ff8f"
                : "rgba(255,255,255,0.2)",
            }}
            className="w-12 h-6 rounded-full"
          >
            <motion.div
              animate={{
                x: highlightDifferences ? 24 : 2,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white mt-0.5"
            />
          </motion.div>
          <span className="text-white text-[18px] font-['Outfit',sans-serif]">
            Highlight Differences
          </span>
        </label>

        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-brand-green hover:text-white transition-colors font-['Outfit',sans-serif] text-[18px]"
        >
          <X className="w-5 h-5" />
          Clear All
        </button>
      </div>

      {/* Comparison Area */}
      <div className="border border-white/20 rounded-xl bg-black overflow-hidden flex">
        {/* Features Column (Fixed/Sticky) */}
        <div className="flex-none bg-black z-10 w-64 border-r border-white/10">
          {/* Header Placeholder */}
          <div
            className="px-6 py-8 text-white/50 font-['Outfit',sans-serif] font-medium text-[18px] flex items-start"
            style={{ height: ROW_HEIGHTS.header }}
          >
            Features
          </div>
          {/* Feature Lists */}
          {COMPARISON_FEATURES.map((feature) => (
            <div
              key={feature.key}
              className="px-6 py-6 flex items-center border-t border-white/5"
              style={{ height: ROW_HEIGHTS.row }}
            >
              <div className="flex items-center gap-4 text-white/70">
                <feature.icon className="w-5 h-5 text-brand-green" />
                <span className="font-['Outfit',sans-serif] text-[18px]">
                  {feature.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Generators Area - Flex for smooth animations */}
        <div className="flex-1">
          <div className="flex h-full">
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
      <div className="flex items-center gap-2 mt-4 text-white/40 text-[14px] font-['Outfit',sans-serif]">
        <span>←</span>
        <span>Scroll to see all comparisons</span>
        <span>→</span>
      </div>
    </>
  );
}
