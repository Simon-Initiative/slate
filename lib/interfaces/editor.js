import { isEditor } from '../editor/is-editor';
// eslint-disable-next-line no-redeclare
export const Editor = {
    above(editor, options) {
        return editor.above(options);
    },
    addMark(editor, key, value) {
        editor.addMark(key, value);
    },
    after(editor, at, options) {
        return editor.after(at, options);
    },
    before(editor, at, options) {
        return editor.before(at, options);
    },
    deleteBackward(editor, options = {}) {
        const { unit = 'character' } = options;
        editor.deleteBackward(unit);
    },
    deleteForward(editor, options = {}) {
        const { unit = 'character' } = options;
        editor.deleteForward(unit);
    },
    deleteFragment(editor, options) {
        editor.deleteFragment(options);
    },
    edges(editor, at) {
        return editor.edges(at);
    },
    elementReadOnly(editor, options = {}) {
        return editor.elementReadOnly(options);
    },
    end(editor, at) {
        return editor.end(at);
    },
    first(editor, at) {
        return editor.first(at);
    },
    fragment(editor, at) {
        return editor.fragment(at);
    },
    hasBlocks(editor, element) {
        return editor.hasBlocks(element);
    },
    hasInlines(editor, element) {
        return editor.hasInlines(element);
    },
    hasPath(editor, path) {
        return editor.hasPath(path);
    },
    hasTexts(editor, element) {
        return editor.hasTexts(element);
    },
    insertBreak(editor) {
        editor.insertBreak();
    },
    insertFragment(editor, fragment, options) {
        editor.insertFragment(fragment, options);
    },
    insertNode(editor, node) {
        editor.insertNode(node);
    },
    insertSoftBreak(editor) {
        editor.insertSoftBreak();
    },
    insertText(editor, text) {
        editor.insertText(text);
    },
    isBlock(editor, value) {
        return editor.isBlock(value);
    },
    isEdge(editor, point, at) {
        return editor.isEdge(point, at);
    },
    isEditor(value) {
        return isEditor(value);
    },
    isElementReadOnly(editor, element) {
        return editor.isElementReadOnly(element);
    },
    isEmpty(editor, element) {
        return editor.isEmpty(element);
    },
    isEnd(editor, point, at) {
        return editor.isEnd(point, at);
    },
    isInline(editor, value) {
        return editor.isInline(value);
    },
    isNormalizing(editor) {
        return editor.isNormalizing();
    },
    isSelectable(editor, value) {
        return editor.isSelectable(value);
    },
    isStart(editor, point, at) {
        return editor.isStart(point, at);
    },
    isVoid(editor, value) {
        return editor.isVoid(value);
    },
    last(editor, at) {
        return editor.last(at);
    },
    leaf(editor, at, options) {
        return editor.leaf(at, options);
    },
    levels(editor, options) {
        return editor.levels(options);
    },
    marks(editor) {
        return editor.getMarks();
    },
    next(editor, options) {
        return editor.next(options);
    },
    node(editor, at, options) {
        return editor.node(at, options);
    },
    nodes(editor, options) {
        return editor.nodes(options);
    },
    normalize(editor, options) {
        editor.normalize(options);
    },
    parent(editor, at, options) {
        return editor.parent(at, options);
    },
    path(editor, at, options) {
        return editor.path(at, options);
    },
    pathRef(editor, path, options) {
        return editor.pathRef(path, options);
    },
    pathRefs(editor) {
        return editor.pathRefs();
    },
    point(editor, at, options) {
        return editor.point(at, options);
    },
    pointRef(editor, point, options) {
        return editor.pointRef(point, options);
    },
    pointRefs(editor) {
        return editor.pointRefs();
    },
    positions(editor, options) {
        return editor.positions(options);
    },
    previous(editor, options) {
        return editor.previous(options);
    },
    range(editor, at, to) {
        return editor.range(at, to);
    },
    rangeRef(editor, range, options) {
        return editor.rangeRef(range, options);
    },
    rangeRefs(editor) {
        return editor.rangeRefs();
    },
    removeMark(editor, key) {
        editor.removeMark(key);
    },
    setNormalizing(editor, isNormalizing) {
        editor.setNormalizing(isNormalizing);
    },
    start(editor, at) {
        return editor.start(at);
    },
    string(editor, at, options) {
        return editor.string(at, options);
    },
    unhangRange(editor, range, options) {
        return editor.unhangRange(range, options);
    },
    void(editor, options) {
        return editor.void(options);
    },
    withoutNormalizing(editor, fn) {
        editor.withoutNormalizing(fn);
    },
};
//# sourceMappingURL=editor.js.map