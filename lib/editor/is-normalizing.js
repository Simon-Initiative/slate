import { NORMALIZING } from '../utils/weak-maps';
export const isNormalizing = editor => {
    const isNormalizing = NORMALIZING.get(editor);
    return isNormalizing === undefined ? true : isNormalizing;
};
//# sourceMappingURL=is-normalizing.js.map