import { isPlainObject } from 'is-plain-object';
import { Range } from '..';
import { isDeepEqual } from '../utils/deep-equal';
// eslint-disable-next-line no-redeclare
export const Text = {
    equals(text, another, options = {}) {
        const { loose = false } = options;
        function omitText(obj) {
            const { text, ...rest } = obj;
            return rest;
        }
        return isDeepEqual(loose ? omitText(text) : text, loose ? omitText(another) : another);
    },
    isText(value) {
        return isPlainObject(value) && typeof value.text === 'string';
    },
    isTextList(value) {
        return Array.isArray(value) && value.every(val => Text.isText(val));
    },
    isTextProps(props) {
        return props.text !== undefined;
    },
    matches(text, props) {
        for (const key in props) {
            if (key === 'text') {
                continue;
            }
            if (!text.hasOwnProperty(key) ||
                text[key] !== props[key]) {
                return false;
            }
        }
        return true;
    },
    decorations(node, decorations) {
        let leaves = [{ ...node }];
        for (const dec of decorations) {
            const { anchor, focus, ...rest } = dec;
            const [start, end] = Range.edges(dec);
            const next = [];
            let leafEnd = 0;
            const decorationStart = start.offset;
            const decorationEnd = end.offset;
            for (const leaf of leaves) {
                const { length } = leaf.text;
                const leafStart = leafEnd;
                leafEnd += length;
                // If the range encompasses the entire leaf, add the range.
                if (decorationStart <= leafStart && leafEnd <= decorationEnd) {
                    Object.assign(leaf, rest);
                    next.push(leaf);
                    continue;
                }
                // If the range expanded and match the leaf, or starts after, or ends before it, continue.
                if ((decorationStart !== decorationEnd &&
                    (decorationStart === leafEnd || decorationEnd === leafStart)) ||
                    decorationStart > leafEnd ||
                    decorationEnd < leafStart ||
                    (decorationEnd === leafStart && leafStart !== 0)) {
                    next.push(leaf);
                    continue;
                }
                // Otherwise we need to split the leaf, at the start, end, or both,
                // and add the range to the middle intersecting section. Do the end
                // split first since we don't need to update the offset that way.
                let middle = leaf;
                let before;
                let after;
                if (decorationEnd < leafEnd) {
                    const off = decorationEnd - leafStart;
                    after = { ...middle, text: middle.text.slice(off) };
                    middle = { ...middle, text: middle.text.slice(0, off) };
                }
                if (decorationStart > leafStart) {
                    const off = decorationStart - leafStart;
                    before = { ...middle, text: middle.text.slice(0, off) };
                    middle = { ...middle, text: middle.text.slice(off) };
                }
                Object.assign(middle, rest);
                if (before) {
                    next.push(before);
                }
                next.push(middle);
                if (after) {
                    next.push(after);
                }
            }
            leaves = next;
        }
        return leaves;
    },
};
//# sourceMappingURL=text.js.map