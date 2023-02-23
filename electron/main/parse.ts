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

export function parse_graph(summary) {
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

export function parse_ranking(summary, parse_node_data) {
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

function _parse_node_ccf(summary, id: string) {
    const list = { "A": 0, "B": 0, "C": 0, "N": 0 }
    summary.nodes
        .filter(node => (node.id === id))[0].person.publications
        .map(p => { list[summary.publications[p].ccf]++ })
    return [
        { "name": "A", "value": list["A"] },
        { "name": "B", "value": list["B"] },
        { "name": "C", "value": list["C"] },
        { "name": "N", "value": list["N"] },
    ]

}

export function parse_node_ccf(summary, id: string) {
    const data = [{ "name": "Error", "value": 1 }]
    try {
        return _parse_node_ccf(summary, id)
    } catch (error) {
        console.log(error)
    }
    return data
}

export function parse_node_conf(summary, id: string) {
    return [{ "name": "No data", "value": 1 }]
}
export function parse_edge_ccf(summary, from: string, to: string) {
    return [{ "name": "No data", "value": 1 }]
}

export function parse_edge_conf(summary, from: string, to: string) {
    return [{ "name": "No data", "value": 1 }]
}
