export default () => ({
  auth: {
    ttl: {},
    secretOrKey: 'hi@$#$T46btrtges',
  },

  app_name: 'checkin', //english

  app_name_he: "צ'ק אין", //hebrew

  roleAccess: {
    SuperAdmin: {
      components: [
        'SuperAdminRoute',
        'SAdminHome',
        'SAdminSchools',
        'SAdminTeachers',
        'SAdminStudents',
        'SAdminAddStudents',
        'SAdminAddTeachers',
        'SAdminAddGames',
        'SAdminAddSchools',
        'SAdminEditGames',
        'SAdminEditSchools',
        'SAdminEditTeachers',
        'SAdminEditStudents',
        'SAdminSuspendedGames',
        'SAdminGames',
      ],
      defaultHomePage: 'SAdminHome',
    },
  },
});
