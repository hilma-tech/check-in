import { env } from "process";

export default () => ({
  auth: {
    ttl: { 'SuperAdmin': 2592000000, 'Teacher': 2592000000 },
    secretOrKey: 'hi@$#$T46btrtges',
    accessToken_cookie: 'klool',
    verification_email: {
      welcome_to:`<div><h1>"צ'ק אין"</h1></div>` ,
      verifyPath: '/teacher/verify',
      html:
       `<div style= "direction:rtl"><h1>ברוכים הבאים לצ'ק אין!</h1>
      <p >נשאר רק עוד צעד קטן כדי לסיים את ההרשמה שלכם!</p>
      <p>לחצו על הקישור <a href="http://localhost:${env.PORT}/api/teacher/Verify?token={{token}}">כאן</a> כדי לאמת את כתובת המייל</p>
      {{{placeForLogo}}}
      </div>`,
      text: `<h1>"ברוכים הבאים לצ'ק אין"</h1>`,
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
        "SAdminAddStudents",
        "SAdminAddSchools"
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
