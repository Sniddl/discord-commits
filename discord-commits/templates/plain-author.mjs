/**
 * Returns an embed containing a title and description.
 * Includes the author's name.
 */

export default {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    author: {
        name: "{{ commit.author.name }}"
    }
}