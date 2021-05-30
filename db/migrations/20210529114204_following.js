
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('following', t => {
        t.increments('id')
        t.integer('subscriber_id')
        t.integer('subscribed_id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('following')
};
