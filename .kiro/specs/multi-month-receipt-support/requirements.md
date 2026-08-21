# Requirements Document

## Introduction

This document specifies requirements for extending the fee receipt generation system to support both single-month and multi-month (range) payment receipts. Currently, the system generates receipts for individual monthly fee records only. This feature will allow staff to generate a single consolidated receipt when a parent pays for multiple consecutive months at once, using the same receipt template layout for both single-month and multi-month cases.

## Glossary

- **Receipt_System**: The fee receipt generation component (`ReceiptPrint.jsx`) that produces printable A4 receipts with dual copies (Parent Copy + School Copy)
- **Selection_UI**: The user interface in the Student Detail Modal that allows selecting fee records for receipt printing
- **Fee_Record**: A Firestore document representing one student's fee for one specific month and year, containing fields: studentId, month, year, amount, status, paymentDate, docId
- **Multi_Month_Receipt**: A consolidated receipt that displays a date range (e.g., "Period: April 2026 to June 2026") and aggregates the total amount from multiple consecutive monthly fee records
- **Single_Month_Receipt**: A receipt displaying one month's fee information (existing behavior)
- **Paid_Status**: A fee record with status field value equal to 'paid'
- **Pending_Status**: A fee record with status field value equal to 'pending'
- **Receipt_Number**: A unique identifier for a receipt in format PA-{year}{month}-{studentId} for single month, or PA-{year}-{firstMonthAbbr}to{lastMonthAbbr}-{studentId} for multi-month range
- **Chronological_Sorting**: Ordering fee records by year and month index (January=1, February=2, etc.) from earliest to latest
- **Same_Year_Validation**: A constraint ensuring all selected fee records belong to the same calendar year

## Requirements

### Requirement 1: Multi-Month Fee Selection

**User Story:** As a school administrator, I want to select multiple paid monthly fee records for a student, so that I can generate a single consolidated receipt when a parent pays for several months at once.

#### Acceptance Criteria

1. WHEN the Student Detail Modal displays the fee history table, THE Selection_UI SHALL display a checkbox for each fee record row
2. WHEN a fee record has Paid_Status, THE Selection_UI SHALL enable the checkbox for that fee record
3. WHEN a fee record has Pending_Status, THE Selection_UI SHALL disable the checkbox for that fee record
4. WHEN the user checks one or more enabled checkboxes, THE Selection_UI SHALL track all checked fee records in a selection state
5. WHEN at least one checkbox is checked, THE Selection_UI SHALL display a "Print Selected Receipt" button
6. WHEN no checkboxes are checked, THE Selection_UI SHALL hide the "Print Selected Receipt" button

### Requirement 2: Receipt Data Aggregation

**User Story:** As a school administrator, I want the receipt to aggregate data from selected fee records, so that the receipt accurately represents the total payment amount and period covered.

#### Acceptance Criteria

1. WHEN the user clicks "Print Selected Receipt", THE Receipt_System SHALL receive an array of the selected Fee_Record objects (not a single record)
2. WHEN the Receipt_System receives multiple Fee_Record objects, THE Receipt_System SHALL perform Chronological_Sorting on the received records
3. FOR ALL Fee_Record objects in the sorted array, THE Receipt_System SHALL compute the sum of all amount fields
4. WHEN computing the period range, THE Receipt_System SHALL extract the month and year from the first record (after sorting) as the start date
5. WHEN computing the period range, THE Receipt_System SHALL extract the month and year from the last record (after sorting) as the end date

### Requirement 3: Receipt Content Display Logic

**User Story:** As a school administrator, I want the receipt to display either a single month or a date range depending on the selection, so that the receipt clearly indicates what period the payment covers.

#### Acceptance Criteria

1. WHEN exactly one Fee_Record is selected, THE Receipt_System SHALL display "Month: {month} {year}" in both copies (Parent Copy and School Copy)
2. WHEN two or more Fee_Record objects are selected, THE Receipt_System SHALL display "Period: {firstMonth} {firstYear} to {lastMonth} {lastYear}" in both copies
3. WHEN displaying the amount, THE Receipt_System SHALL show the aggregated sum (from Requirement 2.3) in the "Amount Paid" section
4. WHEN displaying the payment date, THE Receipt_System SHALL use the paymentDate from the last record in the chronologically sorted array (representing the final payment date)

### Requirement 4: Receipt Number Generation

**User Story:** As a school administrator, I want each receipt to have a unique receipt number that reflects whether it covers a single month or multiple months, so that receipts can be easily identified and referenced.

#### Acceptance Criteria

1. WHEN exactly one Fee_Record is selected, THE Receipt_System SHALL generate a Receipt_Number in format "PA-{year}{monthNumber}-{studentId}" where monthNumber is zero-padded to two digits (e.g., "PA-202601-STU001" for January 2025)
2. WHEN two or more Fee_Record objects are selected, THE Receipt_System SHALL generate a Receipt_Number in format "PA-{year}-{firstMonthAbbr}to{lastMonthAbbr}-{studentId}" where month abbreviations are three-letter codes (e.g., "PA-2026-AprtoJun-STU001")
3. WHEN generating month abbreviations, THE Receipt_System SHALL use the mapping: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec

### Requirement 5: Same-Year Validation

**User Story:** As a school administrator, I want the system to prevent me from selecting fee records across different years in a single receipt, so that receipt periods are unambiguous and easy to understand.

#### Acceptance Criteria

1. WHEN the user checks a checkbox for a Fee_Record, THE Selection_UI SHALL extract the year field from that Fee_Record
2. WHEN one or more checkboxes are already checked, THE Selection_UI SHALL determine the year from the first checked Fee_Record
3. WHEN the user attempts to check a Fee_Record with a different year value than the already-checked records, THE Selection_UI SHALL disable that checkbox
4. WHEN all checkboxes are unchecked, THE Selection_UI SHALL re-enable all checkboxes that have Paid_Status (resetting the year constraint)

### Requirement 6: Preserve Existing Dual-Copy Layout

**User Story:** As a school administrator, I want the multi-month receipt to use the same A4 dual-copy layout as the existing single-month receipt, so that printing and physical handling remain consistent.

#### Acceptance Criteria

1. THE Receipt_System SHALL maintain the existing A4 portrait page layout with two receipt copies (Parent Copy and School Copy) on a single page
2. THE Receipt_System SHALL preserve the existing CSS styling, dimensions (133mm per copy, 190mm width), and print window behavior
3. WHEN displaying multi-month content, THE Receipt_System SHALL ensure both copies fit within the existing 133mm height constraint per copy
4. THE Receipt_System SHALL continue to use the existing print dialog and window close behavior

### Requirement 7: No Firestore Write Operations

**User Story:** As a developer maintaining the system, I want the multi-month receipt feature to be purely a read-only aggregation operation, so that existing fee record creation and deletion logic remains unchanged and safe.

#### Acceptance Criteria

1. THE Receipt_System SHALL NOT invoke createFeeRecord() from feeRepository.js
2. THE Receipt_System SHALL NOT invoke softDeleteFeeRecord() from feeRepository.js
3. THE Receipt_System SHALL NOT write to or modify any Firestore documents
4. THE Receipt_System SHALL only read existing Fee_Record data passed to it from the Selection_UI

### Requirement 8: Chronological Month Sorting

**User Story:** As a school administrator, I want multi-month receipts to always display the period in chronological order (earliest to latest), so that receipt information is predictable and easy to verify.

#### Acceptance Criteria

1. THE Receipt_System SHALL define a month index mapping where January = 1, February = 2, ..., December = 12
2. WHEN sorting Fee_Record objects for a multi-month receipt, THE Receipt_System SHALL sort first by the year field (ascending), then by the month index (ascending)
3. WHEN month names are provided as strings (e.g., "January", "April"), THE Receipt_System SHALL convert them to numeric indices using the month index mapping before sorting

