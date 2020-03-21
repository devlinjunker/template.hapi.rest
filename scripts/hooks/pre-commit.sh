#!/bin/sh
# Hook before commit message is requested from user
#   - Lint/Compile application to make sure we don't commit bad code

# For testing what is set by Husky
# echo $HUSKY_GIT_PARAMS;
CURRENT_BRANCH=`git branch | grep \* | cut -d' ' -f2`;

## All Branches

# stash any unsaved changes and then pop after running all the tests. That way uncommited changes won't affect tests
git stash save -k "githook uncommitted changes";

# Run linting tests
npm run lint;
# Compile application and check for errors (this also runs tests in server build)
npm run build;

git stash pop;

# This should prevent us from making any commits to master branch
if [[ "$CURRENT_BRANCH" == "master" ]]; then
  echo "No commiting to the master branch"
  exit 123545;
fi
