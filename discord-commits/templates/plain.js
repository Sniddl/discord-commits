/**
 * Returns a message and no embeds
 */

export default {
    message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
    embed: false,
    extras: [{
        title: "View All Changes",
        url: "{{ github.context.payload.compare }}"
    }]
}