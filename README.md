# Amalie
A bitbucket pull request visualiser

## What does it do?
It is a simple node.js server which returns an HTML page showing a list of these BitBucket users which are either the author
of an open pull request or are assigned as reviewers to a pull request.

## Usage

### Basic Configuration
Enter the URL of your BitBucket server and the credentials of a BitBucket user (give it read-only rights) into the `.env` file
and fire it up.

### How can I specify which repositories it is pulling the pull requests from?
Amalie will show all pull requests from all repositories to which the configured BitBucket user has access rights.

## Motivation
I want have an overview of all authors and reviewers on our build/status monitor. Since it is running on a relatively small
screen simply showing the default pull request view of BitBucket itself is not going cut it.
In addition to that I was looking for a reason to play with the [folktale task](http://folktale.origamitower.com/api/v2.0.0/en/folktale.concurrency.task.html)
abstraction.

## Why is it called Amalie

Amalie is one of the middle names of [Empress Elisabeth of Austria](https://en.wikipedia.org/wiki/Empress_Elisabeth_of_Austria).
All my work-related projects are named after either her ([sissi](https://github.com/kyusu/sissi)) or after people closed to
her ([sophie](https://github.com/kyusu/sophie)).
