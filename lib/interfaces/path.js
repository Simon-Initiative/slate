// eslint-disable-next-line no-redeclare
export const Path = {
    ancestors(path, options = {}) {
        const { reverse = false } = options;
        let paths = Path.levels(path, options);
        if (reverse) {
            paths = paths.slice(1);
        }
        else {
            paths = paths.slice(0, -1);
        }
        return paths;
    },
    common(path, another) {
        const common = [];
        for (let i = 0; i < path.length && i < another.length; i++) {
            const av = path[i];
            const bv = another[i];
            if (av !== bv) {
                break;
            }
            common.push(av);
        }
        return common;
    },
    compare(path, another) {
        const min = Math.min(path.length, another.length);
        for (let i = 0; i < min; i++) {
            if (path[i] < another[i])
                return -1;
            if (path[i] > another[i])
                return 1;
        }
        return 0;
    },
    endsAfter(path, another) {
        const i = path.length - 1;
        const as = path.slice(0, i);
        const bs = another.slice(0, i);
        const av = path[i];
        const bv = another[i];
        return Path.equals(as, bs) && av > bv;
    },
    endsAt(path, another) {
        const i = path.length;
        const as = path.slice(0, i);
        const bs = another.slice(0, i);
        return Path.equals(as, bs);
    },
    endsBefore(path, another) {
        const i = path.length - 1;
        const as = path.slice(0, i);
        const bs = another.slice(0, i);
        const av = path[i];
        const bv = another[i];
        return Path.equals(as, bs) && av < bv;
    },
    equals(path, another) {
        return (path.length === another.length && path.every((n, i) => n === another[i]));
    },
    hasPrevious(path) {
        return path[path.length - 1] > 0;
    },
    isAfter(path, another) {
        return Path.compare(path, another) === 1;
    },
    isAncestor(path, another) {
        return path.length < another.length && Path.compare(path, another) === 0;
    },
    isBefore(path, another) {
        return Path.compare(path, another) === -1;
    },
    isChild(path, another) {
        return (path.length === another.length + 1 && Path.compare(path, another) === 0);
    },
    isCommon(path, another) {
        return path.length <= another.length && Path.compare(path, another) === 0;
    },
    isDescendant(path, another) {
        return path.length > another.length && Path.compare(path, another) === 0;
    },
    isParent(path, another) {
        return (path.length + 1 === another.length && Path.compare(path, another) === 0);
    },
    isPath(value) {
        return (Array.isArray(value) &&
            (value.length === 0 || typeof value[0] === 'number'));
    },
    isSibling(path, another) {
        if (path.length !== another.length) {
            return false;
        }
        const as = path.slice(0, -1);
        const bs = another.slice(0, -1);
        const al = path[path.length - 1];
        const bl = another[another.length - 1];
        return al !== bl && Path.equals(as, bs);
    },
    levels(path, options = {}) {
        const { reverse = false } = options;
        const list = [];
        for (let i = 0; i <= path.length; i++) {
            list.push(path.slice(0, i));
        }
        if (reverse) {
            list.reverse();
        }
        return list;
    },
    next(path) {
        if (path.length === 0) {
            throw new Error(`Cannot get the next path of a root path [${path}], because it has no next index.`);
        }
        const last = path[path.length - 1];
        return path.slice(0, -1).concat(last + 1);
    },
    operationCanTransformPath(operation) {
        switch (operation.type) {
            case 'insert_node':
            case 'remove_node':
            case 'merge_node':
            case 'split_node':
            case 'move_node':
                return true;
            default:
                return false;
        }
    },
    parent(path) {
        if (path.length === 0) {
            throw new Error(`Cannot get the parent path of the root path [${path}].`);
        }
        return path.slice(0, -1);
    },
    previous(path) {
        if (path.length === 0) {
            throw new Error(`Cannot get the previous path of a root path [${path}], because it has no previous index.`);
        }
        const last = path[path.length - 1];
        if (last <= 0) {
            throw new Error(`Cannot get the previous path of a first child path [${path}] because it would result in a negative index.`);
        }
        return path.slice(0, -1).concat(last - 1);
    },
    relative(path, ancestor) {
        if (!Path.isAncestor(ancestor, path) && !Path.equals(path, ancestor)) {
            throw new Error(`Cannot get the relative path of [${path}] inside ancestor [${ancestor}], because it is not above or equal to the path.`);
        }
        return path.slice(ancestor.length);
    },
    transform(path, operation, options = {}) {
        if (!path)
            return null;
        // PERF: use destructing instead of immer
        const p = [...path];
        const { affinity = 'forward' } = options;
        // PERF: Exit early if the operation is guaranteed not to have an effect.
        if (path.length === 0) {
            return p;
        }
        switch (operation.type) {
            case 'insert_node': {
                const { path: op } = operation;
                if (Path.equals(op, p) ||
                    Path.endsBefore(op, p) ||
                    Path.isAncestor(op, p)) {
                    p[op.length - 1] += 1;
                }
                break;
            }
            case 'remove_node': {
                const { path: op } = operation;
                if (Path.equals(op, p) || Path.isAncestor(op, p)) {
                    return null;
                }
                else if (Path.endsBefore(op, p)) {
                    p[op.length - 1] -= 1;
                }
                break;
            }
            case 'merge_node': {
                const { path: op, position } = operation;
                if (Path.equals(op, p) || Path.endsBefore(op, p)) {
                    p[op.length - 1] -= 1;
                }
                else if (Path.isAncestor(op, p)) {
                    p[op.length - 1] -= 1;
                    p[op.length] += position;
                }
                break;
            }
            case 'split_node': {
                const { path: op, position } = operation;
                if (Path.equals(op, p)) {
                    if (affinity === 'forward') {
                        p[p.length - 1] += 1;
                    }
                    else if (affinity === 'backward') {
                        // Nothing, because it still refers to the right path.
                    }
                    else {
                        return null;
                    }
                }
                else if (Path.endsBefore(op, p)) {
                    p[op.length - 1] += 1;
                }
                else if (Path.isAncestor(op, p) && path[op.length] >= position) {
                    p[op.length - 1] += 1;
                    p[op.length] -= position;
                }
                break;
            }
            case 'move_node': {
                const { path: op, newPath: onp } = operation;
                // If the old and new path are the same, it's a no-op.
                if (Path.equals(op, onp)) {
                    return p;
                }
                if (Path.isAncestor(op, p) || Path.equals(op, p)) {
                    const copy = onp.slice();
                    if (Path.endsBefore(op, onp) && op.length < onp.length) {
                        copy[op.length - 1] -= 1;
                    }
                    return copy.concat(p.slice(op.length));
                }
                else if (Path.isSibling(op, onp) &&
                    (Path.isAncestor(onp, p) || Path.equals(onp, p))) {
                    if (Path.endsBefore(op, p)) {
                        p[op.length - 1] -= 1;
                    }
                    else {
                        p[op.length - 1] += 1;
                    }
                }
                else if (Path.endsBefore(onp, p) ||
                    Path.equals(onp, p) ||
                    Path.isAncestor(onp, p)) {
                    if (Path.endsBefore(op, p)) {
                        p[op.length - 1] -= 1;
                    }
                    p[onp.length - 1] += 1;
                }
                else if (Path.endsBefore(op, p)) {
                    if (Path.equals(onp, p)) {
                        p[onp.length - 1] += 1;
                    }
                    p[op.length - 1] -= 1;
                }
                break;
            }
        }
        return p;
    },
};
//# sourceMappingURL=path.js.map