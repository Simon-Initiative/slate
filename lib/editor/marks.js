import { Editor } from '../interfaces/editor';
import { Range } from '../interfaces/range';
import { Path } from '../interfaces/path';
import { Text } from '../interfaces/text';
import { Element } from '../interfaces/element';
export const marks = (editor, options = {}) => {
    const { marks, selection } = editor;
    if (!selection) {
        return null;
    }
    let { anchor, focus } = selection;
    if (marks) {
        return marks;
    }
    if (Range.isExpanded(selection)) {
        /**
         * COMPAT: Make sure hanging ranges (caused by double clicking in Firefox)
         * do not adversely affect the returned marks.
         */
        const isEnd = Editor.isEnd(editor, anchor, anchor.path);
        if (isEnd) {
            const after = Editor.after(editor, anchor);
            if (after) {
                anchor = after;
            }
        }
        const [match] = Editor.nodes(editor, {
            match: Text.isText,
            at: {
                anchor,
                focus,
            },
        });
        if (match) {
            const [node] = match;
            const { text, ...rest } = node;
            return rest;
        }
        else {
            return {};
        }
    }
    const { path } = anchor;
    let [node] = Editor.leaf(editor, path);
    if (anchor.offset === 0) {
        const prev = Editor.previous(editor, { at: path, match: Text.isText });
        const markedVoid = Editor.above(editor, {
            match: n => Element.isElement(n) &&
                Editor.isVoid(editor, n) &&
                editor.markableVoid(n),
        });
        if (!markedVoid) {
            const block = Editor.above(editor, {
                match: n => Element.isElement(n) && Editor.isBlock(editor, n),
            });
            if (prev && block) {
                const [prevNode, prevPath] = prev;
                const [, blockPath] = block;
                if (Path.isAncestor(blockPath, prevPath)) {
                    node = prevNode;
                }
            }
        }
    }
    const { text, ...rest } = node;
    return rest;
};
//# sourceMappingURL=marks.js.map