# Due dates and overdue loans

## Need

A librarian wants to see the overdue loans, so that they can contact each borrower who keeps a book too long. Today a loan has no due date, so nobody knows when a loan is late.

## What the librarian asks for

- When a borrower borrows a book, the loan gets a due date.
- The API gives the list of the overdue loans.
- The loans screen shows the due date of each loan and the overdue loans.

## Open questions

- How long is a loan? Is the duration the same for each book?
- Is a loan overdue on its due date, or only on the day after?
- The database already holds loans without a due date. What do these loans get?
- A borrower returns a book after the due date. What does the loan show after the return?

## Not in this ticket

- Fines.
- Messages to the borrower.
- A longer loan on request.
