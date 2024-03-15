import { Transforms } from '../interfaces/transforms';
import { Range } from '../interfaces/range';
export const deleteBackward = (editor, unit) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
        Transforms.delete(editor, { unit, reverse: true });
    }
};
//# sourceMappingURL=delete-backward.js.map