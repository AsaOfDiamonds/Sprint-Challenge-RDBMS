
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function (tbl) {
        // primary key
        tbl
        .increments()
        .primary()
        .notNullable();

        // foreign key
        tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects');

        tbl.string('description', 128).notNullable();
        tbl.text('notes').notNullable();
        tbl.boolean('completed').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    // rollback/undo the changes
    return knex.schema.dropTableIfExists('actions');
};
