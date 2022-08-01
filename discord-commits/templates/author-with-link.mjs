/**
 * Returns an embed containing a title and description.
 * The title links to the commit url.
 * Includes the author's name
 */

export default {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    url: "{{ commit.url }}",
    author: {
        name: "{{ commit.author.name }}"
    }
}