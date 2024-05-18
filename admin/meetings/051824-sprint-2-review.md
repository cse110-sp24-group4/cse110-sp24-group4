# Ctrl Alt Elite: Sprint 2 Review <br> 5/18/2024: 4:00pm - 5:00pm

## Members Present
- Daniel
- Matt
- Joseph
- Kaye
- Kekoa
- Gautham
- Aodong
- Vaibhav
- Tia


### Topics

- Team member check-in
- Team demos
- Successes
- Concerns
- How to address concerns

### Team Member Check-In
Daniel and Matt checked in with the team members to see how everyone was feeling about the project so far.

### Team Demos
- Landing Team:
    - Initialization: gets projects from local storage and keeps track of a list of projectIds and keeps adding to the current project list which is displayed on the screen. `createProject()` is called on initialization.
    - Can create a new project.
    - Delete Functions which removes the project from memory as well - project list updates when page is reloaded.
    - newProjectItem() creates the new projectItem as well as the new url.
- Project Team:
    - Initialization: creates the add note button and loads button into local storage.
    - loadNotesFromStorage() gets notes from local storage which then calls a local note storage which gets the notes from localStorage.
    - createNote function generates random id and creates a js object + saves it to local storage + creates corresponding html element.
    - editing: attached to the edit button on the notes, which basically queries the corresponding html element for the notes using the noteId and changes the button to a save button (which calls the save function) and changes paragraph element to a textarea element so the new text can be inputed.
    - save will call saveNote function which changes button back to edit and changes input with a paragraph element.
    - delete note removes element from the webpage and removes it from local storage as well.
- UI Team
    - Front Page &rarr; Welcome User (shows projects + upload) &rarr; iff all notes is clicked &rarr; All Notes &rarr; if project is clicked &rarr; Project Page

### Successes
- Notes are being kept separate within the app.
- Project links are connecting properly
- Divided the work well. Everyone was involved and contributing to the project.
- We got a lot of functionality done this week + a lot planned out.
- Checking each other's work to make sure the feature was implemented correctly.
- The page is looking good too.
- A lot was done on the pipeline.

### Concerns
- Adding more communication between teams around integrating the pages together.
    - So we'd gain a better understanding of each other's process.
- Everyone could be better on track with what's going on. Notes on how everything works would be good to have.

### How to address concerns
- Next time that something is noticed about the project website, raise a Github Issue so that it can be checked by other team members.
- Just because we're in separate teams doesn't mean we can't talk &rarr; put it in `#general` for questions.
- Documentation should help - project documentation + JSDocs
- Questions can be told to the other members

### Anything else:
- Repo Maintenance
    - Renaming some pages:
        - project.html &rarr; notes.html
        - project.html just shows the project page now.
- Markdown document has specific requirements for style: font, font-size, color-palletes,
- Possible issue of the project link going to a generic website url and not one personalized to that specific problem.
    - Solution: project page was looking for `projectId` whereas landing page was passing `projectid` which meant that `null` returned for the project page part.
- Unit Testing should be done every time we're pushing JS files with functions that have return values.
