# Discord Action Commits

Notify Discord with all commits present in a payload. Customize layout by customizing templates.

## Example Appearance

Use markdown in your commit messages for nice formatting. As an example, [here is the
commit][commit] in picture.

![Imgur](https://imgur.com/YvLWWGL.jpg)

[commit]: https://github.com/Sniddl/discord-commits/commit/1e5aedd3f8bae8bb8272289cea173f2258e519e8

## Example Usage

```yaml
- name: Discord Commits
  uses: Sniddl/discord-commits@v1.6
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    template: 'avatar-with-link'
    include-extras: true
```

## Variables inside templates

| Global Variable | Description                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| github          | Access all data provided by GitHub such as payloads and commits. For example, the repository name. `{{ github.context.payload.repository.name }}`                                                             |
| env             | Access all environment variables. For example, an environment variable called my_data. `{{ env.my_data }}`                                                                                                    |
| commit          | Access the data for the current commit. This will apply to ALL commits in the push event. If you do not want multiple commits see other options. Here's an example for commit data `{{ commit.author.name }}` |

## Required options

| Option  | Description                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| webhook | The url for a Discord webhook. Store this as a secret otherwise you may receive unwanted spam in your discord. |

## Essential options

| Option   | Description                                                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template | The name of a premade template located into the discord-commits/templates folder.                                                                                                                   |
| message  | The text message that appears on Discord. This would be the equivalent of typing a message.                                                                                                         |
| embed    | The template for each embed item. An embed item is shown for every commit message in the push event. There may be multiple commits per push. This can be prevented by enabling **last-commit-only** |

## Other Options

| Option           | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| include-extras   | Boolean - Include extra embeds from templates such as a link to the payload difference. |
| last-commit-only | Boolean - Only include the last commit.                                                 |

## Resources

- [Github Context API][contextapi]
- [Discord Webhook API][discordapi]

[contextapi]: https://docs.github.com/en/actions/learn-github-actions/contexts
[discordapi]: https://discord.com/developers/docs/resources/webhook

## Predefined templates

Here are the defaults for each template. If you want to modify the values, you need to turn the JSON
into a string so it can be passed from the action environment to the script.  See main.yml for a
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

1. Install act. See [nektos/act] for instructions.
1. `cp secrets.env.example tests/secrets.env`. Open `tests/secrets.env` and paste your discord
   webhook url into the value for `DISCORD_WEBHOOK`.
1. From the root of the repo, make sure the following command passes:

   ```sh
   ./tests/deploy/test.sh
   ```

[nektos/act]: https://github.com/nektos/act
