const Axios = require("axios").default
const ExistErrorStatus = 500
const OnUnauthorizedError = 401
const ShowStyle = "inline-block"
const HideStyle = "none"
const GetInfoErrorMsg = "הייתה שגיאה בשרת. לא ניתן לקבל מידע מהשרת."
const EmptMsg = ""
const Delete = "מחק"
const TeacherDeletedMsg = "המורה נמחק, נסה להתחבר עם משתמש אחר."

export {
    Axios,
    ExistErrorStatus,
    OnUnauthorizedError,
    ShowStyle,
    HideStyle,
    GetInfoErrorMsg,
    EmptMsg,
    Delete,
    TeacherDeletedMsg
}