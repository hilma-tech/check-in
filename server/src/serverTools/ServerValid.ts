//Check validation for inputs that the user must field
//it's not matter how he field them...
module.exports.mustValid = function (input) {
  if (input === null || input.length === 0) {
      return '** נא למלא שדה זה **'
  } else if (input.trim().length === 0) {
      return  '** נא למלא שדה זה **'
  } else if (input.length > 100) {
      return '** שדה זה לא יכול להכיל יותר מ-100 תווים **'
  }  else if (!(/[A-Za-z\u0590-\u05EA0-9!@#$%^,.&*()_+=[\]{};:\\|<>/?~\s]/).test(input)) {
      return '** שדה זה לא תקין **'
  } else if (input.includes('"') || input.includes("'") || input.includes('-')) {
      return '** שדה זה לא תקין **'
  }else {
      return ''
  }
}
