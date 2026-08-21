# Design Document: Bulk Fee Creation

## Overview

This design extends the existing AddFeeModal component to support creating fee records for multiple consecutive months in a single operation. The current implementation requires administrators to open the modal multiple times to create fee records for consecutive months—a workflow inefficiency when parents pay upfront for several months.

The design introduces a dual-mode interface: Single Month Mode (existing behavior) and Multi-Month Mode (new bulk creation). The implementation preserves the existing createFeeRecord function signature and behavior, calling it N times for N selected months with shared fee details (amount, status, payment date).

**Key Design Decisions:**
- **State-driven mode switching**: A boolean `isMultiMonth` flag controls UI rendering and submission logic
- **Set-based month tracking**: Uses JavaScript Set to track selected months in Multi-Month Mode for efficient add/remove operations
- **Sequential bulk creation**: Calls createFeeRecord sequentially (not in parallel) to respect Firestore rate limits and provide granular progress feedback
- **Partial failure tolerance**: Tracks success/failure per month, continues processing remaining months on failure
- **Aggregated feedback**: Displays a single success message with month range and count instead of N individual toasts

## Architecture

### Component Structure

```
AddFeeModal (existing component, extended)
├── State Management
│   ├── isMultiMonth: boolean (new)
│   ├── selectedMonths: Set<string> (new)
│   ├── month: string (existing, used in Single Mode)
│   ├── year: number (existing, shared across modes)
│   ├── amount: string (existing, shared across modes)
│   ├── status: 'pending' | 'paid' (existing, shared)
│   ├── paymentDate: Date | null (existing, shared)
│   └── submitting: boolean (existing, extended with progress)
│
├── UI Rendering (conditional on isMultiMonth)
│   ├── Mode Toggle Control
│   ├── Single Month Dropdown (when !isMultiMonth)
│   ├── Multi-Month Checkbox Grid (when isMultiMonth)
│   ├── Shared Fee Details Inputs (amount, status, paymentDate)
│   └── Submit Button (label changes based on mode)
│
└── Submission Logic
    ├── validateInputs() (new, pre-submission validation)
    ├── handleSubmit() (existing, branched on isMultiMonth)
    ├── handleSingleMonthSubmit() (existing logic, extracted)
    ├── handleMultiMonthSubmit() (new bulk creation logic)
    └── formatSuccessMessage() (new, aggregates results)
```

### Data Flow

**Single Month Mode (existing behavior, unchanged):**
```
User opens modal → Defaults to Single Mode → Selects month, amount, status → 
Submit → Validate → createFeeRecord(single month) → Success toast → Close
```

**Multi-Month Mode (new behavior):**
```
User opens modal → Toggles to Multi Mode → Selects 2-12 months, amount, status → 
Submit → Validate (2-12 months, amount, paid date) → 
For each selected month:
  → createFeeRecord(month_i) → Track success/failure → Update progress
→ Aggregate results → Display summary toast (range + count) → Close
```

### Interaction with Existing Systems

- **createFeeRecord**: Called N times with identical fee details except `month` parameter
- **Toast System**: Used once per submission (not per month) to display aggregated results
- **onCreated Callback**: Called once after all months processed (success or partial success)
- **Firestore**: Each createFeeRecord call follows existing duplicate detection, merging, and revival logic

## Components and Interfaces

### State Management

#### New State Variables

```typescript
// Mode toggle flag
isMultiMonth: boolean
// Initially false (defaults to Single Month Mode)

// Selected months in Multi-Month Mode
selectedMonths: Set<string>
// Contains month names from MONTH_OPTIONS array
// Valid size: 0 (before selection), 2-12 (after validation)
// Example: Set(['April', 'May', 'June'])
```

#### Existing State (no changes to structure, usage extended)

```typescript
month: string        // Used only in Single Month Mode
year: number         // Shared across both modes
amount: string       // Shared across both modes
status: 'pending' | 'paid'  // Shared across both modes
paymentDate: Date | null    // Shared across both modes
submitting: boolean  // Extended to show progress in Multi Mode
```

### UI Components

#### Mode Toggle Control

**Location**: Between dialog header and month selection fields

**Implementation**: Checkbox input with label

```jsx
<label className="flex items-center gap-2 text-sm text-slate-700">
  <input
    type="checkbox"
    checked={isMultiMonth}
    onChange={(e) => {
      setIsMultiMonth(e.target.checked)
      if (e.target.checked) {
        // Switching to Multi Mode: clear selectedMonths
        setSelectedMonths(new Set())
      }
      // Switching to Single Mode: month state already exists
    }}
  />
  Create fees for multiple months
</label>
```

**Behavior**:
- When checked: activates Multi-Month Mode, displays checkbox grid
- When unchecked: activates Single Month Mode, displays dropdown
- Toggling clears selections in the new mode to prevent stale data

#### Single Month Dropdown (existing, conditional rendering)

**Display Condition**: `!isMultiMonth`

**Implementation**: No changes to existing dropdown

```jsx
{!isMultiMonth && (
  <select
    id="fee-month"
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    // ... existing props
  >
    {MONTH_OPTIONS.map((m) => (...))}
  </select>
)}
```

#### Multi-Month Checkbox Grid (new component)

**Display Condition**: `isMultiMonth`

**Implementation**: Grid of checkboxes for each month

```jsx
{isMultiMonth && (
  <div>
    <span className="mb-2 block text-sm font-medium text-slate-700">
      Select months (2-12)
    </span>
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {MONTH_OPTIONS.map((m) => (
        <label
          key={m}
          className="flex items-center gap-1.5 text-sm text-slate-700"
        >
          <input
            type="checkbox"
            checked={selectedMonths.has(m)}
            onChange={(e) => handleMonthToggle(m, e.target.checked)}
            disabled={
              !selectedMonths.has(m) && selectedMonths.size >= 12
            }
          />
          {m.slice(0, 3)}
        </label>
      ))}
    </div>
    {selectedMonths.size > 0 && selectedMonths.size < 2 && (
      <p className="mt-1 text-sm text-amber-600">
        Select at least 2 months
      </p>
    )}
    {selectedMonths.size >= 12 && (
      <p className="mt-1 text-sm text-slate-600">
        Maximum 12 months selected
      </p>
    )}
  </div>
)}
```

**Month Toggle Handler**:

```typescript
function handleMonthToggle(month: string, checked: boolean): void {
  setSelectedMonths((prev) => {
    const next = new Set(prev)
    if (checked) {
      if (next.size < 12) {
        next.add(month)
      }
    } else {
      next.delete(month)
    }
    return next
  })
}
```

**Validation Display**:
- Shows "Select at least 2 months" when 0 < size < 2
- Shows "Maximum 12 months selected" when size >= 12
- Disables unchecked checkboxes when size >= 12

#### Submit Button Label

**Single Month Mode**: "Save fee record" (existing)

**Multi-Month Mode**:
- Before submission: "Create N fee records" (where N = selectedMonths.size)
- During submission: "Saving 1 of N...", "Saving 2 of N...", etc.

```jsx
<button type="submit" disabled={submitting}>
  {submitting
    ? isMultiMonth
      ? `Saving ${processingIndex + 1} of ${selectedMonths.size}...`
      : 'Saving…'
    : isMultiMonth
      ? `Create ${selectedMonths.size} fee record${selectedMonths.size > 1 ? 's' : ''}`
      : 'Save fee record'}
</button>
```

**Note**: `processingIndex` is a new state variable tracking the current month being processed (0-indexed).

### Validation Logic

#### Pre-Submission Validation (new function)

```typescript
function validateInputs(): { valid: boolean; error?: string } {
  const num = Number(amount)
  if (!Number.isFinite(num) || num < 0) {
    return { valid: false, error: 'Enter a valid fee amount.' }
  }

  if (status === 'paid' && !paymentDate) {
    return { valid: false, error: 'Select a payment date for paid fees.' }
  }

  if (isMultiMonth) {
    if (selectedMonths.size === 0) {
      return { valid: false, error: 'Select at least one month.' }
    }
    if (selectedMonths.size === 1) {
      return { valid: false, error: 'Select at least 2 months for bulk creation, or use single month mode.' }
    }
    if (selectedMonths.size > 12) {
      return { valid: false, error: 'Select at most 12 months.' }
    }
  }

  return { valid: true }
}
```

**Validation Rules**:
- Amount: must be finite, non-negative number
- Payment date: required when status is 'paid'
- Multi-Month Mode: 2 ≤ selectedMonths.size ≤ 12

### Submission Logic

#### Entry Point (existing handleSubmit, extended)

```typescript
async function handleSubmit(event: React.FormEvent): Promise<void> {
  event.preventDefault()
  
  const validation = validateInputs()
  if (!validation.valid) {
    showToast(validation.error, 'error')
    return
  }

  if (isMultiMonth) {
    await handleMultiMonthSubmit()
  } else {
    await handleSingleMonthSubmit()
  }
}
```

#### Single Month Submit (existing logic, extracted for clarity)

```typescript
async function handleSingleMonthSubmit(): Promise<void> {
  setSubmitting(true)
  try {
    const result = await createFeeRecord({
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      month,
      year,
      amount: Number(amount),
      status,
      paymentDate: status === 'paid' ? paymentDate : null,
    })
    
    // Existing result handling (mergedDuplicates, revived, isUpdate)
    if (result?.mergedDuplicates > 0) {
      showToast(
        `Fee saved. ${result.mergedDuplicates} extra duplicate row(s) for this month were archived.`,
        'success',
      )
    } else if (result?.revived) {
      showToast('Fee record restored (previously archived for this month).', 'success')
    } else if (result?.isUpdate) {
      showToast('Fee record updated for this student, month, and year.', 'success')
    } else {
      showToast('Fee record saved.', 'success')
    }
    
    onCreated?.()
    onClose()
  } catch (err) {
    showToast(err?.message || 'Could not save fee.', 'error')
  } finally {
    setSubmitting(false)
  }
}
```

#### Multi-Month Submit (new bulk creation logic)

```typescript
async function handleMultiMonthSubmit(): Promise<void> {
  const monthsArray = Array.from(selectedMonths)
  const results = {
    successes: [],
    failures: [],
    mergedCount: 0,
    revivedCount: 0,
    updateCount: 0,
  }
  
  setSubmitting(true)
  
  for (let i = 0; i < monthsArray.length; i++) {
    const currentMonth = monthsArray[i]
    setProcessingIndex(i) // Update progress display
    
    try {
      const result = await createFeeRecord({
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        month: currentMonth,
        year,
        amount: Number(amount),
        status,
        paymentDate: status === 'paid' ? paymentDate : null,
      })
      
      results.successes.push(currentMonth)
      
      // Aggregate metadata for final message
      if (result?.mergedDuplicates > 0) {
        results.mergedCount += result.mergedDuplicates
      }
      if (result?.revived) {
        results.revivedCount += 1
      }
      if (result?.isUpdate) {
        results.updateCount += 1
      }
    } catch (err) {
      results.failures.push({ month: currentMonth, error: err?.message || 'Unknown error' })
    }
  }
  
  setSubmitting(false)
  
  // Display aggregated results
  const message = formatSuccessMessage(results)
  if (results.failures.length === 0) {
    showToast(message, 'success')
    onCreated?.()
    onClose()
  } else if (results.successes.length > 0) {
    // Partial success
    showToast(message, 'warning')
    onCreated?.() // Refresh data to show partial results
    // Do not close modal so user can see failures and retry
  } else {
    // Total failure
    showToast(message, 'error')
  }
}
```

**Design Rationale**:
- **Sequential processing**: Avoids Firestore rate limit issues and provides granular progress feedback
- **Partial failure tolerance**: Continues processing on error, tracks per-month results
- **Aggregated metadata**: Collects duplicate merges, revivals, updates across all months for comprehensive feedback
- **Modal behavior**: Closes on full success, remains open on partial/full failure to allow user review

#### Success Message Formatter (new function)

```typescript
function formatSuccessMessage(results: BulkCreationResults): string {
  const { successes, failures, mergedCount, revivedCount, updateCount } = results
  
  if (failures.length === 0) {
    // Full success
    const range = formatMonthRange(successes)
    let msg = `${successes.length} fee record${successes.length > 1 ? 's' : ''} created for ${range}`
    
    if (mergedCount > 0) {
      msg += `. ${mergedCount} duplicate row(s) were archived.`
    }
    if (revivedCount > 0) {
      msg += ` ${revivedCount} record(s) were restored from archive.`
    }
    if (updateCount > 0) {
      msg += ` ${updateCount} existing record(s) were updated.`
    }
    
    return msg
  } else if (successes.length > 0) {
    // Partial success
    const failedMonths = failures.map(f => f.month).join(', ')
    return `${successes.length} of ${successes.length + failures.length} fee records created. Failed months: ${failedMonths}`
  } else {
    // Total failure
    return `Failed to create fee records for all selected months. Check console for details.`
  }
}
```

#### Month Range Formatter (new function)

```typescript
function formatMonthRange(months: string[]): string {
  if (months.length === 0) return ''
  if (months.length === 1) return months[0]
  
  // Sort by calendar order
  const ordered = months.slice().sort((a, b) => {
    return MONTH_OPTIONS.indexOf(a) - MONTH_OPTIONS.indexOf(b)
  })
  
  // Check if consecutive
  const firstIdx = MONTH_OPTIONS.indexOf(ordered[0])
  const lastIdx = MONTH_OPTIONS.indexOf(ordered[ordered.length - 1])
  const isConsecutive = lastIdx - firstIdx === ordered.length - 1
  
  if (isConsecutive) {
    return `${ordered[0]}–${ordered[ordered.length - 1]} ${year}`
  } else {
    // Non-consecutive: list first, last, and count
    return `${ordered.length} months (${ordered[0]}, ..., ${ordered[ordered.length - 1]}) ${year}`
  }
}
```

**Examples**:
- `['April', 'May', 'June']` → "April–June 2026"
- `['January']` → "January"
- `['January', 'March', 'June']` → "3 months (January, ..., June) 2026"

## Data Models

### BulkCreationResults Interface (new)

```typescript
interface BulkCreationResults {
  successes: string[]         // Array of successfully created month names
  failures: FailureRecord[]   // Array of failed month records
  mergedCount: number         // Total duplicate rows archived
  revivedCount: number        // Total records restored from soft delete
  updateCount: number         // Total existing records updated
}

interface FailureRecord {
  month: string               // Month name that failed
  error: string               // Error message from createFeeRecord
}
```

### State Extensions

```typescript
// New state variables
const [isMultiMonth, setIsMultiMonth] = useState(false)
const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set())
const [processingIndex, setProcessingIndex] = useState(0)

// Existing state (no structural changes)
const [month, setMonth] = useState(MONTH_OPTIONS[now.getMonth()])
const [year, setYear] = useState(now.getFullYear())
const [amount, setAmount] = useState('')
const [status, setStatus] = useState('pending')
const [paymentDate, setPaymentDate] = useState(null)
const [submitting, setSubmitting] = useState(false)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before writing properties, I'll analyze the acceptance criteria using the prework tool:


### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:

**Redundant Properties:**
- Properties 4.4, 4.5, 4.6 (shared fee details) are logically covered by property 6.2 (argument structure verification)
- Properties 6.3, 6.4, 6.5 are explicit duplicates of 4.4, 4.5, 4.6

**Consolidation:**
- Property 6.2 will be expanded to comprehensively verify that all createFeeRecord calls receive identical fee details (amount, status, paymentDate) with only the month parameter varying

**Unique Properties Remaining:**
- Single-mode regression (2.4): Ensures existing behavior unchanged
- Month selection toggle (3.5): Deselection works correctly
- Bulk creation completeness (6.1): N months = N calls
- Comprehensive argument passing (6.2): Verifies all fields passed correctly
- Partial failure tolerance (7.1): Processing continues on error
- Result tracking accuracy (7.2): Success/failure tracking correct
- Partial failure messaging (7.4): Summary includes both counts
- Success count display (8.1): Message includes record count
- Month range formatting (8.2): Range displayed correctly
- Metadata aggregation (8.3): Merge/revival info included
- Progress display (8.4): Loading state shows progress
- Validation consistency (10.4): Same rules across modes

### Property 1: Single-Mode Behavior Preservation

*For any* valid single-month input (month, year, amount, status, paymentDate), when submitted in Single Month Mode, the system SHALL call createFeeRecord exactly once with the provided parameters and display behavior identical to the original implementation.

**Validates: Requirements 2.3, 2.4**

### Property 2: Month Selection Toggle Idempotence

*For any* selected month in Multi-Month Mode, deselecting that month SHALL remove it from the selected set, and re-selecting it SHALL add it back to the selected set, regardless of other selections.

**Validates: Requirements 3.5**

### Property 3: Bulk Creation Call Completeness

*For any* valid number of selected months N (where 2 ≤ N ≤ 12) in Multi-Month Mode, when the form is submitted, the system SHALL call createFeeRecord exactly N times.

**Validates: Requirements 6.1**

### Property 4: Comprehensive Argument Consistency

*For any* set of selected months M = {m₁, m₂, ..., mₙ} and shared fee details (amount A, status S, paymentDate D) in Multi-Month Mode, each of the N calls to createFeeRecord SHALL receive:
- The same studentId, studentName, class, year, amount A, status S, paymentDate D
- A unique month parameter mᵢ from the set M

**Validates: Requirements 4.4, 4.5, 4.6, 6.2**

### Property 5: Partial Failure Processing Continuation

*For any* bulk creation operation where createFeeRecord fails at position i (1 ≤ i ≤ N), the system SHALL continue processing all remaining months {i+1, i+2, ..., N} and call createFeeRecord for each.

**Validates: Requirements 7.1**

### Property 6: Result Tracking Accuracy

*For any* bulk creation operation with N months where k months succeed and (N-k) months fail, the results object SHALL contain:
- Exactly k month names in the successes array
- Exactly (N-k) entries in the failures array
- No duplicates across successes and failures
- Complete coverage: successes ∪ failures = all selected months

**Validates: Requirements 7.2**

### Property 7: Partial Failure Message Completeness

*For any* bulk creation operation with partial failure (0 < successes < N), the displayed summary message SHALL include:
- The count of succeeded months
- The count of failed months (or list of failed month names)

**Validates: Requirements 7.4**

### Property 8: Success Message Count Accuracy

*For any* bulk creation operation with N successful months, the success message SHALL contain the numeric count N.

**Validates: Requirements 8.1**

### Property 9: Consecutive Month Range Formatting

*For any* set of consecutive months [m₁, m₂, ..., mₙ] in calendar order, the success message SHALL display the range as "FirstMonth–LastMonth Year" (e.g., "April–June 2026").

**Validates: Requirements 8.2**

### Property 10: Metadata Aggregation Completeness

*For any* bulk creation operation where createFeeRecord returns metadata (mergedDuplicates, revived, isUpdate) for k months, the aggregated success message SHALL include:
- Total count of merged duplicates across all months
- Total count of revived records across all months
- Total count of updated records across all months

**Validates: Requirements 8.3**

### Property 11: Progress Display Accuracy

*For any* bulk creation operation processing month i out of N months (1 ≤ i ≤ N), the loading state SHALL display "Saving i of N..." during that month's creation.

**Validates: Requirements 8.4**

### Property 12: Validation Consistency Across Modes

*For any* invalid amount value (non-numeric or negative) or invalid paid status without payment date, the validation error SHALL be identical in both Single Month Mode and Multi-Month Mode.

**Validates: Requirements 10.4**

## Error Handling

### Validation Errors (Pre-Submission)

**Invalid Amount:**
- Trigger: Non-numeric or negative amount input
- Response: Display error toast "Enter a valid fee amount.", prevent submission
- Applies to: Both Single and Multi-Month Modes

**Missing Payment Date:**
- Trigger: Status set to 'paid' without payment date
- Response: Display error toast "Select a payment date for paid fees.", prevent submission
- Applies to: Both Single and Multi-Month Modes

**Insufficient Month Selection:**
- Trigger: Multi-Month Mode with 0 or 1 selected months
- Response: Display error toast with minimum requirement message, prevent submission
- Applies to: Multi-Month Mode only

**Excessive Month Selection:**
- Trigger: Attempting to select more than 12 months
- Response: Disable additional checkboxes, display info message "Maximum 12 months selected"
- Applies to: Multi-Month Mode only

### Runtime Errors (During Submission)

**Single createFeeRecord Failure (Single Mode):**
- Trigger: createFeeRecord throws error or rejects
- Response: Display error toast with error message, stop submission, leave modal open
- User Action: User can modify inputs and retry

**Partial createFeeRecord Failure (Multi-Month Mode):**
- Trigger: One or more createFeeRecord calls fail during bulk creation
- Response: 
  - Continue processing remaining months
  - Track failed months and error messages
  - Display warning toast with summary (e.g., "5 of 8 fee records created. Failed months: September, October, November")
  - Call onCreated() to refresh parent data (show partial results)
  - Leave modal open so user can review failures
- User Action: User can review failures, potentially adjust inputs, or close modal

**Total createFeeRecord Failure (Multi-Month Mode):**
- Trigger: All N createFeeRecord calls fail
- Response: Display error toast "Failed to create fee records for all selected months. Check console for details."
- User Action: User should check console logs, verify Firestore permissions, retry or close modal

**Firestore Permission Errors:**
- Trigger: assertAdminCanWrite() throws in createFeeRecord
- Response: Display error toast with permission message
- User Action: User should verify admin authentication status

**Network Errors:**
- Trigger: Firestore network timeout or connection failure
- Response: Display error toast with network error message
- User Action: User should check network connection and retry

### Error Recovery Strategies

**Idempotent Retries:**
- createFeeRecord is idempotent (upserts by student+month+year)
- Users can retry failed months without duplicating successful months
- Existing duplicate detection prevents data corruption on retry

**Granular Failure Reporting:**
- Console.error logs include full error details for each failed month
- Aggregated message provides high-level summary for user
- Modal remains open on partial failure to allow user review

**State Preservation on Error:**
- Form inputs (amount, status, date, selected months) remain unchanged after error
- Users can modify inputs without re-entering from scratch
- Successful months in partial failure are tracked and displayed

## Testing Strategy

This feature requires a dual testing approach: **example-based unit tests** for specific UI scenarios and edge cases, and **property-based tests** for universal behavior across varying inputs.

### Unit Tests (Example-Based)

Unit tests verify specific scenarios, UI rendering, and edge cases using a JavaScript testing framework (Jest + React Testing Library).

**Test File**: `AddFeeModal.test.jsx`

**Test Categories:**

1. **Mode Toggle and UI Rendering**
   - Modal defaults to Single Month Mode on open
   - Toggle control switches between Single and Multi-Month Mode
   - Single mode displays month dropdown
   - Multi-mode displays checkbox grid
   - Mode toggle clears selections when switching

2. **Single Month Mode (Regression Tests)**
   - Month dropdown displays all 12 months
   - Selecting a month updates state
   - Submit calls createFeeRecord once with selected month
   - Existing success toast displays on successful creation
   - Modal closes on successful submission

3. **Multi-Month Mode UI Interactions**
   - Checkbox grid displays all 12 months
   - Selecting/deselecting months updates selectedMonths set
   - Checkboxes disable when 12 months selected
   - Validation message displays when < 2 months selected
   - Info message displays when 12 months selected

4. **Shared Fee Details**
   - Amount input field exists in both modes
   - Status radio buttons exist in both modes
   - Payment date picker appears when status is 'paid'
   - Payment date picker hidden when status is 'pending'

5. **Validation Error Handling**
   - Submit with negative amount displays error
   - Submit with non-numeric amount displays error
   - Submit with paid status and no date displays error
   - Submit in multi-mode with 0 months displays error
   - Submit in multi-mode with 1 month displays error
   - Same amount validation errors in both modes

6. **Bulk Creation Success Flow**
   - Submit with 3 selected months calls createFeeRecord 3 times
   - Each call receives unique month parameter
   - All calls receive same amount, status, paymentDate
   - Success toast displays month range (e.g., "3 fee records created for April–June 2026")
   - onCreated callback called after all months processed
   - Modal closes on full success

7. **Partial Failure Scenarios**
   - Second month fails: first succeeds, third proceeds
   - Warning toast displays success and failure counts
   - Failed month names listed in toast
   - onCreated callback still called (to show partial results)
   - Modal remains open on partial failure

8. **Progress Display**
   - Submit button label shows "Create N fee records" before submission
   - Loading state shows "Saving 1 of N..." during first month
   - Loading state updates to "Saving 2 of N..." during second month
   - Loading state sequential for all N months

9. **Form Reset on Close**
   - After successful submission and reopen, modal resets to Single Mode
   - Default month and year set correctly on reopen
   - Amount field cleared on reopen

### Property-Based Tests

Property-based tests verify universal correctness properties across many generated inputs using a JavaScript PBT library (fast-check).

**Test File**: `AddFeeModal.properties.test.jsx`

**Library**: fast-check (JavaScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Property Test Implementations:**

#### Property 1: Single-Mode Behavior Preservation

```javascript
// Feature: bulk-fee-creation, Property 1: For any valid single-month input, Single Mode behavior unchanged
fc.assert(
  fc.property(
    fc.constantFrom(...MONTH_OPTIONS), // Random month
    fc.integer({ min: 2024, max: 2030 }), // Random year
    fc.integer({ min: 100, max: 50000 }), // Random valid amount
    fc.constantFrom('pending', 'paid'), // Random status
    (month, year, amount, status) => {
      const { getByLabelText, getByText } = render(
        <AddFeeModal student={mockStudent} onClose={mockClose} onCreated={mockCreated} />
      )
      
      // Set inputs
      fireEvent.change(getByLabelText('Month'), { target: { value: month } })
      fireEvent.change(getByLabelText('Year'), { target: { value: year } })
      fireEvent.change(getByLabelText('Fee amount (INR)'), { target: { value: amount } })
      // Set status...
      
      // Submit
      fireEvent.click(getByText('Save fee record'))
      
      // Verify createFeeRecord called exactly once
      expect(mockCreateFeeRecord).toHaveBeenCalledTimes(1)
      expect(mockCreateFeeRecord).toHaveBeenCalledWith(
        expect.objectContaining({ month, year, amount, status })
      )
    }
  ),
  { numRuns: 100 }
)
```

#### Property 3: Bulk Creation Call Completeness

```javascript
// Feature: bulk-fee-creation, Property 3: For any N selected months (2-12), createFeeRecord called N times
fc.assert(
  fc.property(
    fc.array(fc.constantFrom(...MONTH_OPTIONS), { minLength: 2, maxLength: 12 }).map(arr => [...new Set(arr)]), // Random unique months
    (selectedMonths) => {
      const { getByLabelText } = render(
        <AddFeeModal student={mockStudent} onClose={mockClose} onCreated={mockCreated} />
      )
      
      // Toggle to multi-mode
      fireEvent.click(getByLabelText('Create fees for multiple months'))
      
      // Select months
      selectedMonths.forEach(month => {
        fireEvent.click(getByLabelText(month.slice(0, 3)))
      })
      
      // Set shared fee details and submit
      // ...
      
      // Verify N calls
      expect(mockCreateFeeRecord).toHaveBeenCalledTimes(selectedMonths.length)
    }
  ),
  { numRuns: 100 }
)
```

#### Property 4: Comprehensive Argument Consistency

```javascript
// Feature: bulk-fee-creation, Property 4: For any months and fee details, all calls receive same fee details with unique months
fc.assert(
  fc.property(
    fc.array(fc.constantFrom(...MONTH_OPTIONS), { minLength: 2, maxLength: 12 }).map(arr => [...new Set(arr)]),
    fc.integer({ min: 100, max: 50000 }),
    fc.constantFrom('pending', 'paid'),
    (selectedMonths, amount, status) => {
      // Setup and submit...
      
      // Verify each call has same amount, status, but unique month
      const calls = mockCreateFeeRecord.mock.calls
      const amounts = calls.map(c => c[0].amount)
      const statuses = calls.map(c => c[0].status)
      const months = calls.map(c => c[0].month)
      
      // All amounts identical
      expect(new Set(amounts).size).toBe(1)
      expect(amounts[0]).toBe(amount)
      
      // All statuses identical
      expect(new Set(statuses).size).toBe(1)
      
      // All months unique and from selectedMonths
      expect(new Set(months).size).toBe(selectedMonths.length)
      expect(months.sort()).toEqual(selectedMonths.sort())
    }
  ),
  { numRuns: 100 }
)
```

#### Property 5: Partial Failure Processing Continuation

```javascript
// Feature: bulk-fee-creation, Property 5: For any failure position i, all months > i are still processed
fc.assert(
  fc.property(
    fc.array(fc.constantFrom(...MONTH_OPTIONS), { minLength: 3, maxLength: 12 }).map(arr => [...new Set(arr)]),
    fc.integer({ min: 0, max: 10 }), // Random failure position
    (selectedMonths, failureIndexRaw) => {
      const failureIndex = failureIndexRaw % selectedMonths.length // Ensure valid index
      
      // Mock createFeeRecord to fail at failureIndex
      mockCreateFeeRecord.mockImplementation((params) => {
        const index = selectedMonths.indexOf(params.month)
        if (index === failureIndex) {
          throw new Error('Simulated failure')
        }
        return Promise.resolve({ isUpdate: false })
      })
      
      // Setup and submit...
      
      // Verify all N calls made (including failed one)
      expect(mockCreateFeeRecord).toHaveBeenCalledTimes(selectedMonths.length)
      
      // Verify months after failure were processed
      const calls = mockCreateFeeRecord.mock.calls
      const processedMonths = calls.map(c => c[0].month)
      expect(processedMonths).toEqual(selectedMonths)
    }
  ),
  { numRuns: 100 }
)
```

#### Property 6: Result Tracking Accuracy

```javascript
// Feature: bulk-fee-creation, Property 6: For any k successes and (N-k) failures, results object accurate
fc.assert(
  fc.property(
    fc.array(fc.constantFrom(...MONTH_OPTIONS), { minLength: 3, maxLength: 12 }).map(arr => [...new Set(arr)]),
    fc.array(fc.boolean(), { minLength: 3, maxLength: 12 }), // Random success/failure pattern
    (selectedMonths, successPattern) => {
      // Ensure pattern matches length
      const pattern = successPattern.slice(0, selectedMonths.length)
      
      // Mock createFeeRecord with pattern
      mockCreateFeeRecord.mockImplementation((params) => {
        const index = selectedMonths.indexOf(params.month)
        if (pattern[index]) {
          return Promise.resolve({ isUpdate: false })
        } else {
          throw new Error('Simulated failure')
        }
      })
      
      // Submit and check toast message
      // ...
      
      // Verify toast displays correct counts
      const successCount = pattern.filter(Boolean).length
      const failureCount = pattern.filter(p => !p).length
      
      if (successCount > 0 && failureCount > 0) {
        // Partial failure message should include both counts
        expect(mockShowToast).toHaveBeenCalledWith(
          expect.stringContaining(`${successCount} of ${selectedMonths.length}`),
          'warning'
        )
      }
    }
  ),
  { numRuns: 100 }
)
```

#### Property 9: Consecutive Month Range Formatting

```javascript
// Feature: bulk-fee-creation, Property 9: For any consecutive months, range formatted as "First–Last Year"
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 10 }), // Start index
    fc.integer({ min: 2, max: 6 }), // Length
    (startIdx, length) => {
      // Generate consecutive months
      const start = startIdx % (12 - length + 1)
      const consecutiveMonths = MONTH_OPTIONS.slice(start, start + length)
      
      // Mock all successful
      mockCreateFeeRecord.mockResolvedValue({ isUpdate: false })
      
      // Setup, select consecutive months, submit
      // ...
      
      // Verify toast message contains range
      expect(mockShowToast).toHaveBeenCalledWith(
        expect.stringContaining(`${consecutiveMonths[0]}–${consecutiveMonths[consecutiveMonths.length - 1]}`),
        'success'
      )
    }
  ),
  { numRuns: 100 }
)
```

#### Property 12: Validation Consistency Across Modes

```javascript
// Feature: bulk-fee-creation, Property 12: For any invalid amount, same error in both modes
fc.assert(
  fc.property(
    fc.oneof(
      fc.constant(-100), // Negative
      fc.constant(-1),
      fc.constant(NaN),
      fc.constant('abc'), // Non-numeric
    ),
    fc.boolean(), // Random mode (true = multi, false = single)
    (invalidAmount, isMultiMode) => {
      const { getByLabelText, getByText } = render(
        <AddFeeModal student={mockStudent} onClose={mockClose} onCreated={mockCreated} />
      )
      
      if (isMultiMode) {
        fireEvent.click(getByLabelText('Create fees for multiple months'))
        // Select months...
      }
      
      // Enter invalid amount
      fireEvent.change(getByLabelText('Fee amount (INR)'), { target: { value: invalidAmount } })
      
      // Submit
      fireEvent.click(getByText(/Save|Create/))
      
      // Verify same error toast in both modes
      expect(mockShowToast).toHaveBeenCalledWith(
        'Enter a valid fee amount.',
        'error'
      )
    }
  ),
  { numRuns: 100 }
)
```

### Test Coverage Goals

- **Unit Tests**: 90%+ code coverage for AddFeeModal component
- **Property Tests**: 100 iterations per property (12 properties × 100 = 1200 total test cases)
- **Integration Tests**: Manual testing of Firestore integration with duplicate detection and merging

### Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component rendering and interaction testing
- **fast-check**: Property-based testing library for JavaScript
- **Mock Service Worker (MSW)**: Firestore mocking for unit tests (optional)

## Implementation Notes

### State Initialization

```javascript
// Add to existing state declarations
const [isMultiMonth, setIsMultiMonth] = useState(false)
const [selectedMonths, setSelectedMonths] = useState(new Set())
const [processingIndex, setProcessingIndex] = useState(0)
```

### Month Toggle Handler

```javascript
function handleMonthToggle(month, checked) {
  setSelectedMonths((prev) => {
    const next = new Set(prev)
    if (checked) {
      if (next.size < 12) {
        next.add(month)
      }
    } else {
      next.delete(month)
    }
    return next
  })
}
```

### Mode Toggle Handler

```javascript
function handleModeToggle(checked) {
  setIsMultiMonth(checked)
  if (checked) {
    // Switching to Multi Mode: clear selectedMonths
    setSelectedMonths(new Set())
  }
  // When switching to Single Mode, month state already exists
}
```

### Sequential Bulk Creation

The implementation uses a for-loop (not Promise.all) to call createFeeRecord sequentially:

**Rationale:**
- Provides granular progress updates (setProcessingIndex per month)
- Respects Firestore rate limits (avoids overwhelming Firestore with parallel writes)
- Enables early failure detection with continued processing
- Simpler error handling logic (no need to track which promises failed)

**Trade-off**: Slower total execution time compared to parallel processing, but more reliable and user-friendly for operations involving 2-12 months (typically 2-5 seconds total).

### Error Logging

```javascript
// In handleMultiMonthSubmit, log detailed errors
catch (err) {
  console.error(`Failed to create fee record for ${currentMonth}:`, err)
  results.failures.push({ month: currentMonth, error: err?.message || 'Unknown error' })
}
```

Detailed errors logged to console for debugging, while aggregated user-friendly messages displayed in toasts.

### Form Reset Logic

The modal already resets state when unmounted (React default behavior). Explicitly resetting isMultiMonth and selectedMonths on close ensures clean state on reopen:

```javascript
function handleClose() {
  setIsMultiMonth(false)
  setSelectedMonths(new Set())
  setProcessingIndex(0)
  onClose()
}
```

### Performance Considerations

- **Set for selectedMonths**: O(1) add/delete/has operations for efficient month toggling
- **Sequential createFeeRecord**: Avoids Firestore rate limit errors, acceptable latency for 2-12 months
- **Debounced checkbox state**: No debouncing needed; Set operations are fast enough
- **Progress display**: Minimal re-renders (only submitting and processingIndex change during submission)

## Security Considerations

- **Authorization**: createFeeRecord already enforces admin write permissions via assertAdminCanWrite()
- **Input Validation**: Amount, status, and payment date validated before any Firestore calls
- **Idempotent Operations**: Retry-safe due to createFeeRecord's upsert behavior
- **No Cross-User Data Leakage**: Student ID passed as prop, not user-controlled input

## Accessibility Considerations

- **Mode Toggle**: Checkbox input with visible label "Create fees for multiple months"
- **Month Checkboxes**: Each checkbox labeled with month name (abbreviated for space)
- **Validation Messages**: Error messages announced via toast system (aria-live regions)
- **Progress Feedback**: Loading state text describes current operation
- **Keyboard Navigation**: All checkboxes and buttons keyboard accessible
- **Screen Reader**: Month range in success message provides clear outcome summary

## Migration and Rollback

**No Database Migration Required**: This feature only modifies frontend UI and submission logic. The Firestore schema (fees collection) remains unchanged.

**Rollback Strategy**: Revert AddFeeModal.jsx to previous version. No data cleanup needed since createFeeRecord behavior is unchanged.

**Feature Flag**: Not required for this component-level change, but could be added if desired:

```javascript
const ENABLE_MULTI_MONTH_MODE = true // Feature flag

{ENABLE_MULTI_MONTH_MODE && (
  <label>
    <input type="checkbox" checked={isMultiMonth} onChange={...} />
    Create fees for multiple months
  </label>
)}
```

## Open Questions

1. **Month Sorting in Non-Consecutive Selections**: Should the success message list all selected months or just show count? Current design shows count with first/last month for non-consecutive selections (e.g., "5 months (January, ..., August) 2026").

2. **Undo Functionality**: Should the system provide an "Undo bulk creation" feature? Current design requires manual deletion of each created fee record. This could be a future enhancement.

3. **Batch API Optimization**: Should we introduce a backend batched createFeeRecords API to reduce round-trips? Current design prioritizes simplicity (reusing existing createFeeRecord) over optimization. If latency becomes an issue with 12-month operations, consider batching.

4. **Year Boundary Handling**: What if a user wants to create fees for December 2025 and January 2026? Current design restricts to single year. Should we support cross-year selection? Requirements state validation prevents cross-year, so this is deferred to future enhancement.

## References

- [Requirements Document](/Users/jarvis/parma-academy/.kiro/specs/bulk-fee-creation/requirements.md)
- [AddFeeModal Component](/Users/jarvis/parma-academy/parma-academy/src/innercomponents/dashboard/AddFeeModal.jsx)
- [feeRepository](/Users/jarvis/parma-academy/parma-academy/src/firebase/feeRepository.js)
- [fast-check Documentation](https://github.com/dubzzz/fast-check)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
