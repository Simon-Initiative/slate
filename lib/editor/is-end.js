import { Editor } from '../interfaces/editor';
import { Point } from '../interfaces/point';
export const isEnd = (editor, point, at) => {
    const end = Editor.end(editor, at);
    return Point.equals(point, end);
};
//# sourceMappingURL=is-end.js.map