export const deselect = editor => {
    const { selection } = editor;
    if (selection) {
        editor.apply({
            type: 'set_selection',
            properties: selection,
            newProperties: null,
        });
    }
};
//# sourceMappingURL=deselect.js.map