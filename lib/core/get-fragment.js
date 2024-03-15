import { Node } from '../interfaces';
export const getFragment = editor => {
    const { selection } = editor;
    if (selection) {
        return Node.fragment(editor, selection);
    }
    return [];
};
//# sourceMappingURL=get-fragment.js.map