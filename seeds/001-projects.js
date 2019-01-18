
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Complete Sprint-Challenge_RDBMS',
          description:
            'Get the sprint completed either on time or before lunch ends. On time would be great.',
        },
      ]);
    });
};
