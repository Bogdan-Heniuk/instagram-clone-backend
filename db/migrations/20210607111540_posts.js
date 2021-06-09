
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('posts', t => {
        t.increments('id')
        t.integer('user_id')
        t.text('description')
        t.string('image')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
}
