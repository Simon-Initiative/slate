import { Text } from '../interfaces/text';
import { Range } from '../interfaces/range';
import { Transforms } from '../interfaces/transforms';
import { FLUSHING } from '../utils/weak-maps';
import { Editor } from '../interfaces/editor';
export const removeMark = (editor, key) => {
    const { selection } = editor;
    if (selection) {
        const match = (node, path) => {
            if (!Text.isText(node)) {
                return false; // marks can only be applied to text
            }
            const [parentNode, parentPath] = Editor.parent(editor, path);
            return !editor.isVoid(parentNode) || editor.markableVoid(parentNode);
        };
        const expandedSelection = Range.isExpanded(selection);
        let markAcceptingVoidSelected = false;
        if (!expandedSelection) {
            const [selectedNode, selectedPath] = Editor.node(editor, selection);
            if (selectedNode && match(selectedNode, selectedPath)) {
                const [parentNode] = Editor.parent(editor, selectedPath);
                markAcceptingVoidSelected =
                    parentNode && editor.markableVoid(parentNode);
            }
        }
        if (expandedSelection || markAcceptingVoidSelected) {
            Transforms.unsetNodes(editor, key, {
                match,
                split: true,
                voids: true,
            });
        }
        else {
            const marks = { ...(Editor.marks(editor) || {}) };
            delete marks[key];
            editor.marks = marks;
            if (!FLUSHING.get(editor)) {
                editor.onChange();
            }
        }
    }
};
//# sourceMappingURL=remove-mark.js.map