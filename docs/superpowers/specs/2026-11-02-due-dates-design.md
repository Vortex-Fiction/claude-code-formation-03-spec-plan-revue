# Due dates and overdue loans — design

Ticket: [`tickets/feature.md`](../../../tickets/feature.md)

## Intent

A librarian must see which borrowers keep a book too long. Each loan gets a due date when the borrower borrows the book. The API and the loans screen show the overdue loans.

## Goals

- `POST /api/loans` stores a due date on the new loan and returns it.
- `GET /api/loans/overdue` returns the loans that are not returned and are past their due date.
- The loans screen shows the due date of each loan and marks each overdue loan.
- A database that `main` created starts with this version, and its loans get a due date.
- `npm run test:coverage` stays at 100 %.

## Non-goals

- Fines.
- Messages to the borrower.
- A longer loan on request.
- A loan duration that changes for each book or each borrower.

## Anti-goals

- The API does not start on a database that `main` created.
- A loan that exists before the change has no due date, or a due date that the borrow date does not give.
- A loan is overdue on its due date. The borrower can return the book until the end of that day.
- A returned loan is in the overdue list.

## Decided

- **Loan duration:** 14 days for each book. The value is one constant, `LOAN_DURATION_DAYS`. Reason: the ticket asks for no rule per book, and one constant is easy to change.
- **Due date format:** a calendar date, `YYYY-MM-DD`, in UTC. The due date is the borrow date in UTC plus 14 days. Reason: `borrowedAt` is already an ISO time in UTC, and a day is what a librarian tells a borrower.
- **Overdue rule:** a loan is overdue when `returnedAt` is `null` and the due date is before today, in UTC. A loan is not overdue on its due date. Reason: the borrower has the full due day.
- **Existing loans:** at start, the API adds the `due_date` column when it is missing. Each existing loan gets its borrow date plus 14 days. Returned loans also get a due date, so that each loan has the same shape. Reason: no loan stays without a due date, and the rule is the same for old and new loans.
- **Late return:** after the return, the loan keeps its due date and gets its return date. It leaves the overdue list. The screen shows both dates. There is no "returned late" flag. Reason: fines are out of scope, and both dates already tell the story.
- **API shape:** `Loan` gets `dueDate: string`. `GET /api/loans/overdue` returns `Loan[]`, in the same shape as `GET /api/loans`.

## Left to the builder

- The name and the place of the migration code, if a test on a database with the schema of `main` covers it.
- How the loans screen marks an overdue loan, if the mark is text and not only a color.
- The order of the overdue loans.
