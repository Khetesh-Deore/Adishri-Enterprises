const mongoose = require('mongoose');

const CLOUD_URI = 'mongodb+srv://khetesh:Khetesh%40123@adishri.zybxdok.mongodb.net/adishri-db?retryWrites=true&w=majority';

async function checkConnection() {
  try {
    await mongoose.connect(CLOUD_URI);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections:');
    for (const coll of collections) {
      const count = await mongoose.connection.db.collection(coll.name).countDocuments();
      console.log(`   - ${coll.name}: ${count} documents`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkConnection();
