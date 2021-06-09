
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('saves', t => {
        t.increments('id')
        t.integer('user_id')
        t.integer('post_id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('saves')
};
