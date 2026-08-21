# Requirements Document

## Introduction

This document specifies the styling and layout requirements for redesigning the Admin Dashboard UI (/dashboard route) using an editorial/flat minimal aesthetic with brand colors (white, forest green/emerald, and coral/rose). The redesign is scoped exclusively to styling and layout changes—no functional logic, state management, event handlers, or data flow modifications are included.

## Glossary

- **Dashboard_UI**: The administrative dashboard interface located at the /dashboard route
- **Summary_Cards**: The metric display cards showing Total Students, Total Fees Collected, Pending Payments, and Current Month Collection
- **Upload_Panel**: The file upload interface for importing student data via Excel or CSV files
- **Activity_Table**: The tabular display of recent fee transaction records
- **Export_Section**: The interface section containing backup and export functionality buttons
- **Emerald_Palette**: The green brand color palette (emerald-50, emerald-200, emerald-600, emerald-700)
- **Rose_Palette**: The coral/red brand color palette (rose-50, rose-200, rose-700)
- **Editorial_Aesthetic**: A design approach characterized by flat elements, generous whitespace, light typography, and minimal ornamentation

## Requirements

### Requirement 1

**User Story:** As a dashboard user, I want the summary metric cards to follow a flat minimal design with brand color accents, so that the interface feels cohesive and visually calm.

#### Acceptance Criteria

1. THE Summary_Cards SHALL use flat card styling with rounded-none borders
2. THE Summary_Cards SHALL display a full subtle border using border and border-emerald-200 classes
3. THE Summary_Cards SHALL include a left border accent using border-l-4 and border-emerald-600 classes
4. THE Summary_Cards SHALL use white background (bg-white class)
5. WHEN displaying Total Students metric THEN the Summary_Cards SHALL use text-emerald-700 for the value
6. WHEN displaying Total Fees Collected metric THEN the Summary_Cards SHALL use text-emerald-700 for the value
7. WHEN displaying Pending Payments metric THEN the Summary_Cards SHALL use text-rose-700 for the value
8. WHEN displaying Current Month Collection metric THEN the Summary_Cards SHALL use text-emerald-700 for the value
9. THE Summary_Cards SHALL remove all background color classes except bg-white
10. THE Summary_Cards SHALL use font-light for metric labels

### Requirement 2

**User Story:** As a dashboard user, I want the upload panel to have a cleaner, more minimal appearance, so that it integrates seamlessly with the editorial aesthetic.

#### Acceptance Criteria

1. THE Upload_Panel SHALL use rounded-2xl for the outer container border radius
2. THE Upload_Panel SHALL maintain border border-slate-200 for the outer container
3. THE Upload_Panel upload zone SHALL use border-dashed border-slate-300 for the default state
4. WHEN the upload zone receives hover interaction THEN it SHALL use border-emerald-400 and bg-emerald-50
5. THE Upload_Panel primary button styling SHALL use bg-emerald-600 with hover:bg-emerald-700
6. THE Upload_Panel SHALL use white background (bg-white) for the outer container

### Requirement 3

**User Story:** As a dashboard user, I want the activity table to display data with generous spacing and light typography, so that fee records are easy to scan and read.

#### Acceptance Criteria

1. THE Activity_Table header cells SHALL use font-light for typography weight
2. THE Activity_Table data cells SHALL use font-normal for typography weight
3. THE Activity_Table rows SHALL use py-4 px-4 for cell padding
4. THE Activity_Table rows SHALL use border-b border-slate-100 for row separators
5. THE Activity_Table header row SHALL use border-b border-slate-200 for header separation
6. THE Activity_Table status values SHALL use text-emerald-700 for "paid" status
7. THE Activity_Table status values SHALL use text-rose-700 for "pending" status

### Requirement 4

**User Story:** As a dashboard user, I want the export section buttons to use consistent brand styling, so that interactive elements follow the same visual language throughout the dashboard.

#### Acceptance Criteria

1. THE Export_Section primary export button SHALL use bg-emerald-600 with hover:bg-emerald-700
2. THE Export_Section secondary export button SHALL use border-slate-300 with hover:border-emerald-400 and hover:text-emerald-800
3. THE Export_Section buttons SHALL use rounded-lg for border radius
4. THE Export_Section container SHALL use rounded-2xl for the outer section border radius

### Requirement 5

**User Story:** As a dashboard user, I want the overall layout to have more breathing room and lighter visual hierarchy, so that the interface feels spacious and editorial.

#### Acceptance Criteria

1. THE Dashboard_UI main container SHALL use space-y-8 for vertical spacing between sections
2. THE Dashboard_UI section headers SHALL use font-light for title typography
3. THE Dashboard_UI section containers SHALL use rounded-2xl for border radius
4. THE Dashboard_UI section containers SHALL use border border-slate-200 for borders
5. THE Dashboard_UI section containers SHALL use bg-white for backgrounds
6. THE Dashboard_UI section containers SHALL use p-5 for internal padding
