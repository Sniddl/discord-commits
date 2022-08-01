# Discord Action Commits

GitHub Action for Discord that prints multiple commit messages based on a single template. Reuse this action across projects to maintain a consistent format.

## Example Appearance:

Put Discord chat syntax (markdown) in your commit messages for nice formatting. As an example, here is a link to commit in picture. https://github.com/Sniddl/discord-commits/commit/1e5aedd3f8bae8bb8272289cea173f2258e519e8

![Imgur](https://imgur.com/YvLWWGL.jpg)

<hr/>

## Example Usage

```yaml
- name: Discord Commits
        uses: Sniddl/discord-commits@v1.3
        with:
          webhook: ${{ secrets.DISCORD_WEBHOOK }}
          message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**.\nDiff: {{ github.context.payload.compare }}"
          embed: '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }'
          last-commit-only: false
```

## Variables inside templates

**`{{ github }}`** - Access all data provided by GitHub such as payloads and commits. Here is how you would access the repository name. `{{ github.context.payload.repository.name }}`

**`{{ env }}`** - Access all environment variables. Here is how you would access an environment variable called my_data. `{{ env.my_data }}`

**`{{ commit }}`** - Access the data for the current commit. This will apply to ALL commits in the push event. If you do not want multiple commits see other options. Here's an example for commit data `{{ commit.author.name }}`

## Required options

**webhook** - The url for a Discord webhook. Store this as a secret otherwise you may receive unwanted spam in your discord.

## Essential options

**message** - The text message that appears on Discord. This would be the equivalent of typing a message.

**embed** - The template for each embed item. An embed item is shown for every commit message in the push event. There may be multiple commits per push. This can be prevented by enabling **last-commit-only**

## Other options

**last-commit-only** - Self explanatory. Only show the last commit in the push event. All other commits will be

---

## Testing / Contributing.

We suggest everyone uses a tool like https://github.com/nektos/act to test GitHub actions locally. This is the tool I use so the directory structure will reflect that. If the following command does not pass, I will not accept your PR.

1. install act see https://github.com/nektos/act for instructions.
1. `cp .env.example .env` paste discord commit url into .env
1. make sure the following command passes.

```
act -W tests/workflows -e tests/push.json
```

## Goals

- [ ] Fix all issues.
- [ ] Create option for max number of commits.
- [ ] Better testing.
- [ ] Better README structure/information.


