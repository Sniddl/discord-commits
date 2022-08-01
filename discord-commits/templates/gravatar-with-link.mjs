/**
 * Returns an embed containing a title and description.
 * The title links to the commit url
 * Includes author's name and gravatar.
 */

export default {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    url: "{{ commit.url }}",
    author: {
        name: "{{ commit.author.name }}",
        icon_url: "https://avatars.io/gravatar/{{ commit.author.email }}"
    }
}