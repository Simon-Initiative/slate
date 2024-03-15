import { Path, Point, Range } from '..';
// eslint-disable-next-line no-redeclare
export const Location = {
    isLocation(value) {
        return Path.isPath(value) || Point.isPoint(value) || Range.isRange(value);
    },
};
// eslint-disable-next-line no-redeclare
export const Span = {
    isSpan(value) {
        return (Array.isArray(value) && value.length === 2 && value.every(Path.isPath));
    },
};
//# sourceMappingURL=location.js.map