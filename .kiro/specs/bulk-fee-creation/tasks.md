# Implementation Plan: Bulk Fee Creation

## Overview

This implementation extends the existing AddFeeModal component to support bulk fee creation for 2-12 months with shared fee details. The implementation adds a mode toggle, multi-month selection UI, sequential bulk creation logic, comprehensive validation, and aggregated user feedback while preserving all existing single-month behavior.

## Tasks

- [x] 1. Add state management for multi-month mode
  - Add `isMultiMonth` boolean state (default false)
  - Add `selectedMonths` Set state for tracking selected months
  - Add `processingIndex` number state for progress display during bulk creation
  - _Requirements: 1.2, 3.1_

- [x] 2. Implement mode toggle UI component
  - Add checkbox control between dialog header and month selection fields
  - Label: "Create fees for multiple months"
  - Wire toggle to `isMultiMonth` state
  - Clear `selectedMonths` when switching to Multi-Month Mode
  - _Requirements: 1.1, 1.3, 1.4_

- [ ] 3. Implement multi-month selection UI
  - [ ] 3.1 Create month checkbox grid component
    - Render grid of 12 month checkboxes (3 columns on mobile, 4 on desktop)
    - Display abbreviated month names (first 3 letters)
    - Show "Select months (2-12)" label above grid
    - Conditional rendering: only display when `isMultiMonth` is true
    - _Requirements: 3.1_

  - [ ] 3.2 Implement month toggle handler
    - Create `handleMonthToggle(month, checked)` function
    - Add month to `selectedMonths` Set when checked (if size < 12)
    - Remove month from `selectedMonths` Set when unchecked
    - _Requirements: 3.2, 3.5_

  - [ ] 3.3 Add validation messages for month selection
    - Display "Select at least 2 months" when 0 < size < 2 (amber color)
    - Display "Maximum 12 months selected" when size >= 12 (slate color)
    - Disable unchecked checkboxes when size >= 12
    - _Requirements: 3.3, 3.4_

- [ ] 4. Update existing single-month UI for conditional rendering
  - Wrap existing month dropdown in conditional: `{!isMultiMonth && ...}`
  - Ensure year dropdown remains visible in both modes
  - Verify shared fee detail inputs (amount, status, payment date) remain visible in both modes
  - _Requirements: 2.1, 4.1, 4.2, 4.3, 5.3_

- [ ] 5. Implement pre-submission validation function
  - [ ] 5.1 Create `validateInputs()` function
    - Validate amount: must be finite, non-negative number
    - Validate payment date: required when status is 'paid'
    - Validate month selection in Multi-Month Mode: must have 2-12 months
    - Return `{ valid: boolean, error?: string }` object
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 5.2 Write unit tests for validation function
    - Test invalid amount cases (negative, non-numeric, NaN)
    - Test missing payment date with paid status
    - Test insufficient month selection (0 and 1 months)
    - Test excessive month selection (>12 months)
    - Test validation consistency across both modes
    - _Requirements: 10.4_

- [ ] 6. Extract existing single-month submission logic
  - Create `handleSingleMonthSubmit()` function
  - Move existing createFeeRecord call and success/error handling into this function
  - Preserve all existing behavior: toast messages for merge/revival/update, modal close, onCreated callback
  - _Requirements: 2.3, 2.4_

- [ ] 7. Implement bulk creation logic
  - [ ] 7.1 Create `handleMultiMonthSubmit()` function
    - Convert `selectedMonths` Set to array
    - Initialize results tracking object: `{ successes: [], failures: [], mergedCount: 0, revivedCount: 0, updateCount: 0 }`
    - Set `submitting` to true before loop
    - _Requirements: 6.1, 7.2_

  - [ ] 7.2 Implement sequential fee creation loop
    - Iterate through months array with index
    - Update `processingIndex` state before each createFeeRecord call
    - Call createFeeRecord with current month and shared fee details
    - On success: add month to successes array, aggregate metadata counts
    - On failure: add `{ month, error }` to failures array, continue to next month
    - _Requirements: 6.1, 6.2, 7.1, 7.3_

  - [ ]* 7.3 Write property test for bulk creation completeness
    - **Property 3: Bulk Creation Call Completeness**
    - **Validates: Requirements 6.1**
    - Generate random month selections (2-12 months)
    - Verify createFeeRecord called exactly N times for N selected months
    - Use fast-check library with 100+ iterations
    - _Requirements: 6.1_

  - [ ]* 7.4 Write property test for argument consistency
    - **Property 4: Comprehensive Argument Consistency**
    - **Validates: Requirements 4.4, 4.5, 4.6, 6.2**
    - Generate random fee details (amount, status, paymentDate)
    - Verify all createFeeRecord calls receive identical fee details
    - Verify each call receives unique month from selected set
    - Use fast-check library with 100+ iterations
    - _Requirements: 4.4, 4.5, 4.6, 6.2_

- [ ] 8. Implement result aggregation and messaging
  - [ ] 8.1 Create `formatSuccessMessage(results)` function
    - Handle full success: display count + month range + metadata
    - Handle partial success: display success count, failure count, failed month names
    - Handle total failure: display error message with console reference
    - _Requirements: 7.4, 8.1, 8.3_

  - [ ] 8.2 Create `formatMonthRange(months)` function
    - Sort months by calendar order using MONTH_OPTIONS.indexOf()
    - Check if months are consecutive in calendar
    - If consecutive: return "FirstMonth–LastMonth Year" format
    - If non-consecutive: return "N months (First, ..., Last) Year" format
    - _Requirements: 8.2_

  - [ ] 8.3 Add post-loop feedback logic to `handleMultiMonthSubmit()`
    - Call `formatSuccessMessage(results)` after loop completes
    - Display success toast and close modal on full success
    - Display warning toast and keep modal open on partial failure
    - Display error toast on total failure
    - Call `onCreated()` callback on full or partial success
    - _Requirements: 7.4, 8.1, 8.2, 8.3, 9.1, 9.2_

  - [ ]* 8.4 Write unit tests for message formatting
    - Test consecutive month range formatting (e.g., April–June 2026)
    - Test non-consecutive month formatting (e.g., 3 months)
    - Test metadata inclusion (merged duplicates, revivals, updates)
    - Test partial failure message format
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 9. Update submit button UI
  - [ ] 9.1 Implement dynamic button label logic
    - Single Mode, not submitting: "Save fee record"
    - Single Mode, submitting: "Saving…"
    - Multi Mode, not submitting: "Create N fee record(s)"
    - Multi Mode, submitting: "Saving X of N..." (where X = processingIndex + 1)
    - _Requirements: 8.4_

  - [ ]* 9.2 Write unit test for progress display
    - Verify button label updates during multi-month submission
    - Mock createFeeRecord to control timing
    - Assert "Saving 1 of 3...", "Saving 2 of 3...", "Saving 3 of 3..." sequence
    - _Requirements: 8.4_

- [ ] 10. Update main `handleSubmit()` function
  - Call `validateInputs()` at start
  - Display error toast and return early if validation fails
  - Branch on `isMultiMonth`: call `handleMultiMonthSubmit()` or `handleSingleMonthSubmit()`
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 11. Checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Verify no regressions in single-month mode
  - Test multi-month mode end-to-end in local development
  - Ask the user if questions arise

- [ ] 12. Add regression tests for single-month mode
  - [ ]* 12.1 Write property test for single-mode preservation
    - **Property 1: Single-Mode Behavior Preservation**
    - **Validates: Requirements 2.3, 2.4**
    - Generate random valid single-month inputs
    - Verify createFeeRecord called exactly once with correct parameters
    - Verify toast messages unchanged from original behavior
    - Use fast-check library with 100+ iterations
    - _Requirements: 2.3, 2.4_

  - [ ]* 12.2 Write unit tests for single-month UI
    - Verify modal defaults to Single Month Mode
    - Verify month dropdown displays all 12 months
    - Verify submit calls createFeeRecord once
    - Verify modal closes on success
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 13. Add property tests for partial failure handling
  - [ ]* 13.1 Write property test for processing continuation
    - **Property 5: Partial Failure Processing Continuation**
    - **Validates: Requirements 7.1**
    - Mock createFeeRecord to fail at random position
    - Verify remaining months still processed
    - Use fast-check library with 100+ iterations
    - _Requirements: 7.1_

  - [ ]* 13.2 Write property test for result tracking accuracy
    - **Property 6: Result Tracking Accuracy**
    - **Validates: Requirements 7.2**
    - Generate random success/failure patterns
    - Verify successes.length + failures.length = total selected months
    - Verify no duplicates across successes and failures
    - Use fast-check library with 100+ iterations
    - _Requirements: 7.2_

- [ ] 14. Add integration tests for complete workflows
  - [ ]* 14.1 Write integration test for full success flow
    - Select 3 consecutive months, enter valid fee details
    - Submit and verify 3 createFeeRecord calls
    - Verify success toast with month range format
    - Verify modal closes and onCreated called
    - _Requirements: 6.1, 8.1, 8.2, 9.1, 9.2_

  - [ ]* 14.2 Write integration test for partial failure flow
    - Mock createFeeRecord to fail on second month
    - Verify first month succeeds, third month processes
    - Verify warning toast with success/failure counts
    - Verify modal remains open
    - Verify onCreated still called
    - _Requirements: 7.1, 7.2, 7.4_

  - [ ]* 14.3 Write integration test for validation errors
    - Test submit with negative amount in both modes
    - Test submit with paid status but no payment date in both modes
    - Test submit with 0 months in Multi-Month Mode
    - Test submit with 1 month in Multi-Month Mode
    - Verify error toasts and submission prevention
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 15. Final checkpoint - Ensure all tests pass
  - Run complete test suite (unit tests, property tests, integration tests)
  - Verify code coverage for new functionality
  - Test multi-month mode with edge cases (2 months, 12 months, non-consecutive)
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties across many generated inputs
- Unit tests validate specific examples, UI rendering, and edge cases
- The implementation preserves 100% backward compatibility with existing single-month behavior
- Sequential bulk creation (not parallel) respects Firestore rate limits and provides progress feedback
- Partial failure handling ensures successful months are not rolled back when one fails

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2"] },
    { "id": 1, "tasks": ["3.1", "4"] },
    { "id": 2, "tasks": ["3.2", "5.1", "6"] },
    { "id": 3, "tasks": ["3.3", "5.2", "7.1"] },
    { "id": 4, "tasks": ["7.2", "8.1", "8.2"] },
    { "id": 5, "tasks": ["7.3", "7.4", "8.3", "9.1"] },
    { "id": 6, "tasks": ["8.4", "9.2", "10"] },
    { "id": 7, "tasks": ["12.1", "12.2", "13.1", "13.2"] },
    { "id": 8, "tasks": ["14.1", "14.2", "14.3"] }
  ]
}
```
