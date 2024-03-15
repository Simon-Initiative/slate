import { Point } from '..';
// eslint-disable-next-line no-redeclare
export const PointRef = {
    transform(ref, op) {
        const { current, affinity } = ref;
        if (current == null) {
            return;
        }
        const point = Point.transform(current, op, { affinity });
        ref.current = point;
        if (point == null) {
            ref.unref();
        }
    },
};
//# sourceMappingURL=point-ref.js.map