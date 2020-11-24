export default () => ({
  auth: {
    ttl: {},
    secretOrKey: 'hi@$#$T46btrtges',
  },

  app_name: 'checkin', //english

  app_name_he: "צ'ק אין", //hebrew

  roleAccess: {
    "superAdmin": {
      components: [
        'SuperAdminRoute',
        'SAdminAddGames',
        'SAdminGames',
      ],
      defaultHomePage: 'SAdminGames',
    },
  },
});
