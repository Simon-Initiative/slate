// eslint-disable-next-line no-redeclare
export const SelectionTransforms = {
    collapse(editor, options) {
        editor.collapse(options);
    },
    deselect(editor) {
        editor.deselect();
    },
    move(editor, options) {
        editor.move(options);
    },
    select(editor, target) {
        editor.select(target);
    },
    setPoint(editor, props, options) {
        editor.setPoint(props, options);
    },
    setSelection(editor, props) {
        editor.setSelection(props);
    },
};
//# sourceMappingURL=selection.js.map