import { Transforms } from '../interfaces/transforms';
export const insertBreak = editor => {
    Transforms.splitNodes(editor, { always: true });
};
//# sourceMappingURL=insert-break.js.map