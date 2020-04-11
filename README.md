# Discord Action Commits
GitHub Action for Discord that prints commit messages based on templates.


## Example Appearence:

![Imgur](https://imgur.com/YvLWWGL.jpg)


<hr/>

## Example Usage

```yaml
- name: Discord Commits
        uses: Sniddl/discord-commits@v1.2
        with:
          webhook: ${{ secrets.DISCORD_WEBHOOK }}
          message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**.\nDiff: {{ github.context.payload.compare }}"
          embed: '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }'
```

## Variables

All variables available through GitHub such as payloads and commits can be accessed via `{{ github }}`. As an example, the repository name can be accessed by `{{ github.context.payload.repository.name }}`

Environment variables can be accessed by `{{ env }}`. Example, `{{ env.mycustomdata.somepath }}`

Commits are automatically looped over at displayed as embed objects. The data for each commit is scoped under `{{ commit }}` in the `embed` input template. Example, commmit author name is `{{ commit.author.name }}`


