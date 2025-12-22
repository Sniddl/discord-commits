export const id = 447;
export const ids = [447];
export const modules = {

/***/ 6447:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns an embed containing a title and description.
 * Includes the author's name.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
    embed: {
        title: "{{ commit.title }}",
        description: "{{ commit.description }}",
        author: {
            name: "{{ commit.author.name }}"
        }
    },
    extras: [{
        title: "View All Changes",
        url: "{{ github.context.payload.compare }}"
    }]
});

/***/ })

};
