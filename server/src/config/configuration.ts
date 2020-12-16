export default () => ({
  auth: {
    ttl: {'SuperAdmin': 155520000},
    secretOrKey: 'hi@$#$T46btrtges',
    accessToken_cookie: 'klool'
  },

  app_name: "checkin", //english
  app_name_he: "צ'ק אין", //hebrew

  roleAccess: {
    superAdmin: {
      components: [
        "SuperAdminMenu",
        "SuperAdminRoute",
        "SAdminAddGames",
        "SAdminGames",
        "SAdminGamesList",
        "SAdminEditGames",
        "SAdminSchools"
      ],
      defaultHomePage: "SAdminGames"
    },
    teacher: {
      components: [
      ],
      defaultHomePage: "SAdminGames"
    },
    superTeacher: {
      components: [
      ],
      defaultHomePage: "SAdminGames"
    },
    student: {
      components: [
      ],
      defaultHomePage: "SAdminGames"
    }
  }
});
