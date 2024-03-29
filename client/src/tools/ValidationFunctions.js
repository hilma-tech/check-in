import { EmptMsg } from "./GlobalVarbs";

//Check validation for user name
export function userNameValidation(userName) {
  if (userName === null || userName.length === 0) {
    return "** חייב להכניס שם משתמש **";
  } else if (userName.length > 15 || userName.length < 4) {
    return "** שם משתמש צריך להכיל 4-15 תווים **";
  } else if (userName.trim().length === 0) {
    return "** שם משתמש לא תקין **";
  } else if (!/[A-Za-z\u0590-\u05EA0-9?!-_]/.test(userName)) {
    return "** שם משתמש לא תקין **";
  } else if (/[@#$%^&*()+=[\]{};:,.\\|<>/~`\s]/.test(userName)) {
    return "** שם משתמש לא תקין **";
  } else {
    return EmptMsg;
  }
}

//check loom link
export function linkValidation(link) {
  if (!link) {
    return EmptMsg;
  } else if (link === null || link.length === 0) {
    return EmptMsg;
  } else if (link.length > 255) {
    return "** שדה זה לא יכול להכיל יותר מ-255 תווים **";
  } else if (
    !/^$|(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(link)
  ) {
    return "** שדה זה לא תקין **";
  } else {
    return EmptMsg;
  }
}

//Check validation for names (teacher, student or game name)
export function nameValidation(name) {
  if (name === null || name.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (name.trim().length === 0) {
    return "** נא למלא שדה זה **";
  } else if (name.length > 30) {
    return "** שדה זה לא יכול להכיל יותר מ-30 תווים **";
  } else if (/[@#$%^&*()_+=[\]{};:,.\\|<>/~`0-9]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else if (!/[A-Za-z\u0590-\u05EA"'-.\s]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else {
    return EmptMsg;
  }
}

//Check validation for school name
export function schoolNameValidation(name) {
  if (name === null || name.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (name.length > 30) {
    return "** שדה זה לא יכול להכיל יותר מ-30 תווים **";
  } else if (name.trim().length === 0) {
    return "** נא למלא שדה זה **";
  } else if (/[@#$%^&*()_+=[\]{};:\\|<>/~`]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else if (/[0-9]/.test(name)) {
    return "** שדה זה לא יכול להכיל מספרים **";
  }else if (!/[A-Za-z\u0590-\u05EA"'-]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else {
    return EmptMsg;
  }
}

//Check validation for names (teacher, student, school or game name)
export function fieldNameValidation(name) {
  if (name === null || name.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (name.length > 50) {
    return "** שדה זה לא יכול להכיל יותר מ-30 תווים **";
  } else if (name.trim().length === 0) {
    return "** שם זה לא תקין **";
  } else if (/[@#$%^&*()_+=[\]{};:\\|<>/~`!?]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else if (
    name.includes('"') ||
    name.includes("'") ||
    name.includes(",") ||
    name.includes("-")
  ) {
    return "** שם זה לא תקין **";
  } else {
    return EmptMsg;
  }
}

//Check validation for class name
export function classNameValidation(name) {
  if (name === null || name.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (name.length > 4) {
    return "** שדה זה לא יכול להכיל יותר מ-4 תווים **";
  } else if (name.trim().length === 0) {
    return "** שם זה לא תקין **";
  } else if (/[!@#$%^&*()_+,=[\]{};:\\|<>/?~`]/.test(name)) {
    return "** שדה זה לא יכול להכיל אותיות באנגלית או תווים מיוחדים **";
  } else if (!/[A-Za-z\u0590-\u05EA0-9"'-]/.test(name)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else {
    return EmptMsg;
  }
}

//Check validation for sign in password
export function passwordValidation(password) {
  if (password === null || password.length === 0) {
    return "** נא להכניס סיסמא **";
  } else if (password.length > 20 || password.length < 6) {
    return "** על הסיסמא להיות בין 6-20 תווים **";
  } else if (password.trim().length === 0) {
    return "** סיסמה לא תקינה **";
    //   } else if (/[!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]/.test(password)) {
    //     return "** על הסיסמא להכל אותיות ומספרים בלבד  **";
  } else if (!/[A-Za-z\u0590-\u05EA0-9]/.test(password)) {
    return "** סיסמא לא תקינה **";
  } else {
    return EmptMsg;
  }
}

// password for teacher
export function teacherPasswordValidation(password) {
  if (
    password === null ||
    password.length === 0 ||
    password.trim().length === 0
  ) {
    return "** נא להכניס סיסמא **";
  } else if (password.length > 15 || password.length < 8) {
    return "** על הסיסמה להיות בין 8-15 תווים **";
  } else if (/\s/.test(password) === true) {
    return "** על הסיסמא להכל אותיות ומספרים בלבד  **";
  } else if (/[\u0590-\u05EA]/.test(password) === true) {
    return "** על הסיסמא להכיל אותיות באנגלית בלבד  **";
  } else if (/[A-Za-z]/.test(password) === false) {
    return "** על הסיסמא להכיל לפחות אות אחת  **";
  } else if (/[0-9]/.test(password) === false) {
    return "** על הסיסמא להכיל לפחות מספר אחד  **";
  } else {
    return EmptMsg;
  }
}

//Check validation for password
export function studentPasswordValidation(password) {
  if (
    password === null ||
    password.length === 0 ||
    password.trim().length === 0
  ) {
    return "** נא להכניס סיסמה **";
  } else if (password.length > 15 || password.length < 8) {
    return "** על הסיסמה להיות בין 8-15 תווים **";
  } else if (!/^\S+$/.test(password)) {
    return "** הסיסמה לא יכולה להכיל רווחים **";
  } else if (
    !/[A-Za-z\u0590-\u05EA0-9!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]/.test(password)
  ) {
    return "** ניתן להשתמש באותיות באנגלית ובעברית, מספרים ותווים מיוחדים בלבד **";
  } else if (/[A-Za-z\u0590-\u05EA]/.test(password) === false) {
    return "** על הסיסמה להכיל לפחות אות אחת  **";
  } else if (/[0-9]/.test(password) === false) {
    return "** על הסיסמה להכיל לפחות מספר אחד  **";
  } else {
    return EmptMsg;
  }
}

//Check validation for email
export function emailValidation(email) {
  if (email === null || email.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (email.trim().length === 0) {
    return "** כתובת מייל לא תקינה **";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "** כתובת מייל לא תקינה **";
  } else if (
    !/^(([^<>()[\].,;:\s@\"]+(.[^<>()[\].,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\].,;:\s@\"]+.)+[^<>()[\].,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    return "** כתובת מייל לא תקינה **";
  } else {
    return EmptMsg;
  }
}

//Check validation for inputs that the user must field
//it's not matter how he field them...
export function mustInputValidation(input) {
  if (input === null || input.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (input.trim().length === 0) {
    return "** נא למלא שדה זה **";
  } else if (input.length > 30) {
    return "** שדה זה לא יכול להכיל יותר מ-30 תווים **";
  } else {
    return EmptMsg;
  }
}

export function stringValidation(input) {
  if(typeof input !== "string"){
    return "**string**";
  } else
  if (input === null || input.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (input.trim().length === 0) {
    return "** נא למלא שדה זה **";
  } else {
    return "";
  }
}

//validation for description field in game
export function descriptionValidation(desc) {
  if (desc === null || desc.length === 0) {
    return EmptMsg;
  } else if (desc.length > 255) {
    return "** שדה זה לא יכול להכיל יותר מ-255 תווים **";
  } else if (!/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/.test(desc)) {
    return "** שדה זה לא תקין **";
  } else if (
    desc.includes('"') ||
    desc.includes("'") ||
    desc.includes("-") ||
    desc.includes("?") ||
    desc.includes("!") ||
    desc.includes("&") ||
    desc.includes("%") ||
    desc.includes("`")
  ) {
    return "** שם זה לא תקין **";
  } else {
    return EmptMsg;
  }
}

//validation for requirement field in game
export function requirementValidation(reqs) {
  if (reqs === null || reqs.length === 0) {
    return EmptMsg;
  } else if (reqs.length > 255) {
    return "** שדה זה לא יכול להכיל יותר מ-255 תווים **";
  } else if (!/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/.test(reqs)) {
    return "** שדה זה לא תקין **";
  } else if (
    reqs.includes('"') ||
    reqs.includes("'") ||
    reqs.includes("-") ||
    reqs.includes("?") ||
    reqs.includes("!") ||
    reqs.includes("&") ||
    reqs.includes("%") ||
    reqs.includes("`")
  ) {
    return "** שם זה לא תקין **";
  } else {
    return EmptMsg;
  }
}

//Check validation for fields inputs
export function fieldInputValidation(input) {
  if (input === null || input.length === 0) {
    return "** נא למלא שדה זה **";
  } else if (input.length > 100) {
    return "** שדה זה לא יכול להכיל יותר מ-100 תווים **";
  } else if (input.trim().length === 0) {
    return "** שם זה לא תקין **";
  } else if (/[@#$%^&*()_+=[\]{};:\\|<>/~`]/.test(input)) {
    return "** שדה זה לא יכול להכיל תווים מיוחדים **";
  } else if (
    input.includes('"') ||
    input.includes("'") ||
    input.includes(",") ||
    input.includes("-")
  ) {
    return "** שם זה לא תקין **";
  } else {
    return EmptMsg;
  }
}

//Permission Time Validation
export function PermissionsValidation(per) {
  if (per === null || per.length === 0) {
    return "** יש להכניס הרשאה **";
  } else {
    let arrErr = per.map((permission) => {
      if (
        (!permission.startTime && !permission.endTime) ||
        !permission.endTime ||
        !permission.startTime
      ) {
        return "** יש להכניס זמני התחלה וסיום **";
      } else if (permission.startTime && permission.endTime) {
        var start = permission.startTime.split(":");
        var end = permission.endTime.split(":");
        if (parseInt(start[0]) > parseInt(end[0])) {
          if (per.length > 1) {
            return "** על זמן סיום ההרשאות להיות גדול מזמן התחלתן **";
          } else {
            return "** על זמן סיום ההרשאה להיות גדול מזמן התחלתה **";
          }
        } else if (
          parseInt(start[0]) === parseInt(end[0]) &&
          parseInt(start[1]) > parseInt(end[1])
        ) {
          if (per.length > 1) {
            return "** על זמן סיום ההרשאות להיות גדול מזמן התחלתן **";
          } else {
            return "** על זמן סיום ההרשאה להיות גדול מזמן התחלתה **";
          }
        }
      } else {
        return EmptMsg;
      }
    });
    return arrErr.filter((err) => err !== undefined);
  }
}
