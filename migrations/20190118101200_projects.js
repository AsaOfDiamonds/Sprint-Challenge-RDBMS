
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function (tbl) {
        // Primary key
        tbl
        .increments()
        .primary()
        .notNullable();

        tbl.string('name', 128).notNullable();
        tbl.text('description').notNullable();
        tbl.boolean('completed').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    // rollback/undo the changes
    return knex.schema.dropTableIfExists('projects');
};
