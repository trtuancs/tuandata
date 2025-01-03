---
title: Perfect git commit message
author: Tuan Data
publishDate: 3 Jan 2025
updatedDate: 3 Jan 2025
description: Learn how to write perfect Git commit messages to improve your skills, create clear commit histories, and enhance collaboration.
tags: [git]
draft: false
# ogImage: /social-card.png
coverImage:
    src: "git-commit.png"
    alt: "Illustration of a Git commit message"
#! TODO
---
When using Git to manage source code, a crucial and indispensable task every time we make changes to the source code is committing those changes, 
accompanied by writing commit messages.
These commit messages provide an overview of the changes made in each commit.

In this post, I’ll guide you through the art of writing the perfect Git commit message.
My goal is to help you enhance your Git skills and make your commit history clearer, more professional, and easier to collaborate with.

## Why should we write clean commit message?

> A good commit shows whether a developer is a good collaborator (Peter Hutterer, Linux)

As Peter Hutterer mentioned, for a professional developer, not only is writing clean code essential, 
but crafting clean commit messages is equally important. Here are a few benefits of writing clean commit messages:
- Makes it easier for code reviewers to understand the changes in the source code.
- Simplifies tracking past changes in the source code.


## How to write a good commit message

### Simple commits
For commits that involve minimal changes to the source code or simple updates, you can use the following structure:

```bash title="Structure simple commit message"
git commit -m "[<Task ID>] <Commit type>: message"
```

Example:
```bash title="Example simple commit message"
git commit -m "[DATA-181] fix: Resolve connection issue with Google Storage in daily Citus pipeline ingestion"
```

### Complex commits

The structure of a commit message should consist of two part: Subject and Body.

```bash title="Structure commit message"
git commit -m "Subject

Body"
```
Example: 

```bash title="Example git commit message"
git commit -m "Fix bug in user authentication process

- Resolved an issue where users with special characters in their email addresses were unable to log in.
- Updated the validation logic to correctly handle these cases and added test cases to cover this scenario.
- This fix improves the overall user experience and ensures compatibility with a wider range of email formats."
```

#### Tips for writing a good subject line

When crafting the subject line of a commit message, consider the following tips to ensure it is effective and informative:

##### 1. Be concise
Aim for clarity and brevity. Keep the subject line under 50 characters to make it easy to read at a glance.

##### 2. Use imperative mood
Write the subject line as a command, starting with a verb. For example, use "Fix" instead of "Fixed" or "Fixes."

##### 3. Focus on the change
Clearly state what the commit does, highlighting the most critical information without unnecessary details.

##### 4. Avoid periods
Do not add a period at the end of the subject line. This keeps the format clean and aligns with common practices.

##### 5. Capitalize the First Letter
Only capitalize the first letter of the subject line to maintain a consistent and professional appearance.

#### Tips for writing good body lines

The body of a commit message provides essential details about the changes made, offering context and clarity for future reference.
Here are some tips to write an effective commit message body:

##### 1. Explain the "Why," not just the "What"
The body should go beyond describing the changes. Explain why the changes were necessary and the problem they solve.

##### 2. Be detailed but concise
Include enough information to understand the reasoning behind the commit, but avoid overly long explanations. Stick to the key points.

##### 3. Use proper formatting
Break the body into short paragraphs or use bullet points for multiple changes. This improves readability and makes it easier to scan.

##### 4. Reference related issues or tickets
Link the commit to related issues or tasks in your project management system by mentioning their identifiers (e.g., Fixes #123 or Relates to #456).

## References
[1] [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)