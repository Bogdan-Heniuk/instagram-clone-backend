
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('posts', t => {
        t.increments('id')
        t.integer('user_id')
        t.string('description')
        t.string('image')
        t.integer('likes').defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
}
