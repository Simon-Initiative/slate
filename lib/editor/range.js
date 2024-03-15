import { Editor } from '../interfaces/editor';
import { Range } from '../interfaces/range';
export const range = (editor, at, to) => {
    if (Range.isRange(at) && !to) {
        return at;
    }
    const start = Editor.start(editor, at);
    const end = Editor.end(editor, to || at);
    return { anchor: start, focus: end };
};
//# sourceMappingURL=range.js.map