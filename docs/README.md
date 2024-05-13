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

- `index.html` will serve as the landing page when we publish
- `README.md` in the main depository will serve as a README for the project which links to our documentation, contains a quickstart guide, or any other information relevant to an initial viewing of the repository.

## Branches

Two primary branches will be maintained throughout the project.

- `main` will serve as the release branch for the project.
- `dev` will serve as the dev branch for the project. It will be protected by checks.

When working on a feature, developers should branch off of `dev`. Linting and unit testing will occur upon merging the feature branch back with the `dev` branch.

`dev` will be merged into `main` only when a new release needs to be published.