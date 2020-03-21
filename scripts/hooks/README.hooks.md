# Git Hooks

We use githooks([github](https://github.com/devlinjunker/template.node.hapi/tree/master/scripts/hooks)) to help clean up and enforce the workflow for developers. This is done with Husky.

**NOTE: We prevent commits to master branch on local machine (so all changes to master are PRs on github)**. You may want to disable this for more rapid local development, you can just remove the configuration in package.json([github](https://github.com/devlinjunker/template.node.hapi/blob/master/package.json#L30)) that adds these hooks.

## On commit
Before each commit, we want to verify that the build won't break. So we make sure to run the build process one more time with only the committed files before
letting the commit go through:

Process:
1. Stash uncommited changes
2. Run linting/flow/compliation and tests with npm/webpack
3. Pop uncommitted changes
