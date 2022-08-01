/**
 * Returns an embed containing a title and description.
 * The title links to the commit url
 */

export default {
    title: "{{ commit.title }}",
    description: "{{ commit.description }}",
    url: "{{ commit.url }}"
}