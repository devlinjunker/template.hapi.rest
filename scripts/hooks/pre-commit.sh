#!/bin/sh
# Hook before commit message is requested from user
#   - Lint/Compile application to make sure we don't commit bad code

# For testing what is set by Husky
# echo $HUSKY_GIT_PARAMS;
CURRENT_BRANCH=`git branch | grep \* | cut -d' ' -f2`;

## All Branches
# TODO: stash any unsaved changes and then pop after running all these tests? That way uncommited changes won't affect tests
# Run linting tests
npm run lint;
# Compile application and check for errors (this also runs tests in server build)
npm run build;


# Note: This only works if we merge locally (don't use github PRs)
#   Will need to look into github actions to run these on PR branches before merge
if [[ "$CURRENT_BRANCH" == "master" ]]; then
  # TODO: Run tests only on master?

  # Build docs
  npm run doc;
  git add docs;

  # TODO: Check for spec files (unless code file has ignore-spec header)

  # TODO: Check for README in every directory

  # TODO: Semantic Versioning?
fi


# TODO: If release branch, then increment patch version in package.json
