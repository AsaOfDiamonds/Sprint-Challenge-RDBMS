
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          project_id: 1,
          description: 'Create Server',
          notes: 'Use my created spread sheet to make server so I do not forget to add anything',
        },
        {
          project_id: 1,
          description: 'Create Migrations',
          notes: 'use spreadsheet created today to remember columns',
        },
        {
          project_id: 1,
          description: 'Plant the damn seeds',
          notes: 'Seeding is not needed yet, but I want to see the magic!',
        },
      ]);
    });
};
