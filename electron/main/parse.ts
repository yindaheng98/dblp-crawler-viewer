function parse_summary(summary) {
    const nodes = [
        { id: 1, label: 'Error', shape: 'circle' },
        { id: 2, label: 'Something wrong', shape: 'box' },
    ];
    const edges = [{ from: 1, to: 2 }];
    return { nodes: nodes, edges: edges }
}

export { parse_summary }