function _parse_summary(summary) {
    const nodes = summary.nodes.map(
        (node) => ({
            "id": node.id,
            "label": node.label,
            "value": node.publications.length,
        })
    );
    const edges = summary.edges.map(
        (edge) => ({
            "from": edge.from,
            "to": edge.to,
            "value": edge.publications.length,
        })
    );
    return { nodes: nodes, edges: edges }
}

function parse_summary(summary) {
    const nodes = [
        { id: 1, label: 'Error', shape: 'circle' },
        { id: 2, label: 'Something wrong', shape: 'box' },
    ];
    const edges = [{ from: 1, to: 2 }];
    try {
        return _parse_summary(summary)
    } catch (error) {
        console.log(error)
    }
    return { nodes: nodes, edges: edges }
}

export { parse_summary }