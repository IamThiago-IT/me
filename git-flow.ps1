#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Git Flow helper script for PowerShell
.DESCRIPTION
    Provides git-flow commands without requiring the git-flow CLI tool
.EXAMPLE
    .\git-flow.ps1 feature start JIRA-123
    .\git-flow.ps1 feature finish JIRA-123
    .\git-flow.ps1 release start v1.0.0
    .\git-flow.ps1 release finish v1.0.0
    .\git-flow.ps1 hotfix start JIRA-456
    .\git-flow.ps1 hotfix finish JIRA-456
#>

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet('feature', 'release', 'hotfix', 'bugfix')]
    $type,

    [Parameter(Mandatory=$true, Position=1)]
    [ValidateSet('start', 'finish', 'publish', 'pull')]
    $action,

    [Parameter(Mandatory=$true, Position=2)]
    $name
)

$ErrorActionPreference = "Stop"

function Get-Prefix {
    param($type)
    switch ($type) {
        'feature' { return 'feature/' }
        'release' { return 'release/' }
        'hotfix'  { return 'hotfix/' }
        'bugfix'  { return 'bugfix/' }
    }
}

function Get-BaseBranch {
    param($type)
    switch ($type) {
        'feature' { return 'develop' }
        'release' { return 'develop' }
        'hotfix'  { return 'main' }
        'bugfix'  { return 'develop' }
    }
}

function Get-MergeTargets {
    param($type)
    switch ($type) {
        'feature' { return @('develop') }
        'release' { return @('main', 'develop') }
        'hotfix'  { return @('main', 'develop') }
        'bugfix'  { return @('develop') }
    }
}

$prefix = Get-Prefix $type
$baseBranch = Get-BaseBranch $type
$mergeTargets = Get-MergeTargets $type
$branchName = "$prefix$name"

switch ($action) {
    'start' {
        Write-Host "Starting $type '$name' from $baseBranch..." -ForegroundColor Green
        git checkout $baseBranch
        git pull origin $baseBranch
        git checkout -b $branchName
        Write-Host "Branch '$branchName' created. Start working!" -ForegroundColor Green
    }

    'finish' {
        Write-Host "Finishing $type '$name'..." -ForegroundColor Green
        $currentBranch = git branch --show-current
        if ($currentBranch -ne $branchName) {
            Write-Error "You must be on branch '$branchName' to finish it. Current: $currentBranch"
            exit 1
        }

        # Commit any pending changes
        if (-not (git diff --quiet)) {
            git add -A
            git commit -m "chore: finish $type $name"
        }

        foreach ($target in $mergeTargets) {
            Write-Host "Merging into $target..." -ForegroundColor Yellow
            git checkout $target
            git pull origin $target
            git merge --no-ff $branchName -m "Merge $type '$name' into $target"
        }

        # Tag for releases and hotfixes
        if ($type -in @('release', 'hotfix')) {
            $tagName = if ($type -eq 'release') { "v$name" } else { "v$name-hotfix" }
            git tag -a $tagName -m "$type $name"
            Write-Host "Tagged as $tagName" -ForegroundColor Green
        }

        # Delete local branch
        git branch -d $branchName
        Write-Host "$type '$name' finished and merged!" -ForegroundColor Green
    }

    'publish' {
        Write-Host "Publishing $type '$name' to origin..." -ForegroundColor Green
        git push -u origin $branchName
    }

    'pull' {
        Write-Host "Pulling $type '$name' from origin..." -ForegroundColor Green
        git checkout $branchName
        git pull origin $branchName
    }
}