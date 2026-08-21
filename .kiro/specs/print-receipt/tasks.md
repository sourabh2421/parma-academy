# Implementation Plan: Print Receipt Feature

## Overview

This implementation plan breaks down the Print Receipt feature into actionable coding tasks. The feature adds professional receipt printing capability to the student fee management system, allowing administrators to generate formatted, printable receipts for paid fee records with two identical copies per page (Parent Copy and School Copy).

The implementation follows a four-phase approach: creating the ReceiptPrint component with helper functions and styling, modifying the StudentDetailModal to integrate the print button and receipt component, adding tests to validate functionality, and documenting the changes.

## Tasks

- [x] 1. Create ReceiptPrint component with helper functions
  - [x] 1.1 Create ReceiptPrint.jsx file and implement helper functions
    - Create `/Users/jarvis/parma-academy/parma-academy/src/innercomponents/dashboard/ReceiptPrint.jsx`
    - Implement `generateReceiptNumber(year, month, studentId)` function that maps month names to two-digit numbers and formats receipt number as "PA-{YYYY}{MM}-{studentId}"
    - Implement `formatPaymentDate(paymentDate)` function that converts Date objects or ISO strings to dd/MM/yyyy format with "N/A" fallback for invalid dates
    - Implement `formatAmount(amount)` function that formats numbers as "INR X,XXX.XX" with thousand separators and two decimal places
    - Add defensive null checks and console warnings for invalid inputs in all helper functions
    - _Requirements: 4.3, 4.9, 4.10, 4.13, 5.1, 5.2, 5.3, 5.4, 5.6_

  - [x] 1.2 Implement ReceiptPrint component structure with two receipt copies
    - Add React component with `student` and `fee` props destructuring
    - Add early return with console error if `student` or `fee` props are null/undefined
    - Create local state `isPrinting` using `useState(false)` to control print visibility
    - Implement `handlePrint()` function that sets `isPrinting` to true, uses `setTimeout(100ms)` to allow render, calls `window.print()`, then resets `isPrinting` to false
    - Render two identical receipt copy sections within a container div
    - Add school name "Parma Academy" in 18pt font header for both copies
    - Add school address "Parikrama Marg, Parmapuram, Ayodhya - 224123 U.P." below header
    - Display "Parent Copy" label at top of first receipt copy
    - Display "School Copy" label at top of second receipt copy
    - Add separator div with dashed horizontal line and "Cut along the line" text positioned at 50% page height
    - Display receipt number using `generateReceiptNumber()` helper
    - Display student name, class, parent name (with "N/A" fallback if missing)
    - Display month, year, formatted amount using `formatAmount()` helper
    - Display payment date using `formatPaymentDate()` helper
    - Display status as "Paid"
    - Wrap each data field with "N/A" fallback using `value ?? 'N/A'` pattern
    - Add 1px solid border around each receipt copy perimeter
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.11, 4.12, 4.14, 7.1, 7.2, 7.5, 7.6, 7.7, 8.6, 8.7, 10.5_

  - [x] 1.3 Add print-specific CSS styling with @media print rules
    - Create inline `<style>` tag or separate CSS file for print styles
    - Add `@media print` rule that hides all body children except receipt container using `display: none !important`
    - Set `@page` to A4 portrait size with 12.7mm (0.5 inch) margins on all sides
    - Style receipt container to 210mm width, 297mm min-height, with 10mm padding
    - Position first receipt copy within 0-48% page height
    - Position second receipt copy within 52-100% page height
    - Style separator at 50% page height with dashed 2px border and centered "Cut along the line" text
    - Set school header to 18pt font size, center-aligned
    - Set body text to minimum 12pt font size
    - Right-align currency amounts with decimal points vertically aligned
    - Add minimum 8mm vertical spacing between content sections
    - Add 15mm margins on all sides within printable area
    - Add `@media screen` rule that sets receipt container to `display: none` by default
    - Add `.is-printing` class that changes display to `block` and positions as fixed overlay at z-index 9999
    - Set `page-break-inside: avoid` on receipt copy elements to prevent splitting across pages
    - _Requirements: 3.9, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 9.1, 9.2, 9.3, 9.4, 9.5, 10.1, 10.2, 10.3, 10.4, 10.6_

- [ ] 2. Modify StudentDetailModal to integrate Print Receipt feature
  - [x] 2.1 Add print state and import ReceiptPrint component
    - Add import statement: `import ReceiptPrint from './ReceiptPrint.jsx'`
    - Add state: `const [printingFee, setPrintingFee] = useState(null)`
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 2.2 Add conditional Print Receipt button in fee table actions column
    - Wrap existing Archive button and new Print button in `<div className="flex justify-end gap-2">` container
    - Add conditional render: `{fee.status === 'paid' && (...)}`
    - Create Print Receipt button with type="button" attribute
    - Add onClick handler: `onClick={() => setPrintingFee(fee)}`
    - Apply Tailwind classes: "rounded border border-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 focus:outline-2 focus:outline-emerald-500"
    - Set button text content to "Print Receipt"
    - Position Print button immediately before Archive button with 8px gap (`gap-2` class)
    - Ensure Archive button remains in same position with identical styling
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 2.2, 7.4_

  - [-] 2.3 Add conditional render of ReceiptPrint component
    - Add conditional render after modal closing div: `{printingFee && (<ReceiptPrint ... />)}`
    - Pass `student={student}` prop to ReceiptPrint
    - Pass `fee={printingFee}` prop to ReceiptPrint
    - Pass `onClose={() => setPrintingFee(null)}` prop to ReceiptPrint (for future close functionality)
    - Ensure ReceiptPrint renders as sibling to modal overlay div, not nested inside modal
    - _Requirements: 2.1, 2.3, 2.4, 7.1, 7.2, 7.3, 8.6, 9.1, 9.2, 9.3_

- [~] 3. Checkpoint - Ensure print feature works correctly
  - Manually test that Print Receipt button appears only for paid fee records
  - Manually test that clicking Print Receipt button opens browser print dialog within 2 seconds
  - Manually test that receipt displays two identical copies with correct data
  - Manually test that print preview shows only receipt content without modal UI elements
  - Manually test that Print button has visible 2px focus indicator when tabbed to
  - Ask user if any issues arise or if additional adjustments are needed

- [ ]* 4. Write unit tests for helper functions
  - [ ]* 4.1 Write tests for generateReceiptNumber function
    - Test receipt number format for January 2025 with studentId "STU001" returns "PA-202501-STU001"
    - Test receipt number format for December 2025 with studentId "STU042" returns "PA-202512-STU042"
    - Test studentId truncation when length exceeds 20 characters
    - Test unrecognized month name returns "PA-{YYYY}00-{studentId}" with console warning
    - Test all 12 month names map to correct two-digit numbers (January=01, February=02, ..., December=12)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 4.2 Write tests for formatPaymentDate function
    - Test Date object (new Date(2025, 0, 15)) formats to "15/01/2025"
    - Test ISO string "2025-03-05T00:00:00Z" formats to "05/03/2025"
    - Test null input returns "N/A"
    - Test undefined input returns "N/A"
    - Test invalid date string "not-a-date" returns "N/A"
    - Test single-digit days and months have zero-padding (e.g., "05/03/2025" not "5/3/2025")
    - _Requirements: 4.10, 4.14_

  - [ ]* 4.3 Write tests for formatAmount function
    - Test whole number 5000 formats to "INR 5,000.00"
    - Test decimal 1234.56 formats to "INR 1,234.56"
    - Test zero formats to "INR 0.00"
    - Test NaN returns "INR 0.00"
    - Test negative number returns "INR 0.00" with console warning
    - Test non-number type returns "INR 0.00" with console warning
    - _Requirements: 4.9, 4.13_

- [ ]* 5. Write component integration tests
  - [ ]* 5.1 Write tests for ReceiptPrint component rendering
    - Test ReceiptPrint returns null when student prop is null
    - Test ReceiptPrint returns null when fee prop is undefined
    - Test ReceiptPrint renders two receipt copies when valid props provided
    - Test "Parent Copy" label appears in first copy
    - Test "School Copy" label appears in second copy
    - Test receipt displays student.name value
    - Test receipt displays fee.amount formatted with formatAmount helper
    - Test receipt displays "N/A" when student.parentName is missing
    - _Requirements: 3.4, 3.6, 4.4, 4.6, 4.14, 7.5_

  - [ ]* 5.2 Write tests for Print button visibility in StudentDetailModal
    - Test Print button renders when fee.status equals "paid"
    - Test Print button does not render when fee.status equals "pending"
    - Test Print button does not render when fee.status is any other value
    - Test Print button has type="button" attribute
    - Test Print button displays text content "Print Receipt"
    - Test Print button has focus:outline-2 class for keyboard accessibility
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.6_

  - [ ]* 5.3 Write integration tests for print flow
    - Test clicking Print button sets printingFee state to selected fee object
    - Test ReceiptPrint component receives correct student prop from StudentDetailModal
    - Test ReceiptPrint component receives correct fee prop matching clicked row
    - Test print state resets to null after print action completes
    - _Requirements: 2.1, 2.3, 2.4, 7.4_

- [~] 6. Final checkpoint - Verify feature completeness
  - Run all unit tests and integration tests to ensure they pass
  - Perform manual cross-browser testing (Chrome, Firefox, Safari) to verify print dialog works consistently
  - Test keyboard navigation to ensure Print button is accessible via Tab key with visible focus indicator
  - Verify receipt number follows "PA-{YYYY}{MM}-{studentId}" format with correct zero-padding
  - Verify receipt layout matches A4 dimensions with correct margins and spacing
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements from the requirements document for traceability
- Checkpoints ensure incremental validation at reasonable breaks
- The Print Receipt feature is self-contained and does not modify any repository files (feeRepository.js, studentRepository.js)
- The implementation uses browser native `window.print()` API which is supported in all modern browsers
- Print styling uses CSS `@media print` rules to ensure only receipt content appears in print output
- Receipt data comes from already-loaded props, no additional Firestore queries are needed
- The receipt component is rendered as a sibling to the modal, not nested inside it, to ensure proper print isolation
- Helper functions include defensive null checks and console warnings for debugging invalid inputs

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3", "2.1"] },
    { "id": 3, "tasks": ["2.2"] },
    { "id": 4, "tasks": ["2.3"] },
    { "id": 5, "tasks": ["4.1", "4.2", "4.3", "5.1", "5.2"] },
    { "id": 6, "tasks": ["5.3"] }
  ]
}
```
