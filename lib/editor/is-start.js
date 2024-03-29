import { Editor } from '../interfaces/editor';
import { Point } from '../interfaces/point';
export const isStart = (editor, point, at) => {
    // PERF: If the offset isn't `0` we know it's not the start.
    if (point.offset !== 0) {
        return false;
    }
    const start = Editor.start(editor, at);
    return Point.equals(point, start);
};
//# sourceMappingURL=is-start.js.map