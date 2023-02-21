function _parse_graph(summary) {
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

function parse_graph(summary) {
    const nodes = [
        { id: 1, label: 'Error', shape: 'circle' },
        { id: 2, label: 'Something wrong', shape: 'box' },
    ];
    const edges = [{ from: 1, to: 2 }];
    try {
        return _parse_graph(summary)
    } catch (error) {
        console.log(error)
    }
    return { nodes: nodes, edges: edges }
}

function _parse_ranking(summary, parse_node_data) {
    const nodes = summary.nodes
        .map((node) => ({
            id: node.id,
            label: node.label,
            data: parse_node_data(node),
        }))
        .sort((a, b) => a.data.value - b.data.value);
    const id = nodes.map((node) => node.id);
    const label = nodes.map((node) => node.label);
    const data = nodes.map((node) => node.data);
    return { id: id, label: label, data: data }
}

function parse_ranking(summary, parse_node_data) {
    const id = ['error'];
    const label = ['error'];
    const data = [{ value: 0, itemStyle: { color: "red" } }]
    try {
        return _parse_ranking(summary, parse_node_data)
    } catch (error) {
        console.log(error)
    }
    return { id: id, label: label, data: data }
}

export { parse_graph, parse_ranking }