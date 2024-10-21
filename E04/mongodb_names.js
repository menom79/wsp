const { MongoClient } = require('mongodb');
const yargs = require('yargs');

const uri = 'mongodb://127.0.0.1:27017/album_app?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db('nameApp');
    const collection = db.collection('names');

    const argv = yargs.argv;
    const firstName = argv._[0];
    const lastName = argv._[1];

    if (firstName && lastName) {
      await collection.insertOne({ firstName, lastName });
      console.log(`Added: ${firstName} ${lastName}`);
    } else {
      const names = await collection.find({}).toArray();
      console.log("List of names:");
      names.forEach(name => console.log(`${name.firstName} ${name.lastName}`));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
