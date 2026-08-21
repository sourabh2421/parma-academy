# Design Document: Print Receipt Feature

## Overview

The Print Receipt feature adds professional receipt printing capability to the existing student fee management system. This feature enables administrators to generate formatted, printable receipts for paid fee records with two identical copies per page (Parent Copy and School Copy) that can be cut and distributed.

The implementation follows a non-invasive approach by creating a new `ReceiptPrint.jsx` component that integrates into the existing `StudentDetailModal.jsx` without modifying the underlying data repositories. The component uses CSS media queries to control print-specific styling and leverages the browser's native print dialog via `window.print()`.

### Key Design Principles

1. **Minimal Integration Surface**: Only modifies `StudentDetailModal.jsx` to add the print button and receipt component
2. **No Data Layer Changes**: Reuses already-loaded student and fee data passed via props
3. **Print-First Styling**: Uses `@media print` queries to ensure clean, professional printouts
4. **Accessibility Compliance**: Includes keyboard navigation support and semantic HTML
5. **Separation of Concerns**: Receipt layout logic isolated in dedicated component

## Architecture

### Component Structure

```
StudentDetailModal.jsx (existing, modified)
  ├── [existing UI elements]
  ├── Print Button (new - conditional render)
  └── ReceiptPrint.jsx (new component)
       ├── Receipt Copy #1 (Parent Copy)
       │   ├── Header (school name, address)
       │   ├── Receipt Number
       │   ├── Student Details
       │   ├── Fee Details
       │   └── Footer
       ├── Separator (dashed line + "Cut along the line")
       └── Receipt Copy #2 (School Copy)
           └── [identical structure to Copy #1]
```

### File Organization

```
src/
└── innercomponents/
    └── dashboard/
        ├── StudentDetailModal.jsx (modified)
        ├── ReceiptPrint.jsx (new)
        └── AddFeeModal.jsx (unchanged)
```

### Data Flow

```
User clicks "Print Receipt" button
    ↓
StudentDetailModal passes {student, fee} props to ReceiptPrint
    ↓
ReceiptPrint renders receipt content (initially hidden on screen)
    ↓
ReceiptPrint sets local state to trigger visibility
    ↓
window.print() invoked
    ↓
Browser print dialog appears
    ↓
@media print CSS shows only receipt content
    ↓
User prints or cancels
    ↓
Receipt content hidden again on screen
```

## Components and Interfaces

### ReceiptPrint Component

**File**: `src/innercomponents/dashboard/ReceiptPrint.jsx`

**Purpose**: Renders a printable fee receipt with two identical copies formatted for A4 paper.

#### Props Interface

```javascript
interface ReceiptPrintProps {
  student: {
    id: string;           // Student identifier (e.g., "STU001")
    name: string;         // Full student name
    class: string;        // Class/grade (e.g., "Class 5")
    parentName: string;   // Parent or guardian name
  };
  fee: {
    docId: string;        // Firestore document ID (not displayed)
    studentId: string;    // References student.id
    month: string;        // Month name (e.g., "January")
    year: number;         // Four-digit year (e.g., 2025)
    amount: number;       // Fee amount in INR (e.g., 5000)
    status: string;       // Payment status ("paid" or "pending")
    paymentDate: Date | string; // Payment date (ISO string or Date object)
  };
}
```

#### Component Signature

```javascript
function ReceiptPrint({ student, fee }) {
  // Local state for controlling print visibility
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Generate receipt number
  const receiptNumber = generateReceiptNumber(fee.year, fee.month, student.id);
  
  // Format payment date
  const formattedDate = formatPaymentDate(fee.paymentDate);
  
  // Format amount
  const formattedAmount = formatAmount(fee.amount);
  
  // Trigger print
  const handlePrint = () => {
    setIsPrinting(true);
    // Use setTimeout to allow state update and render
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };
  
  return (
    <div className={`receipt-container ${isPrinting ? 'printing' : ''}`}>
      {/* Two identical receipt copies */}
    </div>
  );
}
```

#### Internal Helper Functions

**1. generateReceiptNumber(year, month, studentId)**

```javascript
function generateReceiptNumber(year, month, studentId) {
  // Map month names to two-digit numbers
  const monthMap = {
    'January': '01', 'February': '02', 'March': '03',
    'April': '04', 'May': '05', 'June': '06',
    'July': '07', 'August': '08', 'September': '09',
    'October': '10', 'November': '11', 'December': '12'
  };
  
  const monthNum = monthMap[month] || '00';
  const truncatedId = studentId.length > 20 ? studentId.slice(0, 20) : studentId;
  
  return `PA-${year}${monthNum}-${truncatedId}`;
}
```

**2. formatPaymentDate(paymentDate)**

```javascript
function formatPaymentDate(paymentDate) {
  if (!paymentDate) return 'N/A';
  
  const date = paymentDate instanceof Date 
    ? paymentDate 
    : new Date(paymentDate);
  
  if (isNaN(date.getTime())) return 'N/A';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
```

**3. formatAmount(amount)**

```javascript
function formatAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'INR 0.00';
  
  return `INR ${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
```

### StudentDetailModal Modifications

**Changes Required**:

1. Import the new `ReceiptPrint` component
2. Add local state to track which fee is being printed
3. Modify the fee table actions column to conditionally render Print button
4. Conditionally render `ReceiptPrint` component when printing

#### Import Statement

```javascript
import ReceiptPrint from './ReceiptPrint.jsx'
```

#### State Addition

```javascript
const [printingFee, setPrintingFee] = useState(null)
```

#### Print Button Render Logic

```javascript
// Inside the fee table row mapping
<td className="px-3 py-2 text-right">
  <div className="flex justify-end gap-2">
    {fee.status === 'paid' && (
      <button
        type="button"
        onClick={() => setPrintingFee(fee)}
        className="rounded border border-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 focus:outline-2 focus:outline-emerald-500"
      >
        Print Receipt
      </button>
    )}
    <button
      type="button"
      onClick={() => handleArchiveFee(fee)}
      className="rounded border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50"
    >
      Archive
    </button>
  </div>
</td>
```

#### Receipt Component Render

```javascript
// At the end of the modal, before closing fragments
{printingFee && (
  <ReceiptPrint
    student={student}
    fee={printingFee}
    onClose={() => setPrintingFee(null)}
  />
)}
```

## Data Models

### Student Data Model (Existing)

```javascript
{
  id: string;           // Unique student identifier
  name: string;         // Full name
  class: string;        // Current class/grade
  parentName: string;   // Parent or guardian name
  // ... other fields not used by receipt
}
```

### Fee Record Data Model (Existing)

```javascript
{
  docId: string;        // Firestore document identifier
  studentId: string;    // References Student.id
  studentName: string;  // Denormalized student name
  class: string;        // Denormalized class
  month: string;        // Payment month name
  year: number;         // Payment year
  amount: number;       // Fee amount in INR
  status: string;       // "paid" | "pending"
  paymentDate: Date | string | null; // ISO string or Date object
}
```

### Receipt Number Format

```
PA-{YYYY}{MM}-{studentId}

Components:
- PA: School prefix (Parma Academy)
- YYYY: Four-digit year
- MM: Two-digit zero-padded month (01-12)
- studentId: Student identifier (max 20 chars)

Examples:
- PA-202501-STU001 (January 2025)
- PA-202512-STU042 (December 2025)
```

### Month Name to Number Mapping

```javascript
const MONTH_TO_NUMBER = {
  'January': '01',
  'February': '02',
  'March': '03',
  'April': '04',
  'May': '05',
  'June': '06',
  'July': '07',
  'August': '08',
  'September': '09',
  'October': '10',
  'November': '11',
  'December': '12'
};
```

## Error Handling

### Missing Required Props

**Scenario**: `student` or `fee` prop is null/undefined

**Strategy**: Defensive rendering with early return

```javascript
function ReceiptPrint({ student, fee }) {
  if (!student || !fee) {
    console.error('ReceiptPrint: Missing required props', { student, fee });
    return null;
  }
  // ... rest of component
}
```

### Missing Required Fields

**Scenario**: Individual fields within props are missing

**Strategy**: Display "N/A" for missing fields

```javascript
const safeValue = (value, fallback = 'N/A') => {
  return value ?? fallback;
};

// Usage
<dd>{safeValue(student.name)}</dd>
<dd>{safeValue(student.parentName)}</dd>
```

### Invalid Payment Date

**Scenario**: `paymentDate` is malformed or unparseable

**Strategy**: Graceful fallback in `formatPaymentDate`

```javascript
function formatPaymentDate(paymentDate) {
  if (!paymentDate) return 'N/A';
  
  const date = paymentDate instanceof Date 
    ? paymentDate 
    : new Date(paymentDate);
  
  if (isNaN(date.getTime())) {
    console.warn('Invalid payment date:', paymentDate);
    return 'N/A';
  }
  
  // ... formatting logic
}
```

### Invalid Amount

**Scenario**: `amount` is not a number or is negative

**Strategy**: Fallback to "INR 0.00" with console warning

```javascript
function formatAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    console.warn('Invalid amount:', amount);
    return 'INR 0.00';
  }
  
  return `INR ${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
```

### Invalid Month Name

**Scenario**: `month` is not a recognized month name

**Strategy**: Fallback to '00' in receipt number with warning

```javascript
function generateReceiptNumber(year, month, studentId) {
  const monthMap = { /* ... */ };
  
  const monthNum = monthMap[month];
  if (!monthNum) {
    console.warn(`Unrecognized month name: ${month}`);
  }
  
  return `PA-${year}${monthNum || '00'}-${truncatedId}`;
}
```

### Print Dialog Failure

**Scenario**: Browser blocks `window.print()` or it fails

**Strategy**: Timeout-based error detection (future enhancement)

```javascript
// Current implementation: fire and forget
window.print();

// Future enhancement with error handling:
const printTimeout = setTimeout(() => {
  console.error('Print dialog did not open within 2 seconds');
  // Could show toast notification here
}, 2000);

window.addEventListener('afterprint', () => {
  clearTimeout(printTimeout);
}, { once: true });
```

## Testing Strategy

### Unit Tests

This feature is primarily focused on UI rendering and browser print APIs, which are less suitable for property-based testing. The testing strategy will focus on:

1. **Component Rendering Tests**
   - Verify ReceiptPrint renders with valid props
   - Verify ReceiptPrint returns null when props are missing
   - Verify Print button only appears for paid fee records
   - Verify Print button has correct accessibility attributes

2. **Data Formatting Tests**
   - Test `generateReceiptNumber()` with various inputs (see examples below)
   - Test `formatPaymentDate()` with valid dates, invalid dates, and null
   - Test `formatAmount()` with positive numbers, zero, negative, and NaN
   - Test month name mapping for all 12 months

3. **Error Handling Tests**
   - Test graceful degradation when student.parentName is missing
   - Test "N/A" display when required fields are undefined
   - Test receipt number generation with very long studentId (>20 chars)

4. **Integration Tests**
   - Test that clicking Print button in StudentDetailModal triggers ReceiptPrint render
   - Test that ReceiptPrint receives correct props from StudentDetailModal
   - Verify print state resets after print action completes

### Example Unit Test Cases

**Receipt Number Generation**:
```javascript
describe('generateReceiptNumber', () => {
  it('formats January 2025 correctly', () => {
    expect(generateReceiptNumber(2025, 'January', 'STU001'))
      .toBe('PA-202501-STU001');
  });
  
  it('formats December with zero-padding', () => {
    expect(generateReceiptNumber(2025, 'December', 'STU042'))
      .toBe('PA-202512-STU042');
  });
  
  it('truncates long student IDs', () => {
    const longId = 'STUDENT123456789012345678901234567890';
    const result = generateReceiptNumber(2025, 'March', longId);
    expect(result).toBe('PA-202503-STUDENT12345678901234');
    expect(result.length).toBeLessThanOrEqual(36); // PA-YYYYMM- + 20 chars
  });
  
  it('handles unrecognized month names', () => {
    expect(generateReceiptNumber(2025, 'InvalidMonth', 'STU001'))
      .toBe('PA-202500-STU001');
  });
});
```

**Date Formatting**:
```javascript
describe('formatPaymentDate', () => {
  it('formats Date object correctly', () => {
    const date = new Date(2025, 0, 15); // Jan 15, 2025
    expect(formatPaymentDate(date)).toBe('15/01/2025');
  });
  
  it('formats ISO string correctly', () => {
    expect(formatPaymentDate('2025-03-05T00:00:00Z')).toBe('05/03/2025');
  });
  
  it('returns N/A for null', () => {
    expect(formatPaymentDate(null)).toBe('N/A');
  });
  
  it('returns N/A for invalid date string', () => {
    expect(formatPaymentDate('not-a-date')).toBe('N/A');
  });
});
```

**Amount Formatting**:
```javascript
describe('formatAmount', () => {
  it('formats whole numbers with decimals', () => {
    expect(formatAmount(5000)).toBe('INR 5,000.00');
  });
  
  it('formats decimal numbers', () => {
    expect(formatAmount(1234.56)).toBe('INR 1,234.56');
  });
  
  it('handles zero', () => {
    expect(formatAmount(0)).toBe('INR 0.00');
  });
  
  it('returns fallback for NaN', () => {
    expect(formatAmount(NaN)).toBe('INR 0.00');
  });
  
  it('returns fallback for negative numbers', () => {
    expect(formatAmount(-100)).toBe('INR 0.00');
  });
});
```

### Manual Testing Checklist

Since this feature heavily relies on browser print APIs and visual layout, manual testing is essential:

- [ ] Print button appears only for paid fee records
- [ ] Print button has visible focus indicator when tabbed to
- [ ] Clicking print button opens browser print dialog within 2 seconds
- [ ] Receipt content is visible in print preview
- [ ] Two identical copies appear on single A4 page
- [ ] "Parent Copy" label appears on first copy
- [ ] "School Copy" label appears on second copy
- [ ] Dashed separator line appears at 50% page height
- [ ] "Cut along the line" text appears above separator
- [ ] All receipt fields display correct data
- [ ] Receipt number follows PA-YYYYMM-studentId format
- [ ] Payment date displays in dd/MM/yyyy format
- [ ] Amount displays with thousand separators and two decimals
- [ ] No modal UI elements appear in print preview
- [ ] Print margins are correct (10mm minimum)
- [ ] Receipt copies have borders
- [ ] Text is legible at 12pt minimum size
- [ ] School header is larger (18pt)
- [ ] Receipt is hidden on screen after print cancelled/completed
- [ ] Can print multiple receipts in same session
- [ ] Print works in Chrome, Firefox, Safari

### Accessibility Testing

- [ ] Print button is keyboard accessible
- [ ] Focus indicator meets WCAG 2.1 AA standards (minimum 2px outline)
- [ ] Receipt uses semantic HTML (headings, definition lists)
- [ ] Print button has descriptive aria-label if needed
- [ ] Tab order is logical

## CSS Styling Approach

### Strategy: Tailwind CSS with Custom Print Media Queries

The project uses Tailwind CSS for styling (as evidenced by existing modal components). The receipt component will follow this pattern with additional custom `@media print` rules for print-specific styling.

### Screen Styles (Tailwind Classes)

**Receipt Container** (hidden by default on screen):
```javascript
<div className="hidden print:block">
  {/* Receipt content */}
</div>
```

**Print Button**:
```javascript
<button
  type="button"
  className="rounded border border-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 focus:outline-2 focus:outline-emerald-500"
>
  Print Receipt
</button>
```

### Print Styles (Custom CSS)

**File**: `src/innercomponents/dashboard/ReceiptPrint.css` (or inline `<style>` in component)

```css
@media print {
  /* Hide all non-receipt elements */
  body > *:not(.receipt-print-root) {
    display: none !important;
  }
  
  /* Show only receipt */
  .receipt-print-root {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  /* A4 page setup */
  @page {
    size: A4 portrait;
    margin: 12.7mm; /* 0.5 inches */
  }
  
  /* Receipt container */
  .receipt-container {
    width: 210mm;
    min-height: 297mm;
    background: white;
    padding: 10mm;
    font-family: 'Arial', sans-serif;
  }
  
  /* Single receipt copy */
  .receipt-copy {
    height: 48%;
    border: 1px solid #000;
    padding: 8mm;
    box-sizing: border-box;
  }
  
  /* Separator */
  .receipt-separator {
    height: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .receipt-separator::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 2px dashed #666;
  }
  
  .receipt-separator-text {
    background: white;
    padding: 0 10px;
    font-size: 10pt;
    color: #666;
    position: relative;
    z-index: 1;
  }
  
  /* Typography */
  .receipt-header {
    font-size: 18pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 4mm;
  }
  
  .receipt-address {
    font-size: 10pt;
    text-align: center;
    margin-bottom: 8mm;
    color: #333;
  }
  
  .receipt-label {
    font-size: 14pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 6mm;
  }
  
  .receipt-field {
    display: flex;
    justify-content: space-between;
    font-size: 12pt;
    margin-bottom: 4mm;
  }
  
  .receipt-field-label {
    font-weight: bold;
  }
  
  .receipt-field-value {
    text-align: right;
  }
  
  /* Amount highlighting */
  .receipt-amount {
    font-size: 14pt;
    font-weight: bold;
  }
  
  /* Prevent page breaks within receipt copy */
  .receipt-copy {
    page-break-inside: avoid;
  }
}

/* Screen-only styles */
@media screen {
  .receipt-print-root {
    display: none;
  }
  
  .receipt-print-root.is-printing {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 9999;
    overflow: auto;
  }
}
```

### Alternative: Inline Styles for Print

If adding a separate CSS file is problematic, use inline styles with conditional class names:

```javascript
<div 
  className={`receipt-print-root ${isPrinting ? 'is-printing' : ''}`}
  style={{
    display: isPrinting ? 'block' : 'none'
  }}
>
  {/* Receipt content */}
</div>

<style jsx>{`
  @media print {
    .receipt-print-root {
      display: block !important;
    }
  }
  /* ... other print styles */
`}</style>
```

### Integration with StudentDetailModal Styles

The receipt component will be rendered as a sibling to the modal overlay, not inside it:

```jsx
{/* Existing modal */}
<div className="fixed inset-0 z-[70] ...">
  {/* Modal content */}
</div>

{/* Receipt component (separate root) */}
{printingFee && (
  <ReceiptPrint
    student={student}
    fee={printingFee}
    onClose={() => setPrintingFee(null)}
  />
)}
```

This ensures the receipt can be absolutely positioned and doesn't inherit modal styles during printing.

## Implementation Plan

### Phase 1: Create ReceiptPrint Component

1. Create `/Users/jarvis/parma-academy/parma-academy/src/innercomponents/dashboard/ReceiptPrint.jsx`
2. Implement helper functions:
   - `generateReceiptNumber(year, month, studentId)`
   - `formatPaymentDate(paymentDate)`
   - `formatAmount(amount)`
3. Create component structure with two receipt copies
4. Add print-specific CSS (inline or separate file)
5. Implement `handlePrint()` function with `window.print()`

### Phase 2: Modify StudentDetailModal

1. Import `ReceiptPrint` component
2. Add `printingFee` state: `const [printingFee, setPrintingFee] = useState(null)`
3. Modify fee table actions column:
   - Wrap Archive button and Print button in flex container
   - Add conditional Print button for `fee.status === 'paid'`
   - Add 8px gap between buttons
4. Add conditional render of `ReceiptPrint` at end of component
5. Pass `student`, `fee`, and `onClose` props to `ReceiptPrint`

### Phase 3: Testing

1. Write unit tests for helper functions
2. Write component tests for ReceiptPrint
3. Write integration tests for StudentDetailModal modifications
4. Perform manual testing checklist
5. Perform cross-browser testing (Chrome, Firefox, Safari)
6. Perform accessibility testing with keyboard navigation

### Phase 4: Documentation

1. Add JSDoc comments to helper functions
2. Add prop type documentation (or TypeScript types if project migrates)
3. Update project README if applicable
4. Document known limitations (e.g., browser print API differences)

## Technical Constraints

### Browser Compatibility

**window.print()** is supported in all modern browsers:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ⚠️ Limited support (may not show print dialog)

### CSS Print Media Query Support

**@media print** is supported in all modern browsers:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support

### Limitations

1. **Print Preview Differences**: Different browsers may render print previews slightly differently
2. **User Printer Settings**: Final output depends on user's printer settings (margins, scale, etc.)
3. **Mobile Limitations**: Mobile devices may not support printing or may behave unexpectedly
4. **PDF Generation**: Saving to PDF relies on browser/OS support
5. **No Print Confirmation**: `window.print()` returns undefined, so we cannot confirm if user completed print
6. **Timing Dependency**: Need `setTimeout` to ensure state update and render complete before print dialog

### Security Considerations

1. **No Sensitive Data Storage**: Receipt is generated on-the-fly from already-loaded data
2. **No External Requests**: All data comes from props, no additional Firebase queries
3. **Client-Side Only**: Receipt generation happens entirely in browser
4. **Print Dialog Control**: User controls what actually gets printed

### Performance Considerations

1. **Minimal Re-renders**: Receipt only renders when `printingFee` state is set
2. **No Heavy Computations**: Helper functions are simple string formatting
3. **CSS Print Media**: Print styles only active during print, no impact on screen performance
4. **Memory Usage**: Receipt component unmounts when `printingFee` is cleared

## Future Enhancements

### Short-term

1. **Print Status Toast**: Show toast notification after print completes or fails
2. **Receipt Preview Modal**: Optional on-screen preview before printing
3. **Multiple Receipt Print**: Batch print multiple receipts at once
4. **Customizable School Info**: Allow admin to configure school name/address

### Long-term

1. **PDF Export**: Generate PDF without print dialog using libraries like jsPDF or pdfmake
2. **Email Receipt**: Send receipt via email to parent
3. **Receipt Templates**: Allow admin to customize receipt layout
4. **Barcode/QR Code**: Add receipt verification via barcode
5. **Multi-language Support**: Translate receipt content to regional languages
6. **Digital Signature**: Add authorized signatory signature image

## Acceptance Criteria Mapping

This design addresses all requirements from the requirements document:

- **Requirement 1**: Print button visibility controlled by `fee.status === 'paid'` condition
- **Requirement 2**: `window.print()` triggered by button click
- **Requirement 3**: Two identical receipt copies with separator line
- **Requirement 4**: All required fields (school name, address, student details, fee details) displayed
- **Requirement 5**: Receipt number generated using `PA-{YYYY}{MM}-{studentId}` format
- **Requirement 6**: `@media print` styles hide modal UI and show only receipt
- **Requirement 7**: Data passed via props, no additional Firestore queries
- **Requirement 8**: New `ReceiptPrint.jsx` file in correct directory
- **Requirement 9**: Receipt visibility controlled by `isPrinting` state and CSS display rules
- **Requirement 10**: Professional formatting with borders, proper spacing, and 12pt+ font sizes
