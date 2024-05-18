# Ctrl Alt Elite: Sprint 3 Planning <br> 5/18/2024: 4:00pm - 5:00pm

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

- Identify timeline
- Identify tasks
- Local tooling
- Github Project

### Identify Timeline
- Next version should be done by next Friday (05/24/2024)
- Have completed by June 7th.
- From 05/11 meeting:
    - **05/19 → 05/24 = PWA / Testing**
    - 05/26 → 06/01 = Additional Features / Testing
    - 06/02 → 06/07 = Functional Across all Targeted Platforms
    - 06/09 → 06/13 (end date) = Demo Video / Presentations / Interviews.

### Identify Tasks
- 14 issues currently.
- Most Important: CSS needs to be done (Notes Page + Project Page), Media Queries for adjusting to mobile, Making Tests.
- Issues will be set up for end-to-end testing (like lab6).
- Everyone will pick up issues themselves &rarr; everyone should have an issue they're working on.
    - Just has to be done by Friday.
- Anyone who doesn't feel comfortable picking issues for themselves, then ask Daniel or Matt and they will assign one to them.
- Can pair up on the issues &rarr; so everyone can help each other out.
    - add `help wanted` on an issue if you need help. 

### Local Tooling
- All of the actions is all configured in the repo &rarr; package.json and package-lock contains everything + runs when we merge into dev.
    - Prevents from Merging: ESLint + Unit Testing.
    - Prevent Pull Request Being Denied: install these tools on your local machine
        - `npm i` installs everything you need.
            - `npm generate-docs`
            - `npm test`
            - `npm lint`
            - `npm run`
        - Helps to check locally before generating pull requests.
            - VSCode also has extensions so those can be installed and will format upon save.
                - `JSDoc` won't generate the JSDoc until you run it. 
        - ESLint catches things defined in the style guide &rarr; if errors are thrown then check the style guide.

### Github Project
- Supposed to help with project workflow so that everyone knows what's currently being worked on and what needs to be worked on later.
- Four different tabs for Issues:
    - Backlog
        - Issues that need to be addressed but no one has been assigned / it hasn't been started yet.
        - Rolling backlog of issues where tasks can be "grabbed" when there is a lull in what someone is doing.
    - Todo
        - Issues have people assigned to them but not started yet.
    - In Progress
        - What you're currently working on AKA when you actually start on the issue.
    - Done
- Conversations can be had about specific tasks that people are working on
    - help create avenues for people to talk about the issues.
- Pull Requests are set to dev so add (#closes and the issue number)
- All code has to be reviewed when you merge it into dev &rarr; Matt, Daniel, Vaibhav will take a look at it.
- Tags are made for each of the pages.

### Additional Things:
- Another sprint might be assigned by the TAs.
