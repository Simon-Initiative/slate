import { Transforms } from '../interfaces/transforms';
export const unsetNodes = (editor, props, options = {}) => {
    if (!Array.isArray(props)) {
        props = [props];
    }
    const obj = {};
    for (const key of props) {
        obj[key] = null;
    }
    Transforms.setNodes(editor, obj, options);
};
//# sourceMappingURL=unset-nodes.js.map