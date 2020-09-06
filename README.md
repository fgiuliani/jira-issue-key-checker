# Jira Issue Key Checker - GitHub Action

Checks If a PR contains its linked Jira issue key in both the title and the description.

## Inputs

### `GITHUB_TOKEN`

**Required**

### `jira-prefix`

**Required** The Jira issue key prefix. Ex. ABC-1111, prefix would be ABC.

## Example usage

Create a workflow (eg: `.github/workflows/jira-issue-key-checker.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) to utilize the jira-issue-key-checker action with content:

```
name: "Jira Issue Key Checker"
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: fgiuliani/jira-issue-key-checker@v1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          jira-prefix: 'ABC'
```
