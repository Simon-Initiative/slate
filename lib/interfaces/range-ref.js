import { Range } from '..';
// eslint-disable-next-line no-redeclare
export const RangeRef = {
    transform(ref, op) {
        const { current, affinity } = ref;
        if (current == null) {
            return;
        }
        const path = Range.transform(current, op, { affinity });
        ref.current = path;
        if (path == null) {
            ref.unref();
        }
    },
};
//# sourceMappingURL=range-ref.js.map