/**
 * Returns an embed containing a title and description
 */

export default {
    message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
    embed: false,
    extras: [{
        title: "View Changes",
        url: "{{ github.context.payload.compare }}"
    }]
}