import { Text } from '../interfaces/text';
export const hasTexts = (editor, element) => {
    return element.children.every(n => Text.isText(n));
};
//# sourceMappingURL=has-texts.js.map