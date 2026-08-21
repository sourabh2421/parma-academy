# Implementation Plan: Multi-Month Receipt Support

## Overview

This implementation extends the existing fee receipt generation system to support consolidated receipts for multiple consecutive monthly payments. The approach is divided into four phases: helper function implementation, ReceiptPrint component modifications, StudentDetailModal UI enhancements, and comprehensive testing. The implementation maintains backward compatibility with single-month receipts while adding multi-month selection capabilities.

**Key Implementation Strategy:**
- Phase 1: Build and test helper functions in isolation (sorting, aggregation, formatting)
- Phase 2: Modify ReceiptPrint.jsx to handle both single and array inputs (backward compatible)
- Phase 3: Add checkbox selection UI to StudentDetailModal.jsx with year validation
- Phase 4: Comprehensive testing with property-based tests and manual verification

**Files to Modify:**
- `/Users/jarvis/parma-academy/parma-academy/src/innercomponents/dashboard/ReceiptPrint.jsx`
- `/Users/jarvis/parma-academy/parma-academy/src/innercomponents/dashboard/StudentDetailModal.jsx`

**Testing Strategy:**
- Unit tests for all helper functions
- 6 property-based tests using `fast-check` (100+ iterations each)
- React component tests with `@testing-library/react`
- Manual print preview verification

## Tasks

- [ ] 1. Set up testing infrastructure
  - Install `fast-check` library for property-based testing: `npm install --save-dev fast-check`
  - Create test file structure: `src/__tests__/multiMonthReceipt.test.js`
  - Set up test configuration for React Testing Library if not already configured
  - _Requirements: All (testing foundation for entire feature)_

- [ ] 2. Implement helper functions and constants in ReceiptPrint.jsx
  - [ ] 2.1 Add month mapping constants
    - Add `MONTH_INDEX` constant mapping month names to numeric indices (January=1, December=12)
    - Add `MONTH_ABBR` constant mapping month names to 3-letter abbreviations (January='Jan', etc.)
    - _Requirements: 4.3, 8.1_
  
  - [ ] 2.2 Implement sortFeesChronologically function
    - Create function that accepts array of fee records
    - Sort by year (ascending), then by MONTH_INDEX (ascending)
    - Return new sorted array without mutating input
    - _Requirements: 2.2, 8.2, 8.3_
  
  - [ ]* 2.3 Write property test for chronological sorting
    - **Property 1: Chronological Sorting Correctness**
    - **Validates: Requirements 2.2, 2.4, 2.5, 8.2, 8.3**
    - Generate arbitrary fee arrays with random months/years
    - Assert sorted output has year ascending, then month ascending
    - Run 100+ iterations with `fast-check`
  
  - [ ] 2.4 Implement computeTotalAmount function
    - Accept array of fee records
    - Sum all amount fields, treating null/undefined as 0
    - Return total as number
    - _Requirements: 2.3_
  
  - [ ]* 2.5 Write property test for amount aggregation
    - **Property 2: Amount Aggregation Correctness**
    - **Validates: Requirements 2.3, 3.3**
    - Generate arbitrary fee arrays with random amounts
    - Assert computed total equals manual sum of all amounts
    - Run 100+ iterations with `fast-check`
  
  - [ ] 2.6 Implement formatPeriodLabel function
    - Accept chronologically sorted fee array
    - If length === 1: return "Month: {month} {year}"
    - If length > 1: return "Period: {firstMonth} {firstYear} to {lastMonth} {lastYear}"
    - _Requirements: 3.1, 3.2_
  
  - [ ]* 2.7 Write property test for period label format
    - **Property 5: Period Label Format Correctness**
    - **Validates: Requirements 3.1, 3.2**
    - Generate arbitrary fee arrays (length 1 to 20)
    - Assert single-fee returns "Month:" format
    - Assert multi-fee returns "Period: ... to ..." format
    - Run 100+ iterations with `fast-check`
  
  - [ ] 2.8 Implement generateMultiMonthReceiptNumber function
    - Accept sorted fee array and studentId
    - If length === 1: generate "PA-{year}{monthNumber}-{studentId}" format (zero-padded month)
    - If length > 1: generate "PA-{year}-{firstMonthAbbr}to{lastMonthAbbr}-{studentId}" format
    - Truncate studentId to 20 characters
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [ ]* 2.9 Write property test for month abbreviation mapping
    - **Property 7: Month Name to Abbreviation Mapping**
    - **Validates: Requirements 4.3**
    - For each valid month name (January-December)
    - Assert MONTH_ABBR returns correct 3-letter code
    - Run 100+ iterations with `fast-check`
  
  - [ ]* 2.10 Write property test for multi-month receipt number format
    - **Property 6: Receipt Number Format for Multi-Month**
    - **Validates: Requirements 4.2, 4.3**
    - Generate arbitrary same-year fee arrays (length 2+)
    - Assert receipt number matches regex pattern "PA-{year}-{abbr}to{abbr}-{id}"
    - Assert abbreviations match first and last months
    - Run 100+ iterations with `fast-check`

- [ ] 3. Checkpoint - Verify helper functions
  - Ensure all helper function unit tests pass
  - Ensure all property-based tests pass (100+ iterations each)
  - Ask the user if questions arise

- [ ] 4. Modify ReceiptPrint component for multi-month support
  - [ ] 4.1 Update component to accept single fee or array
    - Modify component signature documentation to reflect `fee` can be object or array
    - Add array normalization: `const feeArray = Array.isArray(fee) ? fee : [fee]`
    - _Requirements: 2.1_
  
  - [ ] 4.2 Integrate helper functions into component logic
    - Call `sortFeesChronologically(feeArray)` to get sorted fees
    - Call `computeTotalAmount(sortedFees)` to get total amount
    - Call `formatPeriodLabel(sortedFees)` to get period label
    - Call `generateMultiMonthReceiptNumber(sortedFees, student.id)` to get receipt number
    - Extract last fee's payment date: `sortedFees[sortedFees.length - 1].paymentDate`
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 3.4, 4.1, 4.2_
  
  - [ ] 4.3 Update HTML template to use dynamic period label
    - Replace hardcoded "Month:" and "Year:" rows with single dynamic row
    - Parse `periodLabel` to extract label type (Month or Period) and value
    - Apply same changes to both Parent Copy and School Copy sections
    - Ensure CSS styling remains consistent
    - _Requirements: 3.1, 3.2, 6.1, 6.2, 6.3_
  
  - [ ]* 4.4 Write unit tests for ReceiptPrint backward compatibility
    - Test with single fee object (existing behavior)
    - Assert receipt number format "PA-YYYYMM-{id}"
    - Assert "Month: {month} {year}" format
    - Verify no breaking changes to existing functionality
    - _Requirements: 3.1, 4.1, 6.1, 6.2_
  
  - [ ]* 4.5 Write unit tests for ReceiptPrint multi-month behavior
    - Test with 2-month fee array
    - Assert receipt number format "PA-YYYY-{abbr}to{abbr}-{id}"
    - Assert "Period: {first} to {last}" format
    - Verify aggregated amount display
    - _Requirements: 3.2, 4.2, 4.3_

- [ ] 5. Implement multi-month selection UI in StudentDetailModal
  - [ ] 5.1 Add state management for fee selection
    - Add `const [selectedFees, setSelectedFees] = useState([])` state
    - Add `const [selectedYear, setSelectedYear] = useState(null)` state for year constraint
    - _Requirements: 1.4, 5.1, 5.2_
  
  - [ ] 5.2 Implement selection handler functions
    - Create `handleFeeSelection(fee, isChecked)` function
    - When checked: add fee to selectedFees, set selectedYear if first selection
    - When unchecked: remove fee from selectedFees, clear selectedYear if last selection
    - Create `isFeeSelected(fee)` helper to check if fee is in selection
    - _Requirements: 1.4, 5.1, 5.4_
  
  - [ ] 5.3 Implement checkbox disabled logic
    - Create `isCheckboxDisabled(fee)` function
    - Disable if fee.status === 'pending'
    - Disable if selectedYear is set and fee.year !== selectedYear
    - Enable otherwise
    - _Requirements: 1.2, 1.3, 5.3_
  
  - [ ] 5.4 Add checkbox column to fee table
    - Add checkbox as first column in fee table header
    - For each fee row, render: `<input type="checkbox" checked={isFeeSelected(fee)} disabled={isCheckboxDisabled(fee)} onChange={(e) => handleFeeSelection(fee, e.target.checked)} />`
    - Ensure checkboxes align properly with table layout
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ] 5.5 Add conditional "Print Selected Receipt" button
    - Show button only when `selectedFees.length > 0`
    - Button click handler: `setPrintingFee(selectedFees)` (pass array instead of single object)
    - Position button near existing single-fee print buttons
    - _Requirements: 1.5, 1.6_
  
  - [ ]* 5.6 Write property test for same-year validation
    - **Property 8: Same-Year Validation Constraint**
    - **Validates: Requirements 5.1, 5.2, 5.3**
    - Simulate selection process with year validation logic
    - Generate arbitrary fee arrays with mixed years
    - Assert all selected fees have identical year values
    - Run 100+ iterations with `fast-check`
  
  - [ ]* 5.7 Write React component tests for checkbox interactions
    - Test: Checkboxes render for each fee record
    - Test: Checking checkbox adds fee to selection
    - Test: Unchecking checkbox removes fee from selection
    - Test: Pending fees have disabled checkboxes
    - Test: Different-year fees have disabled checkboxes when year constraint active
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.3_
  
  - [ ]* 5.8 Write React component tests for print button visibility
    - Test: Button not visible when selectedFees is empty
    - Test: Button visible when at least one fee selected
    - Test: Button hidden again when all selections removed
    - _Requirements: 1.5, 1.6_

- [ ] 6. Checkpoint - Integration verification
  - Test complete flow: select multiple fees → click print → verify receipt opens
  - Ensure all automated tests pass (unit + property-based + component)
  - Ask the user if questions arise

- [ ] 7. Verify no Firestore write operations
  - [ ] 7.1 Audit code for Firestore write calls
    - Search for any calls to `createFeeRecord()` in modified components
    - Search for any calls to `softDeleteFeeRecord()` in modified components
    - Search for any Firestore write operations (`.set()`, `.update()`, `.delete()`)
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ]* 7.2 Write test to verify read-only behavior
    - Mock all Firestore methods
    - Execute receipt generation flow
    - Assert zero calls to write methods
    - Assert only read operations performed
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 8. Manual testing and validation
  - [ ] 8.1 Test single-month receipt (backward compatibility)
    - Select single paid fee from fee table
    - Click existing single-fee print button
    - Verify receipt displays "Month: {month} {year}"
    - Verify receipt number format "PA-YYYYMM-{id}"
    - Verify print preview fits on one A4 page (133mm per copy)
    - _Requirements: 3.1, 4.1, 6.1, 6.2, 6.3_
  
  - [ ] 8.2 Test two-month receipt
    - Select two consecutive paid fees from same year
    - Click "Print Selected Receipt" button
    - Verify receipt displays "Period: {first} to {last}"
    - Verify receipt number format "PA-YYYY-{abbr}to{abbr}-{id}"
    - Verify aggregated amount is sum of both fees
    - Verify payment date is from last selected fee
    - Verify print preview fits on one A4 page
    - _Requirements: 2.2, 2.3, 3.2, 3.3, 3.4, 4.2, 4.3, 6.3_
  
  - [ ] 8.3 Test multi-month receipt (3+ months)
    - Select 3+ consecutive paid fees from same year
    - Verify period label shows first to last month
    - Verify receipt number format correct
    - Verify total amount aggregation
    - Verify print layout integrity (no overflow or truncation)
    - _Requirements: 2.2, 2.3, 3.2, 3.3, 4.2, 6.3_
  
  - [ ] 8.4 Test year validation constraint
    - Select fee from year 2025
    - Attempt to select fee from year 2026
    - Verify 2026 checkbox is disabled
    - Deselect 2025 fee
    - Verify 2026 checkbox becomes enabled again
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 8.5 Test edge cases
    - Test with pending status fees (checkboxes disabled)
    - Test with fees in non-chronological order (verify sorting works)
    - Test with fees containing null/zero amounts (verify graceful handling)
    - Test print button visibility toggle (select/deselect all)
    - _Requirements: 1.2, 2.2, 2.3_

- [ ] 9. Final checkpoint - Complete feature validation
  - Ensure all automated tests pass (unit, property-based, component)
  - Ensure manual testing scenarios completed successfully
  - Ensure backward compatibility verified (single-month receipts work unchanged)
  - Ensure print layout integrity maintained across all scenarios
  - Ask the user if questions arise

## Notes

- **Optional tasks marked with `*`**: Test-related sub-tasks are optional and can be skipped for faster MVP, but strongly recommended for production quality
- **Property-based tests**: 6 properties covering sorting, aggregation, format validation, and constraints (100+ iterations each using `fast-check`)
- **Backward compatibility**: Single-month receipt functionality remains completely unchanged - existing print buttons continue to work
- **Incremental development**: Each phase builds on the previous, with checkpoints to validate before proceeding
- **No Firestore writes**: This feature is purely read-only aggregation - no database modifications
- **Testing strategy**: Combination of unit tests (specific examples), property-based tests (universal properties), and manual testing (visual/layout verification)
- **Files modified**: Only `ReceiptPrint.jsx` and `StudentDetailModal.jsx` require changes
- **UI enhancement**: Checkbox selection UI with same-year validation prevents invalid receipt generation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.4", "2.6", "2.8"] },
    { "id": 2, "tasks": ["2.3", "2.5", "2.7", "2.9", "2.10"] },
    { "id": 3, "tasks": ["4.1"] },
    { "id": 4, "tasks": ["4.2"] },
    { "id": 5, "tasks": ["4.3"] },
    { "id": 6, "tasks": ["4.4", "4.5", "5.1"] },
    { "id": 7, "tasks": ["5.2", "5.3"] },
    { "id": 8, "tasks": ["5.4", "5.5"] },
    { "id": 9, "tasks": ["5.6", "5.7", "5.8", "7.1"] },
    { "id": 10, "tasks": ["7.2"] },
    { "id": 11, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5"] }
  ]
}
```
