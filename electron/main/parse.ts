function _parse_graph(summary) {
    const nodes = Object.values(summary.nodes).map(
        (node) => ({
            "id": node.id,
            "label": node.label,
            "value": node.person.publications.length,
        })
    );
    const edges = Object.values(summary.edges).map(
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
    const nodes = Object.values(summary.nodes)
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
    summary.nodes[id].person.publications
        .forEach(p => { list[summary.publications[p].ccf]++ })
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

function _parse_node_conf(summary, id: string) {
    const list = { "A": {}, "B": {}, "C": {}, "N": {} }
    summary.nodes[id].person.publications
        .forEach(p => {
            const ccf = summary.publications[p].ccf
            const journal = summary.publications[p].journal
            if (!list[ccf][journal]) list[ccf][journal] = 0
            list[ccf][journal]++
        })
    const data = []
    for (let ccf of ["A", "B", "C", "N"])
        Object.keys(list[ccf])
            .map(journal => ({ "name": journal, "value": list[ccf][journal] }))
            .sort((a, b) => b.value - a.value)
            .forEach(item => { data.push(item) })
    return data
}

export function parse_node_conf(summary, id: string) {
    const data = [{ "name": "Error", "value": 1 }]
    try {
        return _parse_node_conf(summary, id)
    } catch (error) {
        console.log(error)
    }
    return data
}

function _parse_node_line(summary, id: string) {
    let min_year = 9999
    let max_year = 0
    summary.nodes[id].person.publications
        .forEach(p => {
            const year = summary.publications[p].year
            min_year = year < min_year ? year : min_year
            max_year = year > max_year ? year : max_year
        })
    const years = []
    for (let year = min_year; year <= max_year; year++)
        years.push(year)
    const list = {}
    years.forEach(year => { list[year] = { "A": 0, "B": 0, "C": 0, "N": 0 } })
    summary.nodes[id].person.publications
        .forEach(p => { list[summary.publications[p].year][summary.publications[p].ccf]++ })
    const data = { "A": [], "B": [], "C": [], "N": [], "years": years }
    years.map(year => { for (let ccf of ["A", "B", "C", "N"]) data[ccf].push(list[year][ccf]) })
    return data
}

export function parse_node_line(summary, id: string) {
    const data = { "A": [0], "B": [0], "C": [0], "N": [0], "years": [0] }
    try {
        return _parse_node_line(summary, id)
    } catch (error) {
        console.log(error)
    }
    return data
}

export function parse_edge_ccf(summary, from: string, to: string) {
    return [{ "name": "No data", "value": 1 }]
}

export function parse_edge_conf(summary, from: string, to: string) {
    return [{ "name": "No data", "value": 1 }]
}
