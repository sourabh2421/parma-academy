# Requirements Document

## Introduction

This document defines the requirements for adding a print receipt feature to the student fee management system. The feature allows administrators to generate and print professional fee payment receipts for paid fee records. Each receipt is formatted for A4 paper with two identical copies (Parent Copy and School Copy) that can be cut and distributed.

## Glossary

- **Fee_Management_System**: The web application managing student fee records in Firebase Firestore
- **Student_Detail_Modal**: The React component displaying student profile and fee payment history
- **Fee_Record**: A document in the Firestore `fees` collection containing payment information
- **Receipt**: A printable document showing proof of fee payment
- **Receipt_Component**: The new React component responsible for rendering the printable receipt view
- **Print_Button**: The UI control that triggers the receipt printing flow
- **Print_Stylesheet**: CSS media query rules that control layout and visibility during printing

## Requirements

### Requirement 1: Print Button Visibility

**User Story:** As an administrator, I want to see a "Print Receipt" button only for paid fee records, so that I can distinguish which records are printable.

#### Acceptance Criteria

1. WHEN a Fee_Record has status equal to 'paid', THE Student_Detail_Modal SHALL display a Print_Button in the Actions column
2. WHEN a Fee_Record has status equal to 'pending', THE Student_Detail_Modal SHALL NOT display a Print_Button in the Actions column
3. THE Print_Button SHALL be positioned immediately to the right of the existing Archive button in the Actions column with 8px horizontal spacing
4. THE Print_Button SHALL have type="button" attribute AND WHEN focused via keyboard navigation, THE Print_Button SHALL display a visible focus indicator with at least 2px outline
5. WHEN a Fee_Record has status with any value other than 'paid' or 'pending', THE Student_Detail_Modal SHALL NOT display a Print_Button
6. THE Print_Button SHALL display the text "Print Receipt" as its visible label

### Requirement 2: Print Receipt Action

**User Story:** As an administrator, I want to trigger the print dialog by clicking the Print Receipt button, so that I can print or save fee receipts.

#### Acceptance Criteria

1. WHEN the Print_Button is clicked AND receipt_data is loaded, THE Fee_Management_System SHALL display the browser print dialog within 2 seconds
2. WHEN the Print_Button is clicked, THE Fee_Management_System SHALL NOT navigate away from the current page
3. WHEN the Print_Button is clicked, THE Fee_Management_System SHALL render the receipt content visible to the user before displaying the print dialog
4. WHEN printing is cancelled or completed, THE Fee_Management_System SHALL remain on the Student_Detail_Modal
5. IF receipt_data is not loaded, THEN THE Fee_Management_System SHALL disable the Print_Button
6. IF the print dialog fails to open within 2 seconds, THEN THE Fee_Management_System SHALL display an error message indicating print functionality is unavailable

### Requirement 3: Receipt Layout Structure

**User Story:** As an administrator, I want receipts to have two identical copies on one page, so that I can give one to the parent and keep one for school records.

#### Acceptance Criteria

1. THE Receipt_Component SHALL render two receipt copies on a single portrait-oriented A4 page (210mm × 297mm)
2. WHERE a receipt copy contains all required payment fields, THE Receipt_Component SHALL ensure both copies display identical content, dimensions, and styling
3. THE Receipt_Component SHALL position the first copy within the vertical range 0–48% of the page height
4. THE Receipt_Component SHALL display the label "Parent Copy" at the top of the first receipt copy
5. THE Receipt_Component SHALL position the second copy within the vertical range 52–100% of the page height
6. THE Receipt_Component SHALL display the label "School Copy" at the top of the second receipt copy
7. THE Receipt_Component SHALL display a dashed horizontal line at 50% page height between the two copies
8. THE Receipt_Component SHALL display the text "Cut along the line" within 5mm above the separator line
9. THE Receipt_Component SHALL apply printable margins of at least 10mm on all sides to prevent content clipping

### Requirement 4: Receipt Content Display

**User Story:** As an administrator, I want each receipt copy to show complete payment details, so that parents and school have accurate records.

#### Acceptance Criteria

1. WHEN a receipt is rendered, THE Receipt_Component SHALL display the school name "Parma Academy" in the header
2. THE Receipt_Component SHALL display the school address "Parikrama Marg, Parmapuram, Ayodhya - 224123 U.P."
3. WHEN a receipt is rendered, THE Receipt_Component SHALL display a receipt number formatted as "PA-{year}{month}-{studentId}" where year is 4 digits and month is 2 zero-padded digits
4. THE Receipt_Component SHALL display the student name from the Fee_Record
5. THE Receipt_Component SHALL display the class from the Fee_Record
6. THE Receipt_Component SHALL display the parent name from the Student data
7. THE Receipt_Component SHALL display the month from the Fee_Record
8. THE Receipt_Component SHALL display the year from the Fee_Record
9. THE Receipt_Component SHALL display the amount in INR format with thousand separators
10. THE Receipt_Component SHALL display the payment date in dd/MM/yyyy format
11. THE Receipt_Component SHALL display the status as "Paid"
12. WHEN Fee_Record.studentId exceeds 20 characters, THE Receipt_Component SHALL truncate the studentId portion of the receipt number to 20 characters
13. THE Receipt_Component SHALL format amount as "INR " followed by the numeric value with comma thousand separators and two decimal places
14. IF any required field (studentName, class, parentName, month, year, amount, paymentDate) is missing from the props, THEN THE Receipt_Component SHALL display "N/A" for that field

### Requirement 5: Receipt Number Generation

**User Story:** As an administrator, I want each receipt to have a unique identifier, so that I can reference specific receipts.

#### Acceptance Criteria

1. WHEN a receipt is generated, THE Receipt_Component SHALL create the receipt number using the pattern "PA-{year}{month}-{studentId}" where year is 4 digits, month is 2 digits, and studentId is the value from the Fee_Record
2. WHEN the Fee_Record has year 2025, month "January", and studentId "STU001", THE Receipt_Component SHALL display receipt number "PA-202501-STU001"
3. WHEN the Fee_Record has month "December", THE Receipt_Component SHALL format the month as "12" in the receipt number
4. THE Receipt_Component SHALL zero-pad single-digit month numbers to two digits
5. WHEN generating a receipt number, THE Receipt_Component SHALL ensure the combination of year, month, and studentId produces a unique receipt number
6. IF the Fee_Record is missing year, month, or studentId values, THEN THE Receipt_Component SHALL not generate a receipt number and SHALL display an error message indicating which required field is missing

### Requirement 6: Print-Specific Styling

**User Story:** As an administrator, I want only the receipt to appear on the printed page, so that the printout looks professional without UI elements.

#### Acceptance Criteria

1. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to none for all navigation elements
2. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to none for the sidebar
3. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to none for all buttons including the Print_Button and Close button
4. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to none for the Student_Detail_Modal background and border
5. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to block for the Receipt_Component and all its child elements
6. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set display property to none for all elements outside the Receipt_Component within the Student_Detail_Modal
7. THE Print_Stylesheet SHALL use @media print CSS rules to define all print-specific styles
8. WHEN viewing on screen outside print preview, THE Receipt_Component SHALL be visible only when the Student_Detail_Modal is open
9. WHEN the browser print media query activates, THE Print_Stylesheet SHALL set page margins to 0.5 inches on all sides

### Requirement 7: Data Source Integration

**User Story:** As an administrator, I want receipt data to come from the existing fee record, so that I don't need to fetch data again.

#### Acceptance Criteria

1. WHEN the Receipt_Component is rendered, THE Receipt_Component SHALL accept a Fee_Record object as a prop containing studentId, studentName, class, month, year, amount, status, and paymentDate fields
2. WHEN the Receipt_Component is rendered, THE Receipt_Component SHALL accept a Student object as a prop containing id, name, parentName, and class fields
3. WHEN a receipt is generated, THE Fee_Management_System SHALL NOT execute Firestore read operations after the Student_Detail_Modal has opened
4. WHEN the Print_Button is clicked, THE Student_Detail_Modal SHALL pass the already-loaded Fee_Record and Student data to the Receipt_Component
5. IF Fee_Record or Student props are missing required fields, THEN THE Receipt_Component SHALL display an error message listing the missing fields
6. IF Fee_Record prop is null or undefined, THEN THE Receipt_Component SHALL not render and SHALL log an error to the console

### Requirement 8: Component File Organization

**User Story:** As a developer, I want the receipt component in a dedicated file, so that the code is maintainable and reusable.

#### Acceptance Criteria

1. THE Fee_Management_System SHALL create a new file named ReceiptPrint.jsx containing a React component that exports a default function component
2. THE ReceiptPrint.jsx file SHALL be located in the src/innercomponents/dashboard directory
3. THE Student_Detail_Modal SHALL import the Receipt_Component from ReceiptPrint.jsx using relative path ./ReceiptPrint.jsx
4. THE Fee_Management_System SHALL NOT modify feeRepository.js for this feature
5. THE Fee_Management_System SHALL NOT modify studentRepository.js for this feature
6. THE Receipt_Component SHALL accept student and fees data as props
7. THE Receipt_Component SHALL render printable receipt content within a React component structure

### Requirement 9: Receipt Visibility Control

**User Story:** As an administrator, I want the receipt to be hidden until I click print, so that it doesn't interfere with the normal modal view.

#### Acceptance Criteria

1. WHEN the Student_Detail_Modal is open AND no Print_Button has been clicked, THE Receipt_Component SHALL have CSS display property set to 'none' for @media screen
2. WHEN the Print_Button is clicked, THE Receipt_Component SHALL have CSS display property changed from 'none' to 'block'
3. WHEN the print dialog is closed by the user cancelling or completing the print action, THE Receipt_Component SHALL have CSS display property set to 'none' for @media screen
4. THE Receipt_Component SHALL use @media print CSS rule to set display property to 'block' regardless of screen display state
5. THE Receipt_Component SHALL use @media screen CSS rule to control visibility based on print action state

### Requirement 10: Receipt Formatting Standards

**User Story:** As an administrator, I want receipts to look professional, so that they are suitable for official records.

#### Acceptance Criteria

1. THE Receipt_Component SHALL use minimum vertical spacing of 8mm between distinct content sections within each receipt copy
2. THE Receipt_Component SHALL use font size of at least 12pt for all body text including student name, class, parent name, month, year, and payment date
3. THE Receipt_Component SHALL use font size of 18pt for the school name header
4. THE Receipt_Component SHALL right-align all currency amount values with decimal points vertically aligned
5. THE Receipt_Component SHALL display a 1px solid border around the perimeter of each receipt copy
6. THE Receipt_Component SHALL use margins of at least 15mm on all sides within the A4 page (210mm × 297mm) printable area
