const db = require('./index');

async function testConnection() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🎉 БД работает! Текущее время:', result.rows[0].now);
    
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

testConnection();
