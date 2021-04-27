import { env } from "process";

export default () => ({
  auth: {
    ttl: { 'SuperAdmin': 2592000000, 'Teacher': 2592000000 },
    secretOrKey: 'hi@$#$T46btrtges',
    accessToken_cookie: 'klool',
    reset_password_email: {
			changePath: `/teacher/changePass`,
			html: `<div style="direction: rtl; background-color: whitesmoke;">
      <div style="padding: 10px;">
      <h3 style="color: #043163; font-size: 17px;">ברוכים השבים לצ'ק אין!</h3>
      <p style="font-size: 17px; margin-top: -3px;">לחצו על הקישור <a href="${env.DOMAIN}/api/teacher/changePassword?token={{token}}">כאן</a> על מנת לשנות את ססמתכם לאתר</p>
      <h3 style="color: #043163;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h3>
      <p style="font-size: 10px; color: red;">*במידה ולא ביקשתם לשנות את ססמתכם, אנא התעלמו מאימייל זה</p>
      </div>
      </div>`,
			text: `<h1>"שינוי סיסמה"</h1>`,
			subject: `שינוי סיסמה`
		},
    verification_email: {
      welcome_to:`<div><h1>"צ'ק אין"</h1></div>` ,
      verifyPath: '/teacher/verify',
      html:
       `<div style= "direction:rtl"><h1>ברוכים הבאים לצ'ק אין!</h1>
      <p >נשאר רק עוד צעד קטן כדי לסיים את ההרשמה שלכם!</p>
      <p>לחצו על הקישור <a href="http://localhost:${env.DOMAIN}/api/teacher/Verify?token={{token}}">כאן</a> כדי לאמת את כתובת המייל</p>
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
        "TeacherPremissions",
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
