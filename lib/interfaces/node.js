import { produce } from 'immer';
import { Editor, Path, Range, Scrubber, Text } from '..';
import { Element } from './element';
const IS_NODE_LIST_CACHE = new WeakMap();
// eslint-disable-next-line no-redeclare
export const Node = {
    ancestor(root, path) {
        const node = Node.get(root, path);
        if (Text.isText(node)) {
            throw new Error(`Cannot get the ancestor node at path [${path}] because it refers to a text node instead: ${Scrubber.stringify(node)}`);
        }
        return node;
    },
    *ancestors(root, path, options = {}) {
        for (const p of Path.ancestors(path, options)) {
            const n = Node.ancestor(root, p);
            const entry = [n, p];
            yield entry;
        }
    },
    child(root, index) {
        if (Text.isText(root)) {
            throw new Error(`Cannot get the child of a text node: ${Scrubber.stringify(root)}`);
        }
        const c = root.children[index];
        if (c == null) {
            throw new Error(`Cannot get child at index \`${index}\` in node: ${Scrubber.stringify(root)}`);
        }
        return c;
    },
    *children(root, path, options = {}) {
        const { reverse = false } = options;
        const ancestor = Node.ancestor(root, path);
        const { children } = ancestor;
        let index = reverse ? children.length - 1 : 0;
        while (reverse ? index >= 0 : index < children.length) {
            const child = Node.child(ancestor, index);
            const childPath = path.concat(index);
            yield [child, childPath];
            index = reverse ? index - 1 : index + 1;
        }
    },
    common(root, path, another) {
        const p = Path.common(path, another);
        const n = Node.get(root, p);
        return [n, p];
    },
    descendant(root, path) {
        const node = Node.get(root, path);
        if (Editor.isEditor(node)) {
            throw new Error(`Cannot get the descendant node at path [${path}] because it refers to the root editor node instead: ${Scrubber.stringify(node)}`);
        }
        return node;
    },
    *descendants(root, options = {}) {
        for (const [node, path] of Node.nodes(root, options)) {
            if (path.length !== 0) {
                // NOTE: we have to coerce here because checking the path's length does
                // guarantee that `node` is not a `Editor`, but TypeScript doesn't know.
                yield [node, path];
            }
        }
    },
    *elements(root, options = {}) {
        for (const [node, path] of Node.nodes(root, options)) {
            if (Element.isElement(node)) {
                yield [node, path];
            }
        }
    },
    extractProps(node) {
        if (Element.isAncestor(node)) {
            const { children, ...properties } = node;
            return properties;
        }
        else {
            const { text, ...properties } = node;
            return properties;
        }
    },
    first(root, path) {
        const p = path.slice();
        let n = Node.get(root, p);
        while (n) {
            if (Text.isText(n) || n.children.length === 0) {
                break;
            }
            else {
                n = n.children[0];
                p.push(0);
            }
        }
        return [n, p];
    },
    fragment(root, range) {
        if (Text.isText(root)) {
            throw new Error(`Cannot get a fragment starting from a root text node: ${Scrubber.stringify(root)}`);
        }
        const newRoot = produce({ children: root.children }, r => {
            const [start, end] = Range.edges(range);
            const nodeEntries = Node.nodes(r, {
                reverse: true,
                pass: ([, path]) => !Range.includes(range, path),
            });
            for (const [, path] of nodeEntries) {
                if (!Range.includes(range, path)) {
                    const parent = Node.parent(r, path);
                    const index = path[path.length - 1];
                    parent.children.splice(index, 1);
                }
                if (Path.equals(path, end.path)) {
                    const leaf = Node.leaf(r, path);
                    leaf.text = leaf.text.slice(0, end.offset);
                }
                if (Path.equals(path, start.path)) {
                    const leaf = Node.leaf(r, path);
                    leaf.text = leaf.text.slice(start.offset);
                }
            }
            if (Editor.isEditor(r)) {
                r.selection = null;
            }
        });
        return newRoot.children;
    },
    get(root, path) {
        let node = root;
        for (let i = 0; i < path.length; i++) {
            const p = path[i];
            if (Text.isText(node) || !node.children[p]) {
                throw new Error(`Cannot find a descendant at path [${path}] in node: ${Scrubber.stringify(root)}`);
            }
            node = node.children[p];
        }
        return node;
    },
    has(root, path) {
        let node = root;
        for (let i = 0; i < path.length; i++) {
            const p = path[i];
            if (Text.isText(node) || !node.children[p]) {
                return false;
            }
            node = node.children[p];
        }
        return true;
    },
    isNode(value) {
        return (Text.isText(value) || Element.isElement(value) || Editor.isEditor(value));
    },
    isNodeList(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        const cachedResult = IS_NODE_LIST_CACHE.get(value);
        if (cachedResult !== undefined) {
            return cachedResult;
        }
        const isNodeList = value.every(val => Node.isNode(val));
        IS_NODE_LIST_CACHE.set(value, isNodeList);
        return isNodeList;
    },
    last(root, path) {
        const p = path.slice();
        let n = Node.get(root, p);
        while (n) {
            if (Text.isText(n) || n.children.length === 0) {
                break;
            }
            else {
                const i = n.children.length - 1;
                n = n.children[i];
                p.push(i);
            }
        }
        return [n, p];
    },
    leaf(root, path) {
        const node = Node.get(root, path);
        if (!Text.isText(node)) {
            throw new Error(`Cannot get the leaf node at path [${path}] because it refers to a non-leaf node: ${Scrubber.stringify(node)}`);
        }
        return node;
    },
    *levels(root, path, options = {}) {
        for (const p of Path.levels(path, options)) {
            const n = Node.get(root, p);
            yield [n, p];
        }
    },
    matches(node, props) {
        return ((Element.isElement(node) &&
            Element.isElementProps(props) &&
            Element.matches(node, props)) ||
            (Text.isText(node) &&
                Text.isTextProps(props) &&
                Text.matches(node, props)));
    },
    *nodes(root, options = {}) {
        const { pass, reverse = false } = options;
        const { from = [], to } = options;
        const visited = new Set();
        let p = [];
        let n = root;
        while (true) {
            if (to && (reverse ? Path.isBefore(p, to) : Path.isAfter(p, to))) {
                break;
            }
            if (!visited.has(n)) {
                yield [n, p];
            }
            // If we're allowed to go downward and we haven't descended yet, do.
            if (!visited.has(n) &&
                !Text.isText(n) &&
                n.children.length !== 0 &&
                (pass == null || pass([n, p]) === false)) {
                visited.add(n);
                let nextIndex = reverse ? n.children.length - 1 : 0;
                if (Path.isAncestor(p, from)) {
                    nextIndex = from[p.length];
                }
                p = p.concat(nextIndex);
                n = Node.get(root, p);
                continue;
            }
            // If we're at the root and we can't go down, we're done.
            if (p.length === 0) {
                break;
            }
            // If we're going forward...
            if (!reverse) {
                const newPath = Path.next(p);
                if (Node.has(root, newPath)) {
                    p = newPath;
                    n = Node.get(root, p);
                    continue;
                }
            }
            // If we're going backward...
            if (reverse && p[p.length - 1] !== 0) {
                const newPath = Path.previous(p);
                p = newPath;
                n = Node.get(root, p);
                continue;
            }
            // Otherwise we're going upward...
            p = Path.parent(p);
            n = Node.get(root, p);
            visited.add(n);
        }
    },
    parent(root, path) {
        const parentPath = Path.parent(path);
        const p = Node.get(root, parentPath);
        if (Text.isText(p)) {
            throw new Error(`Cannot get the parent of path [${path}] because it does not exist in the root.`);
        }
        return p;
    },
    string(node) {
        if (Text.isText(node)) {
            return node.text;
        }
        else {
            return node.children.map(Node.string).join('');
        }
    },
    *texts(root, options = {}) {
        for (const [node, path] of Node.nodes(root, options)) {
            if (Text.isText(node)) {
                yield [node, path];
            }
        }
    },
};
//# sourceMappingURL=node.js.map