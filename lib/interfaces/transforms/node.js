// eslint-disable-next-line no-redeclare
export const NodeTransforms = {
    insertNodes(editor, nodes, options) {
        editor.insertNodes(nodes, options);
    },
    liftNodes(editor, options) {
        editor.liftNodes(options);
    },
    mergeNodes(editor, options) {
        editor.mergeNodes(options);
    },
    moveNodes(editor, options) {
        editor.moveNodes(options);
    },
    removeNodes(editor, options) {
        editor.removeNodes(options);
    },
    setNodes(editor, props, options) {
        editor.setNodes(props, options);
    },
    splitNodes(editor, options) {
        editor.splitNodes(options);
    },
    unsetNodes(editor, props, options) {
        editor.unsetNodes(props, options);
    },
    unwrapNodes(editor, options) {
        editor.unwrapNodes(options);
    },
    wrapNodes(editor, element, options) {
        editor.wrapNodes(element, options);
    },
};
//# sourceMappingURL=node.js.map