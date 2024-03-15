import { isPlainObject } from 'is-plain-object';
import { Editor, Node } from '..';
/**
 * Shared the function with isElementType utility
 */
const isElement = (value) => {
    return (isPlainObject(value) &&
        Node.isNodeList(value.children) &&
        !Editor.isEditor(value));
};
// eslint-disable-next-line no-redeclare
export const Element = {
    isAncestor(value) {
        return isPlainObject(value) && Node.isNodeList(value.children);
    },
    isElement,
    isElementList(value) {
        return Array.isArray(value) && value.every(val => Element.isElement(val));
    },
    isElementProps(props) {
        return props.children !== undefined;
    },
    isElementType: (value, elementVal, elementKey = 'type') => {
        return (isElement(value) && value[elementKey] === elementVal);
    },
    matches(element, props) {
        for (const key in props) {
            if (key === 'children') {
                continue;
            }
            if (element[key] !== props[key]) {
                return false;
            }
        }
        return true;
    },
};
//# sourceMappingURL=element.js.map