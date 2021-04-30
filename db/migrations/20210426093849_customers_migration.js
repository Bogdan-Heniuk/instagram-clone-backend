
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('customers', t => {
      t.increments('id')
      t.string('username')
      t.string('password')
      t.string('email').unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers')
};
