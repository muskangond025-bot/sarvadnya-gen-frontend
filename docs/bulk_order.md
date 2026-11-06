# Bulk Order Booking - Implementation Plan

## Overview

Three-step bulk booking flow for generator rentals allowing users to:
1. Select multiple date ranges
2. Assign generators to each date/range with detailed configurations
3. Review and confirm order

---

## Design Constraints

- **Colors**: Only green (#00ff8f), black (#000000), white (#ffffff)
- **Borders**: None unless explicitly specified
- **Backgrounds**: Solid colors only (no gradients, no blur effects)
- **Philosophy**: Simplify complex UI into intuitive, readable components

---

## Component Architecture

```
src/
├── app/bulk-order/
│   └── page.tsx                    # Server component (data fetching)
├── components/bulk-order/
│   ├── client/
│   │   └── BulkOrderClient.tsx     # Main client component (state management)
│   └── components/
│       ├── StepIndicator.tsx       # Step 1-2-3 progress
│       ├── DateSelectionStep.tsx   # Step 1: Calendar with instructions
│       ├── DateConfirmation.tsx    # Post-Step 1: Confirm dates modal
│       ├── GeneratorAssignment.tsx # Step 2: Assign generators to dates
│       ├── GeneratorForm.tsx       # Form for single generator config
│       ├── GoogleAddressPicker.tsx # Google Maps address autocomplete
│       └── OrderSummary.tsx        # Step 3: Review & confirm
```

---

## Step 1: Date Selection

### Calendar Component
- Reuse `RentalCalendar` with `selectionMode="range"`
- Users can select multiple non-overlapping date ranges

### User Instructions (Display prominently)
```
✓ DO:
  - Click start date, then click end date to select a range
  - Add multiple ranges by repeating
  - Click the × on a range tag to remove it

✗ DON'T:
  - Select overlapping date ranges
  - Leave without confirming your selection
```

### Date Confirmation Modal
After clicking "Continue":
- Show all selected ranges in a list
- Ask: "Are all your dates selected correctly?"
- Options: [Edit Dates] [Confirm & Continue]

---

## Step 2: Generator Assignment

### Layout
Each date range displayed as a card with:
- Date range header (e.g., "Jan 15 - Jan 18")
- Generator list (expandable)
- [+ Add Generator] button

### Generator Form Fields

| Field | Type | Details |
|-------|------|---------|
| Generator Type | Dropdown | Fetch from `generatorsData` types |
| Quantity | Number input | Min: 1 |
| Site Location | Text + Google Maps | Address autocomplete component |
| Number of Shifts | Number input | Min: 1 |
| Shift Start Time | Time picker | HH:MM format |

### Notice Banner
```
ℹ️ Each shift auto-calculated: 6 hours duration
```

### Additional Options (Toggle switches)

| Option | Label | Description |
|--------|-------|-------------|
| Standby Generator | Backup unit on-site | Extra unit for redundancy |
| Extra Shift Ready | Prebook extension | Option to extend shifts |
| Include Transport | Delivery & pickup | Full transport service |
| Include Fuel | Full tank service | Start with full fuel |

---

## Step 3: Order Summary

- Display all dates, generators, and configurations
- Calculate totals
- Show terms & conditions
- [Submit Order] button

---

## Implementation Phases

### Phase 1: Project Setup
- Create folder structure (`components/bulk-order/client/`, `components/bulk-order/components/`)
- Create `BulkOrderClient.tsx` with basic 3-step state machine
- Update `app/bulk-order/page.tsx` to import client component

### Phase 2: Step Indicator Component
- Create `StepIndicator.tsx`
- Three steps: "Select Dates" → "Configure Generators" → "Review Order"
- Active step highlighted in green

### Phase 3: Date Selection Step UI
- Create `DateSelectionStep.tsx`
- Integrate `RentalCalendar` with `selectionMode="range"`
- Add instruction panel (DO's and DON'Ts)
- Add "Continue" button

### Phase 4: Date Confirmation Modal
- Create `DateConfirmation.tsx`
- Show selected ranges in clean list format
- Two buttons: "Edit Dates" and "Confirm & Continue"

### Phase 5: Generator Assignment Step Structure
- Create `GeneratorAssignment.tsx`
- Display each date range as expandable card
- Add placeholder for generator form

### Phase 6: Generator Form - Basic Fields
- Create `GeneratorForm.tsx`
- Implement: Generator Type dropdown, Quantity input
- Implement: Number of Shifts, Shift Start Time
- Add 6-hour shift notice

### Phase 7: Google Address Picker
- Create `GoogleAddressPicker.tsx`
- Text input with autocomplete placeholder
- Responsive layout (stacks on mobile)
- Note: Full Google Maps integration deferred (mock for now)

### Phase 8: Additional Options
- Add toggle switches to `GeneratorForm.tsx`
- Standby Generator, Extra Shift Ready, Include Transport, Include Fuel
- Clean on/off toggle styling (green when active)

### Phase 9: Order Summary Step
- Create `OrderSummary.tsx`
- Display all configurations grouped by date range
- Show itemized breakdown
- Submit button

### Phase 10: State Management & Integration
- Wire up all components in `BulkOrderClient.tsx`
- Implement step navigation logic
- Add form validation
- Test complete flow

---

## Data Types

```typescript
interface DateRange {
  id: string;
  start: Date;
  end: Date;
}

interface GeneratorConfig {
  id: string;
  dateRangeId: string;
  generatorType: string;
  quantity: number;
  siteLocation: string;
  googleAddress?: string;
  numberOfShifts: number;
  shiftStartTime: string;
  options: {
    standbyGenerator: boolean;
    extraShiftReady: boolean;
    includeTransport: boolean;
    includeFuel: boolean;
  };
}

interface BulkOrderState {
  currentStep: 1 | 2 | 3;
  dateRanges: DateRange[];
  generatorConfigs: GeneratorConfig[];
  showDateConfirmation: boolean;
}
```

---

## Generator Types (from data.ts)

| Type | Description | Use Case |
|------|-------------|----------|
| portable | 5-15 kVA, movable | Events, construction |
| standby | 15-50 kVA, backup | Home/office backup |
| industrial | 50-300 kVA, heavy-duty | Factories, 24/7 use |
| inverter | 2-10 kVA, silent | Residential, electronics |
| towable | 100-500 kVA, large capacity | Large events, hospitals |

---

## Responsive Breakpoints

- Mobile: < 640px (stack all elements)
- Tablet: 640px - 1024px (2-column where applicable)
- Desktop: > 1024px (full layout)

---

## Next Steps

1. Review this plan
2. Approve or request changes
3. Begin Phase 1 implementation
