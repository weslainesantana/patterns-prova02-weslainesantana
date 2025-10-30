class WorkItem {
  showDetails(indent = 0) {
    throw new Error("Método showDetails() deve ser implementado.");
  }
}

// === Folha: Tarefa individual ===
class Task extends WorkItem {
  constructor(name) {
    super();
    this.name = name;
  }

  showDetails(indent = 0) {
    console.log(`${" ".repeat(indent)}📌 Tarefa: ${this.name}`);
  }
}

// === Composite: Projeto que contém tarefas e subprojetos ===
class Project extends WorkItem {
  constructor(name) {
    super();
    this.name = name;
    this.items = []; // pode conter Tasks ou outros Projects
  }

  add(item) {
    this.items.push(item);
  }

  remove(item) {
    this.items = this.items.filter(i => i !== item);
  }

  showDetails(indent = 0) {
    console.log(`${" ".repeat(indent)}📁 Projeto: ${this.name}`);
    this.items.forEach(item => item.showDetails(indent + 2));
  }
}

// === Cliente ===

// Tarefas simples
const t1 = new Task("Escrever documentação");
const t2 = new Task("Fazer testes");
const t3 = new Task("Desenhar interface");

// Subprojeto
const subProject = new Project("Frontend");
subProject.add(t3);

// Projeto principal
const mainProject = new Project("Lançamento v1.0");
mainProject.add(t1);
mainProject.add(t2);
mainProject.add(subProject);

// === Saída ===
mainProject.showDetails();