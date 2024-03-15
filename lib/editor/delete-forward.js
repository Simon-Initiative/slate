import { Transforms } from '../interfaces/transforms';
import { Range } from '../interfaces/range';
export const deleteForward = (editor, unit) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
        Transforms.delete(editor, { unit });
    }
};
//# sourceMappingURL=delete-forward.js.map