import { Transforms } from '../interfaces/transforms';
export const insertSoftBreak = editor => {
    Transforms.splitNodes(editor, { always: true });
};
//# sourceMappingURL=insert-soft-break.js.map