/**
 * Returns an embed containing a title and description.
 * The title links to the commit url
 */

export default {
    message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
    embed: {
        title: "{{ commit.title }}",
        description: "{{ commit.description }}",
        url: "{{ commit.url }}"
    },
    extras: [{
        title: "View All Changes",
        url: "{{ github.context.payload.compare }}"
    }]
}