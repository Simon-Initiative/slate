import { Range } from '../interfaces/range';
import { Transforms } from '../interfaces/transforms';
export const deleteFragment = (editor, { direction = 'forward' } = {}) => {
    const { selection } = editor;
    if (selection && Range.isExpanded(selection)) {
        Transforms.delete(editor, { reverse: direction === 'backward' });
    }
};
//# sourceMappingURL=delete-fragment.js.map