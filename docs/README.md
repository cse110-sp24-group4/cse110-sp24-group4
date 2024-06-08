# General documentation for DevDog by Ctrl Alt Elite

## Repository structure

This repository will adhere to the following structure:

```
cse110-sp24-group4/
    /admin
    /docs
    /source
    /specs
```

- `/docs` will contain all documentation for the project. These should be `.md` documents detailing how the repository should be maintained. The subdirectory `/jsdoc` will contain the JSDoc generated for our project.
- `/admin` contains meeting minutes and other administrative material related to the project or class in general.
- `/source` will conain the project source code
- `/specs` will contain all content relating to the specifications of the project, as well as ADRs

## Project structure

The project source code will all be kept under `/source`.
`/source` will follow the following structure:

```
source/
    /assets
    /pages
        *.html
        *.md
    /js
        *.js
    /css
        *.css
    index.html
    README.md
```

- `/assets` will contain any images we need for our project
- `/js` will contain all the `.js` scripts we are implementing in our project. All files within this directory should have the `.js` extension.
- `/css` will contain all the cascading style sheets for our project. All files within this directory should have the `.css` extension
- `/pages` will contain the additional pages to the website aside from `index.html`. All files within this directory should have the `.html` or `.md` extension.
- `index.html` will serve as the landing page when we publish
- `README.md` in the main depository will serve as a README for the project which links to our documentation, contains a quickstart guide, or any other information relevant to an initial viewing of the repository.

## Branches

Two primary branches will be maintained throughout the project.

- `main` will serve as the release branch for the project.
- `dev` will serve as the dev branch for the project. It will be protected by checks.

When working on a feature, developers should branch off of `dev`. Linting, unit, and puppeteer testing will occur upon merging the feature branch back with the `dev` branch.

`dev` will be merged into `main` only when a new release needs to be published.

## Style guide

The [style guide](./styleguide-js.md) details all rules pertaining to how source code should be written. It covers everything from source file and internal naming conventions to when to use `let` vs `const` to what comments should be written and more. Adherence is enforced through linting and code review.

## Script usage

[This document](./npm-script-usage.md) describes how to use the scripts for linting, unit testing, puppeteer E2E testing, prettier, and JSDoc which are configured within our source folder. Team members can run these before making pull requests to ensure their contributions will satisfy the required status checks.

## JSDoc

JSDoc is generated upon merging feature branches with `dev`. JSDoc for the project can be viewed [here](./js/index.html).