# Discord Action Commits

Notify Discord with all commits present in a payload. Customize layout by customizing templates.

## Example Appearance

Use markdown in your commit messages for nice formatting. As an example, [here is the
commit][commit] in picture.

![Imgur](https://imgur.com/YvLWWGL.jpg)

[commit]: https://github.com/Sniddl/discord-commits/commit/1e5aedd3f8bae8bb8272289cea173f2258e519e8

## Example Usage

This example will use the `avatar-with-link` template and include an extra embed that says "View All Changes". An embed will be created for every commit as long as the commit message does not start with "fix:" or "feat:". Any part of the footer appearing after the lines starting with tokens "Signed-off-by" or "Co-authored-by" will be removed. 

```yaml
- name: Discord Commits
  uses: Sniddl/discord-commits@v1.8
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    template: "avatar-with-link"
    include-extras: true
    exclude-commits: |
      ^fix:
      ^feat:
    include-footer: false
    note-keywords: |
      Signed-off-by
      Co-authored-by
```

## Variables inside templates

| Global Variable | Description |
|---|---|
| github | Access all data provided by GitHub such as payloads and commits. For example, the repository name. `{{ github.context.payload.repository.name }}`|
| env | Access all environment variables. For example, an environment variable called my_data. `{{ env.my_data }}` |
| commit | Access the data for the current commit. This will apply to ALL commits in the push event. If you do not want multiple commits see other options. Here's an example for commit data `{{ commit.author.name }}`|

## Required options

| Option | Description |
|---|---|
| webhook | The url for a Discord webhook. Store this as a secret otherwise you may receive unwanted spam in your discord. |

## Essential options

| Option | Description |
|---|---|
| template | The name of a premade template located into the discord-commits/templates folder.|
| message | The text message that appears on Discord. This would be the equivalent of typing a message.|
| embed | The template for each embed item. An embed item is shown for every commit message in the push event. There may be multiple commits per push. This can be prevented by enabling **last-commit-only** |

## Other Options

| Option | Description |
|---|---|
| include-extras   | Boolean - Include extra embeds from templates such as a link to the payload difference.|
| last-commit-only | Boolean - Only include the last commit.|
| include-commits | String - Include commits that match the regular expressions defined on each line.|
| exclude-commits | String - Exclude commits that match the regular expressions defined on each line.|
| include-footer | Boolean - Include the footer in `commit.description` as defined by `note-keywords`.|
| note-keywords | String - A list of additional footers such as `Signed-off-by` or `Co-authored-by`. Case insensitive.|

## Example commit payload
```js
{
   title: 'fix(api): handle null user session',
   description: 'Previously the API would panic when a session was missing.\n' +
     'This now returns a proper 401 response.\n' +
     '\n' +
     'Fixes: #214\n' +
     'Signed-off-by: Octocat <support@github.com>\n' +
     'Co-authored-by: Hubot <hubot@github.com>',
   url: 'https://github.com/Sniddl/discord-commits/commit/1',
   author: {
     name: 'Monalisa Octocat',
     email: 'support@github.com',
     date: '2011-04-14T16:00:49Z',
     username: 'monalisa'
   },
   committer: {
     name: 'Monalisa Octocat',
     email: 'support@github.com',
     date: '2011-04-14T16:00:49Z'
   },
   message: 'fix(api): handle null user session\n' +
     '\n' +
     'Previously the API would panic when a session was missing.\n' +
     'This now returns a proper 401 response.\n' +
     '\n' +
     'Fixes: #214\n' +
     'Signed-off-by: Octocat <support@github.com>\n' +
     'Co-authored-by: Hubot <hubot@github.com>',
   tree: {
     url: 'https://www.google.com',
     sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
   },
   comment_count: 0,
   verification: {
     verified: false,
     reason: 'unsigned',
     signature: null,
     payload: null
   },
   merge: null,
   revert: null,
   header: 'fix(api): handle null user session',
   body: 'Previously the API would panic when a session was missing.\n' +
     'This now returns a proper 401 response.',
   footer: 'Fixes: #214\n' +
     'Signed-off-by: Octocat <support@github.com>\n' +
     'Co-authored-by: Hubot <hubot@github.com>',
   notes: [
     { title: 'Signed-off-by', text: 'Octocat <support@github.com>' },
     { title: 'Co-authored-by', text: 'Hubot <hubot@github.com>' }
   ],
   mentions: [ 'github', 'github' ],
   references: [
     {
       raw: 'Fixes: #214',
       action: null,
       owner: null,
       repository: null,
       prefix: '#',
       issue: '214'
     }
   ],
   type: 'fix',
   scope: 'api',
   subject: 'handle null user session'
 }
```


## Resources

- [Github Context API][contextapi]
- [Discord Webhook API][discordapi]

[contextapi]: https://docs.github.com/en/actions/learn-github-actions/contexts
[discordapi]: https://discord.com/developers/docs/resources/webhook

## Predefined templates

Here are the defaults for each template. If you want to modify the values, you need to turn the JSON
into a string so it can be passed from the action environment to the script. See `.github/workflows/discord.yml` for a
commented out example.

## `plain`

Returns a message and no embeds

```js
{
    embed: false,
}
```

## `plain-author`

Returns embeds containing a title and description. Includes the author's name.

```js
{
  embed: {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    author: {
      name: "{{ commit.author.name }}"
    }
  }
}
```

## `simple-link`

Returns embeds containing a title and description. The title links to the commit url

```js
{
  embed: {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    url: "{{ commit.url }}"
  }
}
```

## `author-with-link`

Returns embeds containing a title and description. The title links to the commit url. Includes the
author's name

```js
embed: {
  title: "{{ commit.title }}",
  description: "{{ commit.description }}",
  url: "{{ commit.url }}",
  author: {
    name: "{{ commit.author.name }}"
  }
}
```

## `avatar-with-link`

Returns embeds containing a title and description. The title links to the commit url. Includes
author's name and GitHub avatar.

```js
embed: {
  title: "{{ commit.title }}",
  description: "{{ commit.description }}",
  url: "{{ commit.url }}",
  author: {
    name: "{{ commit.author.name }}",
    icon_url: "https://github.com/{{ commit.author.username }}.png"
  }
}
```

## Testing / Contributing

We suggest everyone uses a tool like [nektos/act] to test GitHub actions locally. This is the tool I
use so the directory structure will reflect that. If the following command does not pass, I will not
accept your PR.

1. Install act & Docker. See [nektos/act] for instructions.
1. From the root of the repo, ensure all the test cases say `sent` and that failing test cases do not show up in Discord:

```sh
bun run test
```

[nektos/act]: https://github.com/nektos/act
