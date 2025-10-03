const fs = require('fs');
const db = require('./index');

async function setupDatabase() {
  try {
    console.log('📦 Создаём таблицы...');
    
    const schema = fs.readFileSync('./src/db/schema.sql', 'utf8');
    
    await db.query(schema);
    
    console.log('✅ Таблицы созданы!');
    
    const tables = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Таблицы в БД:');
    tables.rows.forEach(row => console.log('  -', row.table_name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

setupDatabase();
