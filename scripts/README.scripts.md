# Git Hooks/Workflow

We use githooks([github](https://github.com/devlinjunker/template.hapi.rest/tree/master/scripts/hooks)) to help clean up and enforce the workflow for developers. This is done with Husky.

**NOTE: We prevent commits to master branch on local machine (so all changes to master are PRs on github)**. You may want to disable this for more rapid local development, you can just remove the configuration in package.json([github](https://github.com/devlinjunker/template.hapi.rest/blob/master/package.json#L30)) that adds these hooks.


## On commit
Before each commit, we want to verify that the build won't break. So we make sure to run the build process one more time with only the committed files before
letting the commit go through:

Process:
1. Stash uncommited changes
2. Run linting/flow/compliation and tests with npm/webpack
3. Pop uncommitted changes


## Github Actions
We setup github actions on this project so we can enforce actions/checks and workflow processes on github.

### On Master PR
For every PR against master, we spin up a server to build the project via node/webpack. We also lint the
project at this point (with more stringent error rules?). This will help us catch any errors in the code and
prevent any merges to master that will break

### Label Manager
This project defines the Github Labels in a [YAML file](https://github.com/devlinjunker/template.hapi.rest/blob/master/.github/labels.yaml) that is managed by the [Github Labeler Action](https://github.com/marketplace/actions/github-labeler). 
Any labels that are not defined in this file will be removed every time this action is run. **This does not affect PRs**

### On Merge to Master
Whenever we merge a PR to master, we want to update the documentation based on the changes the user made in
the commits. We run a git action to handle this as well:
 - Collect README files and update wiki
 - Fix/remove links in Wiki
 - Build documentation and generate commit
 

## Github Specific Files
Whenever a PR is made on Github, the body/description will be pre-populated with the contents in
`.github/PULL_REQUEST_TEMPLATE.md`


## Notes/Ideas
 - **IDEA:** Version increase/changelog generation
