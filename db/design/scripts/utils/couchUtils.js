const {nano, dbname} = require('./config');

const createDBIfNotExists = async () => {
  try {
    // Try to get as its more efficient than trigerring an error each time
    await nano.db.get(dbname)
    console.info('DB already exists')
  } catch (getError) {

    console.info(getError.message + 'đ¤Ģ')

    try {
      await nano.db.create(dbname)
      console.info('DB created đ')

    } catch (createError) {
      console.error('Error creating DB đĩ', createError.message)
    }
  }
  return nano.use(dbname)
}

// Upsert a specific document
const updateDocument = async (db, schema) => {
  try {
    console.info(`âšī¸ Updating document '${schema._id}'`)
    let dbSchema = await db.get(schema._id);

    // {...schema, ...dbSchema} used to fix insert vs update
    // Remove system fields to create a comparable object
    let {_id, _rev, ...comparableObj} = {...dbSchema}

    delete schema._id

    // If schema changed
    if (JSON.stringify(comparableObj) !== JSON.stringify(schema)) {
      // Update with rev
      await db.insert({_id, _rev, ...schema})
      console.info('  Document updated đ')
    } else {
      console.info('  No update required')
    }

  } catch (error) {
    // Get failed, so let's insert it
    try {
      await db.insert({_id: schema._id, ...schema})
      console.info('  Document inserted đ')

    } catch (insertError) {
      console.error('  Error inserting document đĩ', insertError)
    }
  }
}

module.exports = {
  createDBIfNotExists,
  updateDocument
}