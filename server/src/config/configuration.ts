export default () => ({
  auth: {
    ttl: {'SuperAdmin': 2592000000, 'Teacher': 2592000000},
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
        "SAdminSchools",
        "SAdminStudents",
        "SAdminTeachers",
        "SAdminEditSchools",
        "SAdminEditTeachers",
        "SAdminEditStudents",
        "SAdminAddTeachers",
        "SAdminAddStudents"
      ],
      defaultHomePage: "SAdminGames"
    },
    teacher: {
      components: [
        "TeacherRoute",
        "TeacherClasses",
        "SmallTeacherRoute",
        "TeacherEditGame",
        "TeacherShowGame",
        "TeacherStudentInfo",
        "TeacherStudentsList",
      ],
      defaultHomePage: "TeacherClasses"
    },
    superTeacher: {
      components: [
        "TeacherRoute",
        "TeacherClasses",
        "SmallTeacherRoute",
        "TeacherEditGame",
        "TeacherShowGame",
        "TeacherStudentInfo",
        "TeacherStudentsList",
      ],
      defaultHomePage: "SAdminGames"
    },
    student: {
      components: [
      ],
      defaultHomePage: "SAdminGames"
    },
  }
});
