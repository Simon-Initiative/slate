import { Node, Path, Range } from '..';
import { isPlainObject } from 'is-plain-object';
// eslint-disable-next-line no-redeclare
export const Operation = {
    isNodeOperation(value) {
        return Operation.isOperation(value) && value.type.endsWith('_node');
    },
    isOperation(value) {
        if (!isPlainObject(value)) {
            return false;
        }
        switch (value.type) {
            case 'insert_node':
                return Path.isPath(value.path) && Node.isNode(value.node);
            case 'insert_text':
                return (typeof value.offset === 'number' &&
                    typeof value.text === 'string' &&
                    Path.isPath(value.path));
            case 'merge_node':
                return (typeof value.position === 'number' &&
                    Path.isPath(value.path) &&
                    isPlainObject(value.properties));
            case 'move_node':
                return Path.isPath(value.path) && Path.isPath(value.newPath);
            case 'remove_node':
                return Path.isPath(value.path) && Node.isNode(value.node);
            case 'remove_text':
                return (typeof value.offset === 'number' &&
                    typeof value.text === 'string' &&
                    Path.isPath(value.path));
            case 'set_node':
                return (Path.isPath(value.path) &&
                    isPlainObject(value.properties) &&
                    isPlainObject(value.newProperties));
            case 'set_selection':
                return ((value.properties === null && Range.isRange(value.newProperties)) ||
                    (value.newProperties === null && Range.isRange(value.properties)) ||
                    (isPlainObject(value.properties) &&
                        isPlainObject(value.newProperties)));
            case 'split_node':
                return (Path.isPath(value.path) &&
                    typeof value.position === 'number' &&
                    isPlainObject(value.properties));
            default:
                return false;
        }
    },
    isOperationList(value) {
        return (Array.isArray(value) && value.every(val => Operation.isOperation(val)));
    },
    isSelectionOperation(value) {
        return Operation.isOperation(value) && value.type.endsWith('_selection');
    },
    isTextOperation(value) {
        return Operation.isOperation(value) && value.type.endsWith('_text');
    },
    inverse(op) {
        switch (op.type) {
            case 'insert_node': {
                return { ...op, type: 'remove_node' };
            }
            case 'insert_text': {
                return { ...op, type: 'remove_text' };
            }
            case 'merge_node': {
                return { ...op, type: 'split_node', path: Path.previous(op.path) };
            }
            case 'move_node': {
                const { newPath, path } = op;
                // PERF: in this case the move operation is a no-op anyways.
                if (Path.equals(newPath, path)) {
                    return op;
                }
                // If the move happens completely within a single parent the path and
                // newPath are stable with respect to each other.
                if (Path.isSibling(path, newPath)) {
                    return { ...op, path: newPath, newPath: path };
                }
                // If the move does not happen within a single parent it is possible
                // for the move to impact the true path to the location where the node
                // was removed from and where it was inserted. We have to adjust for this
                // and find the original path. We can accomplish this (only in non-sibling)
                // moves by looking at the impact of the move operation on the node
                // after the original move path.
                const inversePath = Path.transform(path, op);
                const inverseNewPath = Path.transform(Path.next(path), op);
                return { ...op, path: inversePath, newPath: inverseNewPath };
            }
            case 'remove_node': {
                return { ...op, type: 'insert_node' };
            }
            case 'remove_text': {
                return { ...op, type: 'insert_text' };
            }
            case 'set_node': {
                const { properties, newProperties } = op;
                return { ...op, properties: newProperties, newProperties: properties };
            }
            case 'set_selection': {
                const { properties, newProperties } = op;
                if (properties == null) {
                    return {
                        ...op,
                        properties: newProperties,
                        newProperties: null,
                    };
                }
                else if (newProperties == null) {
                    return {
                        ...op,
                        properties: null,
                        newProperties: properties,
                    };
                }
                else {
                    return { ...op, properties: newProperties, newProperties: properties };
                }
            }
            case 'split_node': {
                return { ...op, type: 'merge_node', path: Path.next(op.path) };
            }
        }
    },
};
//# sourceMappingURL=operation.js.map