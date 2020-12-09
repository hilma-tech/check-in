export default () => ({
  auth: {
    ttl: {'SuperAdmin': 155520000000},
    secretOrKey: 'hi@$#$T46btrtges',
    accessToken_cookie: 'klool'
  },

  app_name: 'checkin', //english

  app_name_he: "צ'ק אין", //hebrew

  roleAccess: {
    "superAdmin": {
      components: [
        'SuperAdminMenu',
        'SuperAdminRoute',
        'SAdminAddGames',
        'SAdminGames',
        'SAdminGamesList',
        "SAdminEditGames"
      ],
      defaultHomePage: 'SAdminGames',
    },
  },
});
