import { produce } from 'immer';
import { isPlainObject } from 'is-plain-object';
import { Path, Point } from '..';
// eslint-disable-next-line no-redeclare
export const Range = {
    edges(range, options = {}) {
        const { reverse = false } = options;
        const { anchor, focus } = range;
        return Range.isBackward(range) === reverse
            ? [anchor, focus]
            : [focus, anchor];
    },
    end(range) {
        const [, end] = Range.edges(range);
        return end;
    },
    equals(range, another) {
        return (Point.equals(range.anchor, another.anchor) &&
            Point.equals(range.focus, another.focus));
    },
    includes(range, target) {
        if (Range.isRange(target)) {
            if (Range.includes(range, target.anchor) ||
                Range.includes(range, target.focus)) {
                return true;
            }
            const [rs, re] = Range.edges(range);
            const [ts, te] = Range.edges(target);
            return Point.isBefore(rs, ts) && Point.isAfter(re, te);
        }
        const [start, end] = Range.edges(range);
        let isAfterStart = false;
        let isBeforeEnd = false;
        if (Point.isPoint(target)) {
            isAfterStart = Point.compare(target, start) >= 0;
            isBeforeEnd = Point.compare(target, end) <= 0;
        }
        else {
            isAfterStart = Path.compare(target, start.path) >= 0;
            isBeforeEnd = Path.compare(target, end.path) <= 0;
        }
        return isAfterStart && isBeforeEnd;
    },
    intersection(range, another) {
        const { anchor, focus, ...rest } = range;
        const [s1, e1] = Range.edges(range);
        const [s2, e2] = Range.edges(another);
        const start = Point.isBefore(s1, s2) ? s2 : s1;
        const end = Point.isBefore(e1, e2) ? e1 : e2;
        if (Point.isBefore(end, start)) {
            return null;
        }
        else {
            return { anchor: start, focus: end, ...rest };
        }
    },
    isBackward(range) {
        const { anchor, focus } = range;
        return Point.isAfter(anchor, focus);
    },
    isCollapsed(range) {
        const { anchor, focus } = range;
        return Point.equals(anchor, focus);
    },
    isExpanded(range) {
        return !Range.isCollapsed(range);
    },
    isForward(range) {
        return !Range.isBackward(range);
    },
    isRange(value) {
        return (isPlainObject(value) &&
            Point.isPoint(value.anchor) &&
            Point.isPoint(value.focus));
    },
    *points(range) {
        yield [range.anchor, 'anchor'];
        yield [range.focus, 'focus'];
    },
    start(range) {
        const [start] = Range.edges(range);
        return start;
    },
    transform(range, op, options = {}) {
        return produce(range, r => {
            if (r === null) {
                return null;
            }
            const { affinity = 'inward' } = options;
            let affinityAnchor;
            let affinityFocus;
            if (affinity === 'inward') {
                // If the range is collapsed, make sure to use the same affinity to
                // avoid the two points passing each other and expanding in the opposite
                // direction
                const isCollapsed = Range.isCollapsed(r);
                if (Range.isForward(r)) {
                    affinityAnchor = 'forward';
                    affinityFocus = isCollapsed ? affinityAnchor : 'backward';
                }
                else {
                    affinityAnchor = 'backward';
                    affinityFocus = isCollapsed ? affinityAnchor : 'forward';
                }
            }
            else if (affinity === 'outward') {
                if (Range.isForward(r)) {
                    affinityAnchor = 'backward';
                    affinityFocus = 'forward';
                }
                else {
                    affinityAnchor = 'forward';
                    affinityFocus = 'backward';
                }
            }
            else {
                affinityAnchor = affinity;
                affinityFocus = affinity;
            }
            const anchor = Point.transform(r.anchor, op, { affinity: affinityAnchor });
            const focus = Point.transform(r.focus, op, { affinity: affinityFocus });
            if (!anchor || !focus) {
                return null;
            }
            r.anchor = anchor;
            r.focus = focus;
        });
    },
};
//# sourceMappingURL=range.js.map