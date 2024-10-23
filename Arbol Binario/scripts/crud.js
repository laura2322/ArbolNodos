function addNode() {
    const nodeValue = document.getElementById('nodeValue').value;

    if (!nodeValue) {
        alert("Por favor, ingresa un valor para el nuevo nodo.");
        return;
    }

    const parentNode = selectedNodeValue ? tree.findNode(selectedNodeValue) : tree.root;
    const newNode = new TreeNode(nodeValue);
    parentNode.addChild(newNode);

    clearInputsAndRender();
}

function removeNode() {
    if (!selectedNodeValue) {
        alert("Selecciona un nodo para eliminar.");
        return;
    }

    if (selectedNodeValue === tree.root.value) {
        alert("No puedes eliminar el nodo raíz.");
        return;
    }

    const parentNode = findParent(tree.root, selectedNodeValue);
    if (!parentNode) {
        alert("No se pudo encontrar el nodo padre.");
        return;
    }

    parentNode.children = parentNode.children.filter(child => child.value !== selectedNodeValue);
    clearInputsAndRender();
}

function updateNode() {
    if (!selectedNodeValue) {
        alert("Selecciona un nodo para actualizar.");
        return;
    }

    const newValue = prompt("Ingresa el nuevo valor para el nodo:");
    if (!newValue) {
        alert("Valor inválido.");
        return;
    }

    const nodeToUpdate = tree.findNode(selectedNodeValue);
    nodeToUpdate.value = newValue;

    clearInputsAndRender();
}

function clearInputsAndRender() {
    document.getElementById('nodeValue').value = '';
    selectedNodeValue = null;
    document.getElementById('tree-container').innerHTML = '';
    tree.traverse();
}

// Función auxiliar para encontrar el padre de un nodo
function findParent(node, value) {
    for (let child of node.children) {
        if (child.value === value) {
            return node;
        }
        const result = findParent(child, value);
        if (result) {
            return result;
        }
    }
    return null;
}
