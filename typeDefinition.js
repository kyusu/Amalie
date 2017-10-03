/**
 * @typedef {{values: Array}} ObjectWithValues
 * @interface
 */

/**
 * @typedef {{href: string}} Link
 */

/**
 * @typedef {{href: string, name: string}} NamedLink
 */

/**
 * @typedef {{self: Array.<Link>}} SelfLinks
 */

/**
 * @typedef {{name: string, emailAddress: string, id: number, displayName: string, active: boolean, slug: string, type: string, links: SelfLinks}} User
 */

/**
 * @typedef {{user: User, role: string, approved: boolean, status: string}} Author
 */

/**
 * @typedef {{id: string, displayId: string, lastestCommit: string, repository: Repo}} Ref
 */

/**
 * @typedef {{user: User, role: string, approved: boolean, status: string, lastReviewCommit: ?string}} Reviewer
 */

/**
 * @typedef {{openTaskCount: number, resolvedTaskCount: number}} PullRequestProperties
 */

/**
 * @typedef {{id: number, version: number, title: string, state: string, open: boolean, closed: boolean, createdDate: number, updatedDate: number, fromRef: Ref, toRef: Ref, locked: boolean, author: Author, reviewers: Array.<Reviewer>, participants: Array, links: SelfLinks, properties: PullRequestProperties}} PullRequest
 */

/**
 * @typedef {{size: number, limit: number, isLastPage: boolean, start: number, values: Array.<PullRequest>}} RepoPullRequests
 * @extends {ObjectWithValues}
 */

/**
 * @typedef {{key: string, id: number, name: string, public: boolean, type: string, links: SelfLinks}} Project
 */

/**
 * @typedef {{size: number, limit: number, isLastPage: boolean, start: number, values: Array.<Project>}} Projects
 * @extends {ObjectWithValues}
 */

/**
 * @typedef {{clone: Array.<NamedLink>, self: Array.<Link>}} RepoLinks
 */

/**
 * @typedef {{slug: string, id: number, name: string, scmId: string, state: string, statusMessage: string, forkable: boolean, project: Project, public: boolean, links: RepoLinks}} Repo
 */

/**
 * @typedef {{size: number, limit: number, isLastPage: boolean, values: Array.<Repo>, start: number}} ProjectRepos
 * @extends {ObjectWithValues}
 */

/**
 * @typedef {{slug: string, projectKey: string}} RepoKey
 */

/**
 * @typedef {{title: string}} PullRequestInfo
 */

/**
 * @typedef {{name: string, pullRequestsToReview: ?Array.<PullRequestInfo>, pullRequestsAuthored: ?Array.<PullRequestInfo>}} PullRequestParticipant
 */

/**
 * @typedef {Object.<string, {pullRequestsAuthored: ?Array.<PullRequestInfo>, pullRequestsToReview: ?Array.<PullRequestInfo}>} PullRequestAccumulator
 */

/**
 * @typedef {{username: string, password: string, server: string}} LoginData
 */
