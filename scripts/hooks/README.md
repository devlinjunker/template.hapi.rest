# Git Hooks

We use githooks to help clean up and enforce the workflow for developers.

**NOTE: Prevented commits to master branch on local machine (so all changes to master are PRs)**

## On commit
1. Stash uncommited changes
2. Run linting/flow/compliation and tests with npm/webpack
3. Pop uncommitted changes



