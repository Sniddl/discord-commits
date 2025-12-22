export const id = 886;
export const ids = [886];
export const modules = {

/***/ 4886:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns an embed containing a title and description.
 * The title links to the commit url
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
});

/***/ })

};
