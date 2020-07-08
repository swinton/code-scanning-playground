# `code-scanning-playground`
> :wave: :earth_americas: a playground for **Code Scanning** :roller_coaster:

## Contents
- [About](#about)
- [How it works](#how-it-works)
- [Getting started](#getting-started)
- [Additional resources](#additional-resources)

## About
This is a template repo, demonstrating GitHub's [Code Scanning capability](https://docs.github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning), using ESLint to generate a "code scanning alert" in GitHub's Security tab:

![example](images/example.png)

## How it works
- The ESLint analysis workflow [runs on a schedule, and on every `push`](https://github.com/swinton/code-scanning-playground/blob/20366008d4376dd1899559fba0bf5fbbece109c3/.github/workflows/upload-sarif.yml#L3-L8)
- The ESLint output is [formatted as SARIF](https://github.com/swinton/code-scanning-playground/blob/20366008d4376dd1899559fba0bf5fbbece109c3/.github/workflows/upload-sarif.yml#L18-L20), using the [`@microsoft/eslint-formatter-sarif`](https://github.com/microsoft/sarif-sdk/tree/master/src/ESLint.Formatter#readme) package
- The SARIF report is submitted to GitHub via the [`github/codeql-action/upload-sarif`](https://github.com/github/codeql-action/tree/main/upload-sarif) action

## Getting started
1. Register for the code scanning beta [here](https://github.com/features/security/advanced-security/signup)
1. [Generate a copy of this repo](https://github.com/swinton/code-scanning-playground/generate)
1. Push a commit -- it can even be an empty commit (`git commit --allow-empty`)
1. Observe as a new security alert is generated

## Additional resources
- [SARIF example output](example.sarif.json)
- [`microsoft/sarif-tutorials`](https://github.com/microsoft/sarif-tutorials): User-friendly documentation for the SARIF file format
- [SARIF support for code scanning](https://docs.github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/sarif-support-for-code-scanning)
- [Example workflow that runs the ESLint analysis tool](https://docs.github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/uploading-a-sarif-file-to-github#example-workflow-that-runs-the-eslint-analysis-tool)
- REST API: https://docs.github.com/en/rest/reference/code-scanning
