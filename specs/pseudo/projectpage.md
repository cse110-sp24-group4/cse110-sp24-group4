# Code guide for project page

## Phase 1
For the MVP in phase 1, the landing page should implement the process described in pseudocode below:
```
On page load:
    - get project name from url parameter
    - load all entries corresponding to the specified project
    - add all entries to a list and display them to the user, sorted by most recent
On clicking "add new entry":
    - open a text box to allow the user to add a new entry for the project
    - add the entry to the top of the entries for the project
On clicking "edit entry":
    - open a text box with the current entry in it, allow the user to edit the entry. This should preserve the original date of the entry
    - add the entry back in its corresponding location in the entry list
On clicking "delete entry":
    - remove the entry from the list of entries
    - update the list of entries
On clicking the "home" button:
    - return the user to the landing page
```