import { Node } from '../interfaces/node';
import { Editor } from '../interfaces/editor';
import { Element } from '../interfaces/element';
export function* levels(editor, options = {}) {
    const { at = editor.selection, reverse = false, voids = false } = options;
    let { match } = options;
    if (match == null) {
        match = () => true;
    }
    if (!at) {
        return;
    }
    const levels = [];
    const path = Editor.path(editor, at);
    for (const [n, p] of Node.levels(editor, path)) {
        if (!match(n, p)) {
            continue;
        }
        levels.push([n, p]);
        if (!voids && Element.isElement(n) && Editor.isVoid(editor, n)) {
            break;
        }
    }
    if (reverse) {
        levels.reverse();
    }
    yield* levels;
}
//# sourceMappingURL=levels.js.map