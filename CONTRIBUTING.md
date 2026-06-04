# Contributing Guide

## Git Flow Workflow

This project uses **Git Flow** branching model:

```
main ──────────────────────────────────────────────────►
  │                    ▲                    ▲
  │                    │                    │
  │              hotfix/                  release/
  │                    │                    │
  ▼                    │                    │
develop ───────────────┼────────────────────┘
  │                    │
  │              feature/
  │                    │
  ▼                    ▼
feature/* ─────────────┘
```

### Branch Types

| Branch | Prefix | Base | Merges To | Purpose |
|--------|--------|------|-----------|---------|
| Main | `main` | — | — | Production-ready code |
| Develop | `develop` | `main` | `main` (via release) | Integration branch |
| Feature | `feature/*` | `develop` | `develop` | New features |
| Bugfix | `bugfix/*` | `develop` | `develop` | Non-production bugs |
| Release | `release/*` | `develop` | `main` + `develop` | Release preparation |
| Hotfix | `hotfix/*` | `main` | `main` + `develop` | Production fixes |

## Getting Started

### Using the Helper Scripts

**PowerShell:**
```powershell
# Start a feature
.\git-flow.ps1 feature start JIRA-123

# Finish a feature (merges to develop)
.\git-flow.ps1 feature finish JIRA-123

# Start a release
.\git-flow.ps1 release start v1.2.0

# Finish a release (merges to main + develop, creates tag)
.\git-flow.ps1 release finish v1.2.0

# Start a hotfix
.\git-flow.ps1 hotfix start JIRA-456

# Finish a hotfix (merges to main + develop, creates tag)
.\git-flow.ps1 hotfix finish JIRA-456
```

**Bash/Zsh:**
```bash
# Same commands with ./git-flow.sh
./git-flow.sh feature start JIRA-123
./git-flow.sh feature finish JIRA-123
./git-flow.sh release start v1.2.0
./git-flow.sh release finish v1.2.0
./git-flow.sh hotfix start JIRA-456
./git-flow.sh hotfix finish JIRA-456
```

### Manual Commands

**Feature:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/JIRA-123
# ... work ...
git checkout develop
git pull origin develop
git merge --no-ff feature/JIRA-123
git push origin develop
git branch -d feature/JIRA-123
```

**Release:**
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0
# ... version bump, changelog ...
git checkout main
git pull origin main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0
git push origin main develop --tags
git branch -d release/v1.2.0
```

**Hotfix:**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/JIRA-456
# ... fix ...
git checkout main
git pull origin main
git merge --no-ff hotfix/JIRA-456
git tag -a v1.2.1-hotfix -m "Hotfix JIRA-456"
git checkout develop
git merge --no-ff hotfix/JIRA-456
git push origin main develop --tags
git branch -d hotfix/JIRA-456
```

## Branch Protection Rules

Configure in GitHub Settings → Branches:

### `main`
- Require PR review (1+ approvals)
- Require status checks (CI)
- Require linear history
- Include administrators

### `develop`
- Require PR review (1+ approvals)
- Require status checks (CI)
- Allow force pushes (for rebasing)

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`

Examples:
```
feat(auth): add OAuth2 login
fix(api): handle null response correctly
docs(readme): update installation steps
chore(deps): update dependencies
```

## Pull Requests

1. Use the appropriate PR template (feature/release/hotfix)
2. Keep PRs small and focused
3. Link related issues
4. Ensure CI passes
5. Request review from team member
6. Squash and merge (preferred) or merge commit

## Versioning

Follow [Semantic Versioning](https://semver.org/):
- `MAJOR` - Breaking changes
- `MINOR` - New features (backward compatible)
- `PATCH` - Bug fixes (backward compatible)

Tags: `v1.2.3`

## Release Process

1. Create `release/vX.Y.Z` from `develop`
2. Bump version, update CHANGELOG
3. Test in staging
4. PR to `main` → approve → merge
5. Tag created automatically
6. PR to `develop` → merge back
7. Deploy from `main` tag

## Hotfix Process

1. Create `hotfix/JIRA-XXX` from `main`
2. Fix issue, test
3. PR to `main` → approve → merge
4. Tag created (e.g., `v1.2.1-hotfix`)
5. PR to `develop` → merge back
6. Deploy from `main` tag

## Useful Aliases

Add to your `~/.gitconfig`:
```ini
[alias]
    # Flow shortcuts
    ff-start = "!f() { git checkout develop && git pull && git checkout -b feature/$1; }; f"
    ff-finish = "!f() { git checkout develop && git pull && git merge --no-ff feature/$1 && git branch -d feature/$1; }; f"
    rf-start = "!f() { git checkout develop && git pull && git checkout -b release/$1; }; f"
    rf-finish = "!f() { git checkout main && git pull && git merge --no-ff release/$1 && git tag -a v$1 -m \"Release $1\" && git checkout develop && git merge --no-ff release/$1 && git branch -d release/$1; }; f"
    hf-start = "!f() { git checkout main && git pull && git checkout -b hotfix/$1; }; f"
    hf-finish = "!f() { git checkout main && git pull && git merge --no-ff hotfix/$1 && git tag -a v$1-hotfix -m \"Hotfix $1\" && git checkout develop && git merge --no-ff hotfix/$1 && git branch -d hotfix/$1; }; f"
```