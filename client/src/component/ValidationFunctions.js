//Check validation for user name
export function userNameValidation(userName) {
    if (userName.length === 0) {
        return '** חייב להכניס שם משתמש **'
    } else if (userName.length > 30 || userName.length < 8) {
        return '** שם משתמש לא תקין **'
    } else if (!(/[!@#$"%^,.&*()_+\=\[\]{}'-;:\\|<>\/?~`\s]/).test(userName)) {
        return '** שם משתמש לא תקין **'
    } else {
        return ''
    }
}

//Check validation for names (teacher, student or school)
export function nameValidation(name) {
    if (name.length === 0) {
        return '** חייב להכניס שדה זה **'
    } else if (name.length > 30) {
        return '** שדה זה לא יכול להכיל יותר מ-30 תווים **'
    } else if ((/[a-z]/).test(name) || (/[A-Z]/).test(name) || (/[!@#$%^&*()_+\=\[\]{};:\\|<>\/?~`]/).test(name)) {
        return '** שדה זה חייב לא יכול להכיל אותיות באנגלית או תווים מיוחדים **'
    } else if (name.includes('"') || name.includes("'") || name.includes('.') || name.includes(',') || name.includes('-')) {
        return '** שם זה לא תקין **'
    } else {
        return ''
    }
}

//Check validation for class name
export function classNameValidation(name) {
    if (name.length === 0) {
        return '** חייב להכניס שדה זה **'
    } else if (name.length > 10) {
        return '** שדה זה לא יכול להכיל יותר מ-10 תווים **'
    } else if ((/[a-z]/).test(name) || (/[A-Z]/).test(name) || (/[!@#$%^&*()_+,\=\[\]{};:\\|<>\/?~`]/).test(name)) {
        return '** שדה זה חייב לא יכול להכיל אותיות באנגלית או תווים מיוחדים **'
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
    if (password.length === 0) {
        return '** חייב להכניס סיסמא **'
    } else if (password.length < 30 || password.length < 8) {
        return '** סיסמא לא תקינה **'
    }else if (!(/[!@#$"%^,.&*()_+\=\[\]{}'-;:\\|<>\/?~`\s]/).test(password)) {
        return '** סיסמא לא תקינה **'
    } else {
        return ''
    }
}


//Check validation for email
export function emailValidation(email) {
    if (email.length === 0) {
        return '** חייב להכניס שדה זה **'
    } else if (!(/[a-zA-Z0-9]+@+[a-zA-Z]+.+[a-zA-Z0-9]/).test(email)) {
        return '** כתובת איימל לא תקינה **'
    } else {
        return ''
    }
}

//Check validation for inputs that the user must field
//it's not matter how he field them... 
export function mustInputValidation(input) {
    if (input.length === 0) {
        return '** חייב להכניס שדה זה **'
    } else {
        return ''
    }
}