# Generator Rental Business: Comprehensive Edge Case Scenarios

## Overview
This document outlines **20+ critical edge case scenarios** for a generator rental platform with bulk ordering, payment processing, transportation, and maintenance verification. Each scenario includes:
- **Problem Description**
- **Resolution Side(s)**: Where the issue should be resolved
- **Probability**: Likelihood of occurrence
- **Handling Strategy**

---

## CORE BOOKING & AVAILABILITY SCENARIOS

> [!done] Solution found
>  Frontend will include calculated prices
### **Scenario 1: Date Range Overlap with Existing Booking**
**Problem:**
User A requests a generator from Jan 10-20, but User B already has it booked Jan 14-16. The system shows unavailable slots within the requested range.

**Resolution Side(s):** 
- **Primary:** Website (with real-time calendar visualization)
- **Secondary:** Admin (manual conflict review if needed)

**Probability:** 60% (Very High - most common scenario)

**Handling Strategy:**
- [ ] Block unavailable dates in the calendar picker
- [ ] Highlight conflict dates in red
- [ ] Show "Available from Jan 10-13 and Jan 17-20" message
- [ ] Suggest alternative dates automatically
**Current Solution:**
- [x] In drop down show that these generators are unavailable
- [ ] In Calendar show spots and on clicking or selecting the range a sidebar will pop up showing these generators are not available at these  ranges 
---
> [!done] Solution found
>  Frontend will include calculated prices
### **Scenario 2: Same-Day Turnaround (No Buffer Time)**
**Problem:**  
Generator booked until 6 PM by User B, and User A wants to rent from 6 PM the same day. No time for cleaning, inspection, or refueling.

**Resolution Side(s):** 
- **Primary:** Admin (configurable buffer time policy)
- **Secondary:** Website (enforce buffer rules)

**Probability:** 45% (High)

**Handling Strategy:**
- [x] Set mandatory buffer time (e.g., 2-4 hours minimum)
- [ ] Block the calendar based on buffer duration
- [ ] Auto-suggest next available slot (e.g., 10 PM or next morning)
- [ ] Allow admins to override for premium customers

---
> [!done] Solution found
>  Frontend will include calculated prices
### **Scenario 3: Bulk Order - Some Generators Available, Some Not**
**Problem:**  
User requests 5 generators for Jan 10-20. 3 are available for full duration, 2 are booked partially. System should allow partial fulfillment with clear communication.

**Resolution Side(s):** 
- **Primary:** Website (UI/UX for partial availability)
- **Secondary:** Admin (approval for partial order)

**Probability:** 55% (High)

**Handling Strategy:**
- [x] Show availability breakdown per generator
- [ ] Allow users to select: "Proceed with 3 units" or "Wait for all 5"
- [x] Display substitution options (similar specifications)
- [ ] Provide discount if accepting fewer units
- [x] Create a waitlist for unavailable units

---
> [!ATTENTION]
> Needs admin perspective
> - admin will handle
### **Scenario 4: Booking Cancellation During Payment Processing**
**Problem:**  
User A's booking is cancelled by admin while User A is in the payment gateway. Payment completes but booking is gone.

**Resolution Side(s):** 
- **Primary:** Website (transaction state management)
- **Secondary:** Payment Gateway (refund processing)
- **Tertiary:** Admin (manual intervention)

**Probability:** 15% (Medium-Low)

**Handling Strategy:**
- [ ] Lock booking during payment window (5-10 minutes)
- [ ] Show real-time warning if admin cancels during payment
- [x] Auto-refund if booking cancelled mid-transaction
- [ ] Create "Payment Pending" status (separate from "Confirmed")
- [x] Timeout after 10 minutes inactivity → release lock

---
> [!ATTENTION]
> Needs admin perspective
> - done by admin
### **Scenario 5: Simultaneous Booking by Two Users**
**Problem:**  
Both User A and User B click "Book Now" at the same millisecond for the last available generator. Who gets it?

**Resolution Side(s):** 
- **Primary:** Website (optimistic locking/database-level transaction)
- **Secondary:** Admin (manual decision if needed)

**Probability:** 10% (Low, but critical)

**Handling Strategy:**
- [ ] Implement database-level transaction locking
- [ ] First successful payment = confirmed booking
- [ ] Second user gets immediate notification with alternative options
- [ ] Auto-offer voucher/discount for delayed booking
- [ ] Maintain audit trail of timestamp
- [ ] Keep them waiting and let admin decide

---
> [!ATTENTION]
> Needs admin perspective
> - use will not be able to book on website and will need to contact admin
### **Scenario 6: Booking Modification (Extend Duration Mid-Rental)**
**Problem:**  
User A rents Jan 10-15, but on Jan 13 wants to extend to Jan 20. Gen 16-20 is now booked by User B.

**Resolution Side(s):** 
- **Primary:** Website (extension request UI)
- **Secondary:** Admin (approval authority)
- **Tertiary:** Customer Service (communication)

**Probability:** 40% (High)

**Handling Strategy:**
- [x] Check availability before confirming extension
- [x] If partially available, offer "extend to Jan 15, waitlist for Jan 16-20"
- [ ] Calculate additional charges automatically
- [ ] Require payment authorization for new dates
- [ ] Send notification to User B about potential conflict risk
- [ ] Flag for admin review if urgent

---
> [!ATTENTION]
> Needs admin perspective
> - user A will be notifies and user B will get deducted opurtnity
### **Scenario 7: Booking Cancellation - Cascading Issues**
**Problem:**  
User B cancels generator rental (booked Jan 14-16). Now User A's requested Jan 10-20 booking can be fulfilled entirely. But system already rejected/waitlisted User A.

**Resolution Side(s):** 
- **Primary:** Admin (automated notification system)
- **Secondary:** Website (waitlist management)
- **Tertiary:** Customer Service (outreach)

**Probability:** 35% (High)

**Handling Strategy:**
- [ ] Maintain waitlist queue with timestamps
- [ ] Auto-trigger notifications when generator becomes available
- [ ] Auto-confirm waitlisted bookings if now available
- [ ] Send SMS + Email notification (with 2-hour response window)
- [ ] If user doesn't respond, offer to other waitlisted users in queue

---
> [!done] Solution found
>  Frontend will include calculated prices
### **Scenario 8: Partial Fulfillment of Bulk Order**
**Problem:**  
User orders 10 generators for event on Jan 15. Only 7 are available. Should order be partial, rejected, or waitlisted?

**Resolution Side(s):** 
- **Primary:** Website (clear policy display at checkout)
- **Secondary:** Admin (manual approval required)
- **Tertiary:** Customer Service (negotiation)

**Probability:** 50% (High)

**Handling Strategy:**
- [x] Offer 3 options before payment:
  - Option A: Confirm with 7 units (at reduced rate)
  - Option B: Pay deposit, waitlist for 3 more units
  - Option C: Cancel and get alternative providers info
- [ ] Require explicit user consent for partial orders
- [ ] Lock inventory immediately upon selection
- [ ] Set deadline for additional units (e.g., 5 days before event)

---

## PAYMENT & FINANCIAL SCENARIOS

### **Scenario 9: Payment Authorization Failure**
**Problem:**  
User A's payment is declined (insufficient funds, fraud block, etc.). Generator is reserved but payment is failed. What's the hold duration?

**Resolution Side(s):** 
- **Primary:** Website (payment retry logic)
- **Secondary:** Payment Gateway (error messaging)
- **Tertiary:** Customer Service (support)

**Probability:** 25% (Medium)

**Handling Strategy:**
- [x] Hold booking for 15 minutes, retry 2-3 times automatically
- [x] Send SMS + Email with retry link
- [x] Allow user to use different payment method
- [x] Release hold after 15 minutes if payment still fails
- [x] Release generator back to availability
- [x] Notify admin of failed transaction
---
> [!ATTENTION]
> Needs admin perspective
### **Scenario 10: Refund Processing - Late Cancellation**
**Problem:**  
User A cancels 2 days before rental (was supposed to be 7-day penalty). How much refund is issued? Payment processor takes 5 business days.

**Resolution Side(s):** 
- **Primary:** Admin (refund policy enforcement)
- **Secondary:** Website (user-visible refund status)
- **Tertiary:** Payment Gateway (processing)

**Probability:** 40% (High)

**Handling Strategy:**
- [ ] Define cancellation tiers: 
  - 14+ days: 90% refund
  - 7-14 days: 70% refund
  - 2-7 days: 50% refund
  - <2 days: 0% refund
- [x] Show refund amount before confirming cancellation
- [ ] Initiate refund immediately, show processing status
- [ ] Account for payment processor delays (5-7 business days)
- [ ] Send refund receipt with reference number
- [ ] Provide customer support contact for refund status
---
> [!done] Solution found
>  Frontend will include calculated prices

### **Scenario 11: Billing Discrepancy Between Quote & Actual**
**Problem:**  
Website showed Rs. 5L, but actual invoice is Rs. 5.5L (added delivery/inspection fees). User disputes additional charges.

**Resolution Side(s):** 
- **Primary:** Website (transparent pricing breakdown)
- **Secondary:** Admin (dispute resolution)
- **Tertiary:** Customer Service (negotiation)

**Probability:** 35% (High)

**Handling Strategy:**
- [x] Show itemized pricing breakdown BEFORE payment
- [x] Include all fees: Equipment, Delivery, Inspection, Fuel, Insurance
- [x] Show dynamic pricing based on location (delivery fees vary)
- [x] Lock pricing once order initiated
- [x] Only allow admin to apply discounts/add fees with customer consent
- [x] Require customer digital signature for all charges before payment
- [ ] Maintain audit trail of all price changes

---
> [!done] Solution found
> Frontend will handle it
### **Scenario 12: Duplicate Charge (Payment Processed Twice)**
**Problem:**  
User's payment is processed twice due to double-click or network retry. User is charged Rs. 10L instead of Rs. 5L.

**Resolution Side(s):** 
- **Primary:** Website (prevent double submissions, idempotent payment)
- **Secondary:** Payment Gateway (duplicate detection)
- **Tertiary:** Admin (manual refund authority)

**Probability:** 8% (Low, but critical)

**Handling Strategy:**
- [x] Disable "Book Now" button immediately after click (1-second freeze)
- [x] Generate unique transaction ID before sending to gateway
- [ ] Implement idempotent payment (same ID = same charge)
- [ ] Check for duplicate transactions in payment gateway
- [ ] Auto-detect duplicates within 24 hours
- [ ] Auto-refund duplicate charge + 5% goodwill
- [ ] Send notification of refund with explanation

---

## TRANSPORTATION & LOGISTICS SCENARIOS

> [!done] Solution found
>  Frontend will include calculated ranges
### **Scenario 13: Delivery Address Invalid/Unreachable**
**Problem:**  
User A provides address in pincode 123456, but it's actually in a remote/hilly area. Delivery team can't reach. Who pays extra for difficult access?

**Resolution Side(s):** 
- **Primary:** Website (address validation)
- **Secondary:** Logistics Partner (delivery feasibility check)
- **Tertiary:** Admin (pricing adjustment)

**Probability:** 20% (Medium)

**Handling Strategy:**
- [x] Implement address validation API (Google Maps)
- [x] Mark high-risk areas (hills, remote, toll roads)
- [x] Show delivery availability based on pincode/area
- [x] Request contact number + GPS coordinates for remote areas
- [x] Calculate extra charges for difficult access (Rs. 500-2000)
- [ ] Show calculated delivery cost BEFORE confirming order
- [ ] Require explicit consent for remote area surcharge
- [ ] Set up logistics partner call to confirm access before delivery day

---
> [!done] Solution found
>  Frontend will include calculated Dates and buffer slot for confirmation
### **Scenario 14: Delivery Date Mismatch**
**Problem:**  
User books rental starting Jan 10. Logistics schedules delivery for Jan 11 due to capacity constraints. User rental period now lost for 1 day.

**Resolution Side(s):** 
- **Primary:** Website (delivery date selection)
- **Secondary:** Logistics Partner (schedule coordination)
- **Tertiary:** Admin (compensation)

**Probability:** 25% (Medium)

**Handling Strategy:**
- [x] Show available delivery slots at checkout
- [ ] User selects delivery date (must be before or on rental start)
- [ ] Create buffer: allow delivery 1-2 days before rental start
- [ ] Logistics confirms slot within 2 hours
- [ ] If logistics can't deliver on time, offer:
  - Option A: Delay rental start (free extension if available)
  - Option B: 15% discount + free early return
  - Option C: Full cancellation + refund
- [ ] Send SMS confirmation of delivery slot to user

---
> [!ATTENTION]
> Needs admin perspective
> - buffer time + location travel time
### **Scenario 15: Pickup Time Conflict**
**Problem:**  
User A's rental ends Jan 15 at 5 PM. User B's rental starts Jan 15 at 4 PM at same location. Logistics can't pickup from User A and deliver to User B in time.

**Resolution Side(s):** 
- **Primary:** Admin (buffer time enforcement)
- **Secondary:** Logistics Partner (scheduling)
- **Tertiary:** Website (date/time picker constraints)

**Probability:** 30% (Medium-High)

**Handling Strategy:**
- [x] Implement mandatory buffer window (e.g., 6-8 hours minimum between return/pickup at same location)
- [ ] Block overlapping slots in calendar
- [ ] If same-location consecutive bookings, enforce buffer via system logic
- [ ] For different locations, coordinate with logistics
- [ ] Auto-schedule logistics for multi-location needs
- [ ] Show delivery/pickup times at booking confirmation

---
> [!ATTENTION]
> Needs admin perspective
> - required to add terms and coditons
### **Scenario 16: Transportation Damage**
**Problem:**  
During delivery/pickup, logistics damages the generator (dent, fuel leakage). Who pays: Customer, Logistics, or Company?

**Resolution Side(s):** 
- **Primary:** Logistics Partner (insurance claim)
- **Secondary:** Admin (investigation + customer communication)
- **Tertiary:** Customer Service (dispute resolution)

**Probability:** 12% (Low-Medium)

**Handling Strategy:**
- [x] Require photo documentation before and after delivery
- [x] Implement damage assessment form with timestamp
- [ ] Create 3 parties with clear liability:
  - Pre-rental damage: Company responsible
  - During rental: Customer responsible (unless manufacturing defect)
  - During transportation: Logistics responsible
- [ ] Require logistics to have liability insurance
- [ ] Customer pays damage deposit (refundable)
- [ ] For transportation damage:
  - Document with photos
  - File claim with logistics insurance within 48 hours
  - Company refunds customer's damage deposit
  - Logistics pays company

---

## MAINTENANCE & EQUIPMENT VERIFICATION SCENARIOS
> [!ATTENTION]
> Needs admin perspective
> - calculate distance + availability resource for backup
### **Scenario 17: Generator Not Working Upon Delivery**
**Problem:**  
Generator delivered to User A, but doesn't start. Is it manufacturing defect, operator error, or field damage? Rental already started technically.

**Resolution Side(s):** 
- **Primary:** Operator (on-site verification)
- **Secondary:** Admin (technical assessment)
- **Tertiary:** Logistics (replacement coordination)

**Probability:** 15% (Medium)

**Handling Strategy:**
- [ ] Require delivery confirmation with test run by operator
- [ ] Operator does functional check (start, load test, fuel level)
- [ ] User must acknowledge equipment condition via photo + checklist
- [ ] If non-functional:
  - Operator troubleshoots on-site (5-10 minutes)
  - If fixable: Fix and document
  - If not fixable: Replace with equivalent generator within 2 hours
  - User gets discount (10-15%) or extension for inconvenience
- [ ] All checks documented with photos/timestamps
- [ ] User confirms receipt via in-app checklist

---
> [!ATTENTION]
> Needs admin perspective
### **Scenario 18: Maintenance Certificate Verification Delay**
**Problem:**  
User A needs generator with valid maintenance proof. System shows "certified" but documents aren't uploaded yet. Deployment delayed.

**Resolution Side(s):** 
- **Primary:** Admin (document management)
- **Secondary:** Operator (field verification)
- **Website:** (document status visibility)

**Probability:** 22% (Medium)

**Handling Strategy:**
- [ ] Create maintenance checklist with required documents:
  - Service certificate (date, service type)
  - Fuel/oil filter change proof
  - Load test report
  - Safety inspection
- [ ] Upload documents to admin portal with expiry dates
- [ ] Automated alerts when certificates expire in 30 days
- [ ] Show document status in search filters (Verified/Pending/Expired)
- [ ] Operator carries backup documents in physical format
- [ ] System blocks bookings if critical certificates expired
- [ ] Allow operator to do on-site verification if documents pending

---

## ADDITIONAL CRITICAL EDGE CASES (Extra 4+)
> [!ATTENTION]
> Needs admin perspective
> - covert it to extra shift and add extra cost
### **Scenario 19: Rental Period Exceeds Maintenance Schedule**
**Problem:**  
Generator requires service every 500 hours. User books for 7 days (168 hours rental). Total cumulative usage from all rentals is 350 hours. Should it be serviced before this rental?

**Resolution Side(s):** 
- **Primary:** Admin (usage tracking)
- **Secondary:** Website (booking validation)
- **Operator:** (field maintenance check)

**Probability:** 18% (Medium)

**Handling Strategy:**
- [x] Track cumulative usage hours per equipment
- [x] Calculate: Hours used + Requested rental hours
- [x] Alert if total exceeds maintenance interval (e.g., 500 hours)
- [x] Options:
  - Block booking if maintenance required
  - Schedule maintenance immediately after previous rental
  - Show booking only after confirmed maintenance date
- [ ] Maintain usage log:
  - Start meter reading (actual or estimated)
  - End meter reading after rental
  - Calculate billable hours
- [ ] Operator records readings with photos

---
> [!done] Solution found
>  Frontend will include calculated billing
### **Scenario 20: Bulk Order with Different Terms for Different Generators**
**Problem:**  
User orders 5 generators: 3 at standard rates, 2 at premium rates (higher capacity). Return dates differ. Complex billing scenario.

**Resolution Side(s):** 
- **Primary:** Website (line-item order management)
- **Secondary:** Admin (billing management)

**Probability:** 35% (High for B2B customers)

**Handling Strategy:**
- [ ] Allow line-item details for bulk orders:
  - Generator Type A: Qty 3, Dates Jan 10-20, Rate Rs. 10K/day = Rs. 300K
  - Generator Type B: Qty 2, Dates Jan 10-25, Rate Rs. 15K/day = Rs. 450K
- [ ] Show itemized pricing summary
- [ ] Calculate different return dates
- [ ] Split invoicing if needed (or consolidate)
- [ ] Track inventory separately per item type
- [ ] Generate separate reports for finance team
- [ ] User can modify quantities/dates per line item before checkout

---
> [!done] Solution found
>  Will get resolved when technician maintains logs
>  Dispatch Log -> Transport Log -> Delivery Log -> Transport Log -> Destination Reached Log
### **Scenario 21: User Disputes Equipment Condition at Return**
**Problem:**  
User returns generator with visible rust/damage. Claims it arrived in that condition. Company claims damage occurred during rental. Both have photos taken at different times.

**Resolution Side(s):** 
- **Primary:** Admin (dispute investigation)
- **Secondary:** Operator (field assessment)
- **Tertiary:** Customer Service (mediation)

**Probability:** 20% (Medium)

**Handling Strategy:**
- Create mandatory photo checklist at delivery + return
- Photos must include:
  - Overall view (3+ angles)
  - Damage close-ups (if any)
  - Timestamp embedded in image metadata
  - Operator signature
- Store all photos in centralized audit trail
- For damage disputes:
  - Compare delivery photos vs return photos
  - If damage visible in delivery photos: Company liable
  - If damage NOT in delivery photos: Customer liable
  - If unclear: Conduct professional assessment (cost split)
- Clearly document damage severity (cosmetic vs functional)
- Deduct from user's security deposit if user liable
- Refund deposit if company liable

---
> [!help]
> - admin discussion
### **Scenario 22: Insurance Coverage Gaps**
**Problem:**  
User's rented generator causes property damage. User's policy doesn't cover rental equipment. Company's policy has exclusion for "customer negligence."

**Resolution Side(s):** 
- **Primary:** Admin (insurance coordination)
- **Secondary:** Legal (liability determination)
- **Tertiary:** Customer Service (claim processing)

**Probability:** 8% (Low but critical)

**Handling Strategy:**
- Offer insurance options at checkout:
  - Option A: No insurance (user assumes full risk)
  - Option B: Basic insurance (equipment damage only, Rs. 500/day)
  - Option C: Premium insurance (equipment + property damage, Rs. 1000/day)
- Clear T&C stating company NOT liable for:
  - User's property damage
  - Third-party injury claims (unless company negligence)
- Require user to acknowledge liability terms digitally
- For equipment damage:
  - If insured: Company claim
  - If not insured: Deducted from deposit + payment plan
- For third-party damage:
  - Document liability carefully
  - File insurance claim within 48 hours
  - Notify user of potential additional charges
- Maintain insurance certificate visible in dashboard

---
> [!question]
> Admin also should have restictions
> - user needs to face consequences
### **Scenario 23: Overbooking by Admin Error**
**Problem:**  
Admin manually creates booking in system (offline sale) without checking availability. Generator is already booked in system. Two customers now expect same equipment.

**Resolution Side(s):** 
- **Primary:** Admin (manual booking controls)
- **Secondary:** Website (booking admin interface)
- **Tertiary:** Customer Service (escalation)

**Probability:** 18% (Medium)

**Handling Strategy:**
- Admin dashboard shows real-time availability
- Implement "Check Availability" button before creating manual booking
- System prevents double-booking even with admin override (requires approval + reason)
- If admin overrides:
  - Create audit log entry with admin name + reason
  - Send notification to both customers within 1 hour
  - Offer resolution:
    - Priority given to first booker
    - Second customer gets:
      - Option A: Different generator (substitute)
      - Option B: Delayed rental start date
      - Option C: 20% discount + waitlist
- Implement approval workflow for all overrides

---
> [!ATTENTION]
> Needs admin perspective
> - immediate termination
### **Scenario 24: Generator Used for Unintended Purpose**
**Problem:**  
User rents 5kW generator for "event backup," but actually uses for continuous 7-day industrial production. Excessive wear. Usage billing vs. rental billing mismatch.

**Resolution Side(s):** 
- **Primary:** Operator (usage monitoring)
- **Secondary:** Admin (policy enforcement)
- **Tertiary:** Customer Service (dispute resolution)

**Probability:** 12% (Low-Medium)

**Handling Strategy:**
- [ ] Use terms clearly stating "intended use" at rental signup
- [ ] Different usage tiers:
  - Tier 1: Occasional/Backup (2-4 hours/day) = Standard rates
  - Tier 2: Regular (8 hours/day) = 1.5x rates
  - Tier 3: Continuous (24 hours/day) = 3x rates
- [ ] Offer IoT sensors on premium generators:
  - Track runtime hours, fuel consumption, load percentage
  - Generate usage report post-rental
- [ ] If high usage detected:
  - Notify user with additional charges calculation
  - Require new contract/payment for heavy usage
  - Prioritize maintenance for this unit
- [ ] Include escalation clause: "Usage >12hrs/day requires approval + different pricing"
- [ ] Quarterly maintenance mandatory if continuous usage

---
> [!ATTENTION]
> Needs admin perspective
> - they should talk to admin
### **Scenario 25: Concurrent Bulk Orders Depleting Inventory**
**Problem:**  
Two B2B customers (Company X: 10 units, Company Y: 10 units) submit bulk orders simultaneously on Jan 10. Only 15 units available. Who gets priority?

**Resolution Side(s):** 
- **Primary:** Website (real-time transaction locking)
- **Secondary:** Admin (business rule configuration)

**Probability:** 8% (Low but critical for business)

**Handling Strategy:**
- [ ] Implement transaction-level locking (database level)
- [ ] First complete payment = confirmed bulk order
- [ ] Second order gets options:
  - Option A: Proceed with available units (5 instead of 10)
  - Option B: Split dates (5 units Jan 10-20, 5 units Jan 25-Feb 5)
  - Option C: Full refund + waitlist
- [ ] For priority customers (loyal/high-value):
  - Create "VIP Hold" system (24 hours)
  - Reserve equipment for priority customers
  - First-come-first-served among non-priority
- [ ] Implement queuing mechanism for simultaneous orders
- [ ] Send SMS alert to second customer with immediate alternatives

---
> [!ATTENTION]
> Needs admin perspective
> - calculate nearest location with buffer time
### **Scenario 26: Return Location Different from Pickup Location**
**Problem:**  
User picks up generator from Delhi location but wants to return at Mumbai location. Does multi-location logistics apply? Cost implications?

**Resolution Side(s):** 
- **Primary:** Website (location selection)
- **Secondary:** Logistics Partner (cross-location coordination)
- **Tertiary:** Admin (pricing adjustment)

**Probability:** 25% (Medium)

**Handling Strategy:**
- Allow different return locations at checkout
- Calculate additional charges:
  - Inter-city transportation cost (based on distance)
  - Show this before confirming order
- Set up logistics routes:
  - Default: Return to same city (pickup cost included)
  - Alternative: Return to different city (additional charge Rs. 2000-5000)
- For B2B customers, offer multiple location contracts
- Track inventory by location:
  - Delhi stock depletes on pickup
  - Mumbai stock increases on return
- Coordinate with logistics:
  - Schedule return truck
  - Add equipment to existing routes if possible
- Require customer confirmation of return location before payment

---
> [!ATTENTION]
> Needs admin perspective
> - late return ( extra shift), other legal procedures
### **Scenario 27: Late Return / No Return**
**Problem:**  
User A's rental ends Jan 15. It's now Jan 20. Generator is still not returned. Is it overdue, abandoned, or stolen?

**Resolution Side(s):** 
- **Primary:** Admin (overdue tracking)
- **Secondary:** Operator (field recovery)
- **Tertiary:** Legal (non-return action)

**Probability:** 15% (Medium)

**Handling Strategy:**
- Implement automated overdue management:
  - T+1 day: Send SMS reminder
  - T+3 days: Send email + call customer
  - T+7 days: Escalate to admin
  - T+14 days: Flag as potential theft, initiate legal action
- Automatically charge additional rental rates:
  - Daily overdue rate (50% higher than standard)
  - Cumulative charges auto-calculated
- Disable user account if overdue >14 days:
  - Can't place new orders
  - Dashboard shows outstanding balance
- For non-return:
  - File complaint with police (if theft)
  - Pursue legal action (if contract breach)
  - Charge full equipment cost to customer account
  - Report to credit agencies if amount >Rs. 1L
- Offer settlement options:
  - Pay accumulated charges + overdue fees
  - Equipment buyout option (at market price)
  - Payment plan for high amounts

---
> [!ATTENTION]
> Needs admin perspective
> - these things should be mentioned  in booking section
### **Scenario 28: Regulatory Compliance & Documentation**
**Problem:**  
User rents generator for event, but event location requires specific safety certificates. Generator has certificate but it's expired (renewal pending). Rental blocked day before event.

**Resolution Side(s):** 
- **Primary:** Admin (compliance tracking)
- **Secondary:** Operator (field validation)
- **Website:** (documentation visibility)

**Probability:** 10% (Low but critical)

**Handling Strategy:**
- Maintain compliance dashboard:
  - Safety certificates (ISO, BIS, etc.)
  - Pollution compliance (PUC certificate)
  - Load testing certificates
  - Tax compliance (GST registration)
- Alert admins 30 days before expiry
- Implement auto-renewal workflows:
  - Coordinate with certification agencies
  - Schedule renewal testing
  - Document all certificates in cloud storage
- For events, show:
  - "Regulatory compliant for your region"
  - Certificate details visible to customer
  - Downloadable compliance report
- Block booking if:
  - Required certificates expired
  - Location-specific compliance missing
- Emergency protocols:
  - If compliance discovered missing day before event:
    - Option A: Provide different compliant generator (if available)
    - Option B: Full refund + apology
    - Option C: Delay rental 2-3 days for certification

---

## RESOLUTION SIDE ALLOCATION MATRIX
| Scenario                       | Website     | Admin         | Customer Service | Operator      | Logistics     | Payment Gateway | Legal         |
| ------------------------------ | ----------- | ------------- | ---------------- | ------------- | ------------- | --------------- | ------------- |
| 1. Date Overlap                | [ ] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 2. Same-Day Turnaround         | [x]         | [x] Primary   | [ ]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 3. Bulk Order Partial          | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 4. Cancellation During Payment | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [x] Secondary   | [ ]           |
| 5. Simultaneous Booking        | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [x]             | [ ]           |
| 6. Booking Modification        | [x] Primary | [x] Secondary | [x]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 7. Cascading Issues            | [x]         | [x] Primary   | [x] Secondary    | [ ]           | [ ]           | [ ]             | [ ]           |
| 8. Partial Fulfillment         | [x] Primary | [x] Secondary | [x]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 9. Payment Auth Failure        | [x]         | [x] Secondary | [x]              | [ ]           | [ ]           | [x] Primary     | [ ]           |
| 10. Partial Payment            | [x]         | [x] Primary   | [ ]              | [ ]           | [ ]           | [x] Secondary   | [ ]           |
| 11. Late Cancellation Refund   | [x]         | [x] Primary   | [x]              | [ ]           | [ ]           | [x] Secondary   | [ ]           |
| 12. Currency Conversion        | [ ]         | [x] Primary   | [ ]              | [ ]           | [ ]           | [x]             | [ ]           |
| 13. Billing Discrepancy        | [x] Primary | [x] Secondary | [x]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 14. Duplicate Charge           | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [x]             | [ ]           |
| 15. Invalid Delivery Address   | [x] Primary | [x] Secondary | [x]              | [ ]           | [x]           | [ ]             | [ ]           |
| 16. Delivery Date Mismatch     | [x]         | [x] Primary   | [x]              | [ ]           | [x] Secondary | [ ]             | [ ]           |
| 17. Pickup Time Conflict       | [x]         | [x] Primary   | [ ]              | [ ]           | [x] Secondary | [ ]             | [ ]           |
| 18. Transportation Damage      | [ ]         | [x] Primary   | [x]              | [x]           | [x]           | [ ]             | [x]           |
| 19. Equipment Not Working      | [x]         | [x]           | [x] Primary      | [x] Secondary | [x]           | [ ]             | [ ]           |
| 20. Maintenance Cert Delay     | [ ]         | [x] Primary   | [ ]              | [x] Secondary | [ ]           | [ ]             | [ ]           |
| 21. Usage Exceeds Maintenance  | [x]         | [x] Primary   | [ ]              | [x] Secondary | [ ]           | [ ]             | [ ]           |
| 22. Bulk Different Terms       | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [ ]             | [ ]           |
| 23. Condition Dispute          | [ ]         | [x] Primary   | [x]              | [x] Secondary | [ ]           | [ ]             | [x]           |
| 24. Insurance Gap              | [ ]         | [x] Primary   | [x]              | [ ]           | [ ]           | [ ]             | [x] Secondary |
| 25. Admin Overbooking          | [x]         | [x] Primary   | [x] Secondary    | [ ]           | [ ]           | [ ]             | [ ]           |
| 26. Unintended Usage           | [x]         | [x] Primary   | [x]              | [x] Secondary | [ ]           | [ ]             | [x]           |
| 27. Concurrent Bulk Orders     | [x] Primary | [x] Secondary | [ ]              | [ ]           | [ ]           | [x]             | [ ]           |
| 28. Multi-Location Return      | [x] Primary | [x] Secondary | [ ]              | [ ]           | [x] Secondary | [ ]             | [ ]           |
| 29. Late Return                | [x]         | [x] Primary   | [x]              | [x]           | [ ]           | [x]             | [x] Secondary |
| 30. Regulatory Compliance      | [x]         | [x] Primary   | [ ]              | [x] Secondary | [ ]           | [ ]             | [x]           |

---

## PROBABILITY DISTRIBUTION SUMMARY

**High Probability (40%+):** Scenarios 1, 2, 3, 6, 7, 8, 11, 13, 22
- **Action:** Implement robust automation + clear policies

**Medium Probability (15-40%):** Scenarios 5, 9, 10, 12, 15, 16, 17, 19, 20, 21, 23, 25, 26, 28, 29, 30
- **Action:** Create standard operating procedures + staff training

**Low Probability (<15%):** Scenarios 4, 14, 18, 24, 27
- **Action:** Document procedures + escalation protocols

---

## IMPLEMENTATION PRIORITY

### Phase 1 (Critical - Must Implement First):
- Scenario 1: Date overlap detection
- Scenario 5: Simultaneous booking handling
- Scenario 9: Payment authorization
- Scenario 14: Duplicate charge prevention
- Scenario 19: Equipment condition verification

### Phase 2 (Important - Core Features):
- Scenarios 2, 3, 6, 7, 8, 10, 11, 13, 15, 16, 17, 22

### Phase 3 (Advanced - Extended Features):
- Scenarios 4, 12, 18, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30

---

## KEY TECHNICAL RECOMMENDATIONS

1. **Database-Level Locking:** Use pessimistic/optimistic locking for concurrent bookings
2. **Idempotent Payments:** Generate unique transaction IDs to prevent duplicates
3. **Real-Time Inventory:** Use Redis/Memcached for booking state management
4. **Audit Logging:** Log all state changes with timestamps and user info
5. **Webhooks:** Integrate with payment gateway for transaction updates
6. **Messaging Queue:** Use for async operations (refunds, notifications, reconciliation)
7. **Document Storage:** Cloud storage for certificates, photos, compliance docs
8. **API Versioning:** For logistics + payment gateway integrations
9. **Machine Learning:** Predict maintenance needs based on usage patterns
10. **Analytics Dashboard:** Track failure rates per scenario

---

**Document Version:** 1.0  
**Last Updated:** January 10, 2026  
**Applicable For:** Generator Rental Platform (Bulk Ordering, Payment, Transport, Maintenance)
