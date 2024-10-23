class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    findNode(value) {
        if (this.value === value) {
            return this;
        }
        for (const child of this.children) {
            const found = child.findNode(value);
            if (found) {
                return found;
            }
        }
        return null;
    }
}

class Tree {
    constructor(rootValue) {
        this.root = new TreeNode(rootValue);
    }

    traverse(node = this.root, depth = 0) {
        const treeContainer = document.getElementById('tree-container');
        const nodeElement = document.createElement('div');
        nodeElement.style.marginLeft = `${depth * 20}px`;
        nodeElement.textContent = node.value;
        nodeElement.classList.add('tree-node');
        nodeElement.onclick = () => selectNode(node.value);

        treeContainer.appendChild(nodeElement);

        node.children.forEach(child => {
            this.traverse(child, depth + 1);
        });
    }

    findNode(value) {
        return this.root.findNode(value);
    }
}

let selectedNodeValue = null;

function selectNode(value) {
    selectedNodeValue = value;
    document.getElementById('nodeValue').value = value;
}

const tree = new Tree('Raíz');
tree.traverse();
