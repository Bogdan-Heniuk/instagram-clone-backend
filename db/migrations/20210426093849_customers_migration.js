
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', t => {
      t.increments('id')
      t.string('username')
      t.string('name')
      t.string('password')
      t.string('email').unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
