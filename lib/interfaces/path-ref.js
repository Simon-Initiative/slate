import { Path } from '..';
// eslint-disable-next-line no-redeclare
export const PathRef = {
    transform(ref, op) {
        const { current, affinity } = ref;
        if (current == null) {
            return;
        }
        const path = Path.transform(current, op, { affinity });
        ref.current = path;
        if (path == null) {
            ref.unref();
        }
    },
};
//# sourceMappingURL=path-ref.js.map