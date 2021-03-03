import { env } from "process";

export default () => ({
  auth: {
    ttl: { 'SuperAdmin': 2592000000, 'Teacher': 2592000000 },
    secretOrKey: 'hi@$#$T46btrtges',
    accessToken_cookie: 'klool',
    verification_email: {
      welcome_to: "צ'ק אין",
      verifyPath: '/teacher/verify',
      html: `<a href="${env.PORT}/api/teacher/Verify">`,
      text: "ברוכים הבאים לצ'ק אין",
      logoDiv: null,
      logoPath: null
    }
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
