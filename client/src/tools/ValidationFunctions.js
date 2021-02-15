//Check validation for user name
export function userNameValidation(userName) {
    if (userName === null || userName.length === 0) {
        return '** חייב להכניס כתובת מייל **'
    } else if (userName.length > 30 || userName.length < 8) {
        return '** כתובת מייל לא תקין **'
    } else if (userName.trim().length === 0) {
        return '** כתובת מייל לא תקין **'
    } else if ((/[!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`\s]/).test(userName)) {
        return '** כתובת מייל לא תקין **'
    } else if (!(/[A-Za-z\u0590-\u05EA0-9]/).test(userName)) {
        return '** כתובת מייל לא תקין **'
    }  else {
        return ''
    }
}

//Check validation for names (teacher, student, school or game name)
export function nameValidation(name) {
    if (name === null || name.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (name.length > 30) {
        return '** שדה זה לא יכול להכיל יותר מ-30 תווים **'
    } else if (name.trim().length === 0) {
        return '** שם זה לא תקין **'
    }  else if ((/[@#$%^&*()_+=[\]{};:\\|<>/~`]/).test(name)) {
        return '** שדה זה לא יכול להכיל תווים מיוחדים **'
    } else if (name.includes('"') || name.includes("'") || name.includes(',') || name.includes('-')) {
        return '** שם זה לא תקין **'
    } else {
        return ''
    }
}

//Check validation for names (teacher, student, school or game name)
export function fieldNameValidation(name) {
    if (name === null || name.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (name.length > 50) {
        return '** שדה זה לא יכול להכיל יותר מ-30 תווים **'
    } else if (name.trim().length === 0) {
        return '** שם זה לא תקין **'
    }  else if ((/[@#$%^&*()_+=[\]{};:\\|<>/~`]/).test(name)) {
        return '** שדה זה לא יכול להכיל תווים מיוחדים **'
    } else if (name.includes('"') || name.includes("'") || name.includes(',') || name.includes('-')) {
        return '** שם זה לא תקין **'
    } else {
        return ''
    }
}

//Check validation for class name
export function classNameValidation(name) {
    if (name === null || name.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (name.length > 10) {
        return '** שדה זה לא יכול להכיל יותר מ-10 תווים **'
    }  else if (name.trim().length === 0) {
        return '** שם זה לא תקין **'
    } else if ((/[a-z]/).test(name) || (/[A-Z]/).test(name) || (/[!@#$%^&*()_+,=[\]{};:\\|<>/?~`]/).test(name)) {
        return '** שדה זה לא יכול להכיל אותיות באנגלית או תווים מיוחדים **'
    } else if (name.includes('"') || name.includes("'") || name.includes('.') || name.includes('-')) {
        if (!((/[\u0590-\u05FF]+[",-]+[\u0590-\u05FF]/).test(name) || (/[\u0590-\u05FF]+[']/).test(name) || (/[\u0590-\u05FF]+[.]/).test(name))) {
            return '** שם זה לא תקין **'
        }
        return ''
    } else {
        return ''
    }
}

//Check validation for password
export function passwordValidation(password) {
    if (password === null || password.length === 0) {
        return '** חייב להכניס סיסמא **'
    } else if (password.length > 30 || password.length < 8) {
        return '** סיסמא לא תקינה **'
    } else if (password.trim().length === 0) {
        return '** סיסמא לא תקינה **'
    } else if (!(/[!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]/).test(password)) {
        return '** סיסמא לא תקינה **'
    } else if (!(/[A-Za-z\u0590-\u05EA0-9]/).test(password)) {
        return '** סיסמא לא תקינה **'
    } else {
        return ''
    }
}


//Check validation for email
export function emailValidation(email) {
    if (email === null || email.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (email.trim().length === 0) {
        return '** כתובת איימל לא תקינה **'
    }  else if (!(/[a-zA-Z0-9]+@+[a-zA-Z]+.+[a-zA-Z0-9]/).test(email)) {
        return '** כתובת איימל לא תקינה **'
    } else {
        return ''
    }
}

//Check validation for inputs that the user must field
//it's not matter how he field them... 
export function mustInputValidation(input) {
    if (input === null || input.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (input.trim().length === 0) {
        return  '** נא למלא שדה זה **'
    } else if (input.length > 30) {
        return '** שדה זה לא יכול להכיל יותר מ-30 תווים **'
    }  else if (!(/[A-Za-z\u0590-\u05EA0-9!@#$"%^,.&*()_+=[\]{};:\\|<>/?~\s]/).test(input)) {
        return '** שדה זה לא תקין **'
    } else if (input.includes('"') || input.includes("'") || input.includes('-')) {
        return '** שם זה לא תקין **'
    }else {
        return ''
    }
}

//validation for description field in game
export function descriptionValidation(desc) {
    if (desc === null || desc.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (desc.length > 30) {
        return '** שדה זה לא יכול להכיל יותר מ-30 תווים **'
    } else if (!(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/).test(desc)) {
        return '** שדה זה לא תקין **'
    } else if (desc.includes('"') || desc.includes("'") || desc.includes('-') || desc.includes("?") || desc.includes("!") || desc.includes("&") || desc.includes("%") || desc.includes("`") ) {
        return '** שם זה לא תקין **'
    }else {
        return ''
    }
}

//validation for requirement field in game
export function requirementValidation(reqs) {
    if (reqs === null || reqs.length === 0) {
        return ''
    } else if (reqs.length > 100) {
        return '** שדה זה לא יכול להכיל יותר מ-100 תווים **'
    } else if (!(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/).test(reqs)) {
        return '** שדה זה לא תקין **'
    } else if (reqs.includes('"') || reqs.includes("'") || reqs.includes('-') || reqs.includes("?") || reqs.includes("!") || reqs.includes("&") || reqs.includes("%") || reqs.includes("`") ) {
        return '** שם זה לא תקין **'
    }else {
        return ''
    }
}

//Check validation for fields inputs
export function fieldInputValidation(input) {
    if (input === null || input.length === 0) {
        return '** נא למלא שדה זה **'
    } else if (input.length > 100) {
        return '** שדה זה לא יכול להכיל יותר מ-100 תווים **'
    } else if (input.trim().length === 0) {
        return '** שם זה לא תקין **'
    }  else if ((/[@#$%^&*()_+=[\]{};:\\|<>/~`]/).test(input)) {
        return '** שדה זה לא יכול להכיל תווים מיוחדים **'
    } else if (input.includes('"') || input.includes("'") || input.includes(',') || input.includes('-')) {
        return '** שם זה לא תקין **'
    } else {
        return ''
    }
}