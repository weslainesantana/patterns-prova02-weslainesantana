class ApiDataSource {
    fetch() {
        console.log("Obtendo dados do serviço remoto...");
        return [
            { id: 1, valor: 120 },
            { id: 2, valor: 340 }
        ];
    }
}

class JsonReportBuilder {
    build(title, payload) {
        console.log("Convertendo informações para JSON...");
        return JSON.stringify({ titulo: title, registros: payload });
    }
}

class StorageWriter {
    write(file, content) {
        console.log(`Gravando conteúdo em ${file}...`);
        console.log("Arquivo gravado com sucesso!");
    }
}

function criarRelatorio() {
    const fonte = new ApiDataSource();
    const construtor = new JsonReportBuilder();
    const escritor = new StorageWriter();

    const dados = fonte.fetch();
    const relatorio = construtor.build("Relatório Financeiro", dados);
    escritor.write("relatorio.json", relatorio);
}

criarRelatorio();
