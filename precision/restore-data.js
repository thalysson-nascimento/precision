const Database = require('better-sqlite3');

try {
  const dbBackup = new Database('./prisma/dev-backup.db');
  const dbAtual = new Database('./prisma/dev.db');

  console.log("🔄 Iniciando migração de dados do backup...");

  // 1. Puxar os dados dos Employees do backup
  const employees = dbBackup.prepare("SELECT * FROM Employee").all();
  console.log(`📋 Encontrados ${employees.length} funcionários no backup.`);

  // 2. Inserir um por um no banco novo atualizado
  const insertEmployee = dbAtual.prepare(`
    INSERT INTO Employee (id, name, email, role, workStart, lunchStart, lunchEnd, workEnd, createdAt)
    VALUES (@id, @name, @email, @role, @workStart, @lunchStart, @lunchEnd, @workEnd, @createdAt)
  `);

  // Rodar como transação para ser rápido e seguro
  const insertMany = dbAtual.transaction((data) => {
    for (const emp of data) {
      insertEmployee.run(emp);
    }
  });

  insertMany(employees);
  console.log("✅ Funcionários restaurados com sucesso!");

} catch (err) {
  console.error("❌ Erro ao restaurar os dados:", err.message);
}
