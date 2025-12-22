export const id = 399;
export const ids = [399];
export const modules = {

/***/ 4399:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a message and no embeds
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    message: "Successful commit to **{{ github.context.payload.repository.owner.name }}/{{ github.context.payload.repository.name}}**",
    embed: false,
    extras: [{
        title: "View All Changes",
        url: "{{ github.context.payload.compare }}"
    }]
});

/***/ })

};
