#!/bin/sh
# Hook before commit message is requested from user

CURRENT_BRANCH=`git branch | grep \* | cut -d' ' -f2`;

# This should prevent us from making any commits to master branch
if [[ "$CURRENT_BRANCH" == "master" ]]; then
  echo "\n\nNo commiting to the master branch!\n\n";
  exit 123545;
fi

## All Branches
#   - Compile application to make sure we don't commit bad code

# stash any unsaved changes and then pop after running all the tests. That way uncommited changes won't affect tests
git stash save -k "githook uncommitted changes";

# Compile application and check for errors (this also runs tests in server build)
npm run build;

git stash pop;
