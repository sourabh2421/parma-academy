# Requirements Document

## Introduction

This feature enables administrators to create fee records for multiple months simultaneously in the AddFeeModal dialog. Currently, administrators must open the dialog multiple times to create fee records for consecutive months when parents pay upfront for several months. This feature streamlines the workflow by allowing selection of 2-12 consecutive months with shared fee details (amount, status, payment date).

## Glossary

- **Fee_Modal**: The AddFeeModal React component used to create and submit fee records
- **Month_Selection_Mode**: The UI state determining whether the user selects a single month or multiple months
- **Single_Month_Mode**: The default mode where the user selects exactly one month using the existing dropdown
- **Multi_Month_Mode**: The new mode where the user selects 2-12 consecutive months
- **Fee_Details**: The data fields shared across all selected months (amount, status, payment date, year)
- **Fee_Record**: A Firestore document representing a fee entry for one student-month-year combination
- **createFeeRecord**: The existing repository function that creates one fee record in Firestore

## Requirements

### Requirement 1: Month Selection Mode Toggle

**User Story:** As an administrator, I want to switch between single-month and multi-month creation modes, so that I can choose the appropriate workflow based on the number of months I need to create.

#### Acceptance Criteria

1. THE Fee_Modal SHALL provide a toggle control to switch between Single_Month_Mode and Multi_Month_Mode
2. WHEN the Fee_Modal opens, THE Fee_Modal SHALL default to Single_Month_Mode
3. WHEN the user activates the toggle, THE Fee_Modal SHALL switch to Multi_Month_Mode and display multi-month selection UI
4. WHEN the user deactivates the toggle, THE Fee_Modal SHALL switch to Single_Month_Mode and display the existing single-month dropdown

### Requirement 2: Single Month Selection

**User Story:** As an administrator, I want to create a fee record for one month using the existing workflow, so that I can maintain the current behavior when multi-month creation is unnecessary.

#### Acceptance Criteria

1. WHILE the Fee_Modal is in Single_Month_Mode, THE Fee_Modal SHALL display the existing month dropdown
2. WHEN the user selects a month in Single_Month_Mode, THE Fee_Modal SHALL accept exactly one month selection
3. WHEN the user submits the form in Single_Month_Mode, THE Fee_Modal SHALL call createFeeRecord once with the selected month
4. THE Single_Month_Mode behavior SHALL remain identical to the current implementation

### Requirement 3: Multiple Month Selection

**User Story:** As an administrator, I want to select multiple consecutive months when creating fee records, so that I can create fees for 2-12 months in one operation.

#### Acceptance Criteria

1. WHILE the Fee_Modal is in Multi_Month_Mode, THE Fee_Modal SHALL display a multi-select month control
2. WHEN the user selects months in Multi_Month_Mode, THE Fee_Modal SHALL accept between 2 and 12 months inclusive
3. WHEN the user selects fewer than 2 months in Multi_Month_Mode, THE Fee_Modal SHALL display a validation error stating minimum requirement
4. WHEN the user selects more than 12 months in Multi_Month_Mode, THE Fee_Modal SHALL prevent additional selections and display a validation message
5. THE Fee_Modal SHALL allow the user to deselect previously selected months in Multi_Month_Mode

### Requirement 4: Shared Fee Details Input

**User Story:** As an administrator, I want to enter fee amount, status, and payment date once for all selected months, so that I can efficiently create records with identical details.

#### Acceptance Criteria

1. WHILE the Fee_Modal is in Multi_Month_Mode, THE Fee_Modal SHALL display a single amount input field
2. WHILE the Fee_Modal is in Multi_Month_Mode, THE Fee_Modal SHALL display a single status selection (pending or paid)
3. WHEN status is set to paid in Multi_Month_Mode, THE Fee_Modal SHALL display a single payment date picker
4. WHEN the user submits the form in Multi_Month_Mode, THE Fee_Modal SHALL apply the entered amount to all selected months
5. WHEN the user submits the form in Multi_Month_Mode, THE Fee_Modal SHALL apply the selected status to all selected months
6. WHEN the user submits the form in Multi_Month_Mode with paid status, THE Fee_Modal SHALL apply the selected payment date to all selected months

### Requirement 5: Year Validation

**User Story:** As an administrator, I want the system to prevent cross-year month selection, so that I avoid creating inconsistent fee records spanning multiple years.

#### Acceptance Criteria

1. WHEN the user selects months in Multi_Month_Mode, THE Fee_Modal SHALL validate that all selected months belong to the selected year
2. WHEN the user changes the year in Multi_Month_Mode, THE Fee_Modal SHALL preserve the month selections if they remain valid for the new year
3. THE Fee_Modal SHALL display the same year dropdown in both Single_Month_Mode and Multi_Month_Mode

### Requirement 6: Bulk Fee Record Creation

**User Story:** As an administrator, I want the system to create one fee record per selected month when I submit the multi-month form, so that each month has its own Firestore document.

#### Acceptance Criteria

1. WHEN the user submits the form in Multi_Month_Mode with N selected months, THE Fee_Modal SHALL call createFeeRecord N times
2. FOR EACH selected month M, THE Fee_Modal SHALL call createFeeRecord with studentId, studentName, class, month M, year, amount, status, and paymentDate
3. WHEN calling createFeeRecord for each month, THE Fee_Modal SHALL pass the same amount value to all calls
4. WHEN calling createFeeRecord for each month, THE Fee_Modal SHALL pass the same status value to all calls
5. WHEN calling createFeeRecord for each month with paid status, THE Fee_Modal SHALL pass the same paymentDate value to all calls
6. THE Fee_Modal SHALL preserve the existing createFeeRecord duplicate detection and merging behavior for each month

### Requirement 7: Partial Failure Handling

**User Story:** As an administrator, I want the system to continue creating fee records for remaining months even if one month fails, so that I do not lose successfully created records due to a single failure.

#### Acceptance Criteria

1. WHEN createFeeRecord fails for one month during Multi_Month_Mode submission, THE Fee_Modal SHALL continue calling createFeeRecord for remaining months
2. WHEN createFeeRecord fails for one or more months, THE Fee_Modal SHALL track which months succeeded and which months failed
3. WHEN createFeeRecord fails for one or more months, THE Fee_Modal SHALL not roll back successfully created records
4. WHEN partial failure occurs, THE Fee_Modal SHALL display a summary message showing the count of succeeded months and the count of failed months

### Requirement 8: Success Feedback

**User Story:** As an administrator, I want to see an aggregated success message after bulk creation, so that I know how many fee records were created and for which months.

#### Acceptance Criteria

1. WHEN all selected months are successfully saved in Multi_Month_Mode, THE Fee_Modal SHALL display a success message showing the count of created records
2. WHEN all selected months are successfully saved in Multi_Month_Mode, THE Fee_Modal SHALL display the month range in the success message (e.g., "3 fee records created for April-June 2026")
3. WHEN createFeeRecord returns merge or revival metadata for any month, THE Fee_Modal SHALL include this information in the aggregated message
4. WHEN the user submits the form in Multi_Month_Mode, THE Fee_Modal SHALL display a loading state showing the count of months being processed

### Requirement 9: Form State Reset

**User Story:** As an administrator, I want the form to clear after successful submission, so that I can create additional fee records without stale data.

#### Acceptance Criteria

1. WHEN all fee records are successfully created in Multi_Month_Mode, THE Fee_Modal SHALL close the dialog
2. WHEN the dialog closes after successful submission, THE Fee_Modal SHALL call the onCreated callback to refresh the parent component data
3. WHEN the dialog reopens after submission, THE Fee_Modal SHALL reset to Single_Month_Mode with default values

### Requirement 10: Input Validation

**User Story:** As an administrator, I want the system to validate my inputs before submission, so that I receive immediate feedback on invalid data.

#### Acceptance Criteria

1. WHEN the user submits the form with an invalid amount (non-numeric or negative), THE Fee_Modal SHALL display an error message and prevent submission
2. WHEN the user submits the form in Multi_Month_Mode with zero selected months, THE Fee_Modal SHALL display an error message and prevent submission
3. WHEN the user submits the form with paid status and no payment date, THE Fee_Modal SHALL display an error message and prevent submission
4. THE Fee_Modal SHALL apply the same amount validation rules in both Single_Month_Mode and Multi_Month_Mode
