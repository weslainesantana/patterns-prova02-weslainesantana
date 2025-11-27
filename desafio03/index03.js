class Item {
    constructor(descricao, valor) {
        this.descricao = descricao;
        this.valor = valor;
    }
}

class CarrinhoItem {
    constructor(item, quantidade) {
        this.item = item;
        this.quantidade = quantidade;
    }

    subtotal() {
        return this.item.valor * this.quantidade;
    }
}

class Carrinho {
    constructor() {
        this.lista = [];
        this.momento = Date.now();
    }

    inserir(item, qtd) {
        const registro = new CarrinhoItem(item, qtd);
        this.lista.push(registro);
        console.log(`Item inserido: ${qtd}x ${item.descricao}`);
    }

    total() {
        return this.lista.reduce((acc, linha) => acc + linha.subtotal(), 0);
    }
}

const itemMouse = new Item("Mouse Gamer RGB", 80.00);
const itemTeclado = new Item("Teclado Semi-Mecânico", 130.00);

const compra = new Carrinho();

compra.inserir(itemMouse, 2);
compra.inserir(itemTeclado, 1);

console.log("---");
console.log(`Valor Final: R$ ${compra.total().toFixed(2)}`);
