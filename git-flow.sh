#!/usr/bin/env bash
# Git Flow helper script for Bash/Zsh
# Usage: ./git-flow.sh feature start JIRA-123
#        ./git-flow.sh feature finish JIRA-123
#        ./git-flow.sh release start v1.0.0
#        ./git-flow.sh release finish v1.0.0
#        ./git-flow.sh hotfix start JIRA-456
#        ./git-flow.sh hotfix finish JIRA-456

set -euo pipefail

TYPE="${1:-}"
ACTION="${2:-}"
NAME="${3:-}"

if [[ -z "$TYPE" || -z "$ACTION" || -z "$NAME" ]]; then
    echo "Usage: $0 <feature|release|hotfix|bugfix> <start|finish|publish|pull> <name>"
    exit 1
fi

get_prefix() {
    case "$1" in
        feature) echo "feature/" ;;
        release) echo "release/" ;;
        hotfix)  echo "hotfix/"  ;;
        bugfix)  echo "bugfix/"  ;;
    esac
}

get_base_branch() {
    case "$1" in
        feature) echo "develop" ;;
        release) echo "develop" ;;
        hotfix)  echo "main"    ;;
        bugfix)  echo "develop" ;;
    esac
}

get_merge_targets() {
    case "$1" in
        feature) echo "develop" ;;
        release) echo "main develop" ;;
        hotfix)  echo "main develop" ;;
        bugfix)  echo "develop" ;;
    esac
}

PREFIX=$(get_prefix "$TYPE")
BASE_BRANCH=$(get_base_branch "$TYPE")
MERGE_TARGETS=$(get_merge_targets "$TYPE")
BRANCH_NAME="${PREFIX}${NAME}"

case "$ACTION" in
    start)
        echo "Starting $TYPE '$NAME' from $BASE_BRANCH..."
        git checkout "$BASE_BRANCH"
        git pull origin "$BASE_BRANCH"
        git checkout -b "$BRANCH_NAME"
        echo "Branch '$BRANCH_NAME' created. Start working!"
        ;;

    finish)
        echo "Finishing $TYPE '$NAME'..."
        CURRENT_BRANCH=$(git branch --show-current)
        if [[ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]]; then
            echo "Error: You must be on branch '$BRANCH_NAME' to finish it. Current: $CURRENT_BRANCH"
            exit 1
        fi

        # Commit any pending changes
        if ! git diff --quiet; then
            git add -A
            git commit -m "chore: finish $TYPE $NAME"
        fi

        for TARGET in $MERGE_TARGETS; do
            echo "Merging into $TARGET..."
            git checkout "$TARGET"
            git pull origin "$TARGET"
            git merge --no-ff "$BRANCH_NAME" -m "Merge $TYPE '$NAME' into $TARGET"
        done

        # Tag for releases and hotfixes
        if [[ "$TYPE" == "release" || "$TYPE" == "hotfix" ]]; then
            if [[ "$TYPE" == "release" ]]; then
                TAG_NAME="v$NAME"
            else
                TAG_NAME="v$NAME-hotfix"
            fi
            git tag -a "$TAG_NAME" -m "$TYPE $NAME"
            echo "Tagged as $TAG_NAME"
        fi

        # Delete local branch
        git branch -d "$BRANCH_NAME"
        echo "$TYPE '$NAME' finished and merged!"
        ;;

    publish)
        echo "Publishing $TYPE '$NAME' to origin..."
        git push -u origin "$BRANCH_NAME"
        ;;

    pull)
        echo "Pulling $TYPE '$NAME' from origin..."
        git checkout "$BRANCH_NAME"
        git pull origin "$BRANCH_NAME"
        ;;

    *)
        echo "Unknown action: $ACTION"
        exit 1
        ;;
esac