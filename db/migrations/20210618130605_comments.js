
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('comments', t => {
        t.increments('id')
        t.integer('user_id')
        t.integer('post_id')
        t.text('text')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments')
};
