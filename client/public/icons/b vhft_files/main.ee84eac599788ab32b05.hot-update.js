webpackHotUpdate("main",{

/***/ "./src/pages/superAdmin/EditSchool.jsx":
/*!*********************************************!*\
  !*** ./src/pages/superAdmin/EditSchool.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _component_superAdmin_SchoolClassData_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/superAdmin/SchoolClassData.jsx */ "./src/component/superAdmin/SchoolClassData.jsx");
/* harmony import */ var _component_superAdmin_ArrowNavBar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/superAdmin/ArrowNavBar.jsx */ "./src/component/superAdmin/ArrowNavBar.jsx");
/* harmony import */ var _style_superAdmin_edit_school_style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../style/superAdmin/edit_school_style.scss */ "./src/style/superAdmin/edit_school_style.scss");
/* harmony import */ var _style_superAdmin_edit_school_style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_superAdmin_edit_school_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_superAdmin_form_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../style/superAdmin/form_style.scss */ "./src/style/superAdmin/form_style.scss");
/* harmony import */ var _style_superAdmin_form_style_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_superAdmin_form_style_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_superAdmin_white_bar_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../style/superAdmin/white_bar_style.css */ "./src/style/superAdmin/white_bar_style.css");
/* harmony import */ var _style_superAdmin_white_bar_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_superAdmin_white_bar_style_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _stores_schools_store_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../stores/schools.store.js */ "./src/stores/schools.store.js");
/* harmony import */ var _stores_error_store_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../stores/error.store.js */ "./src/stores/error.store.js");
/* harmony import */ var _hilma_tools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @hilma/tools */ "./node_modules/@hilma/tools/dist/index.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");
/* harmony import */ var _tools_ValidationFunctions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../tools/ValidationFunctions */ "./src/tools/ValidationFunctions.js");
var _jsxFileName = "/home/carmel/projects/check-in/client/src/pages/superAdmin/EditSchool.jsx";













const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default;

class EditSchool extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super();

    this.deleteSchool = e => {
      e.preventDefault();
      let success = this.props.schools.deleteSchool();

      if (success) {
        this.props.history.goBack();
      } else {
        this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, לא היה ניתן למחוק את בית הספר.');
      }
    };

    this.addClassToSchool = e => {
      e.preventDefault();
      this.setState(prevState => {
        let tempData = [...prevState.classes, {
          id: prevState.classes.length !== 0 ? prevState.classes[prevState.classes.length - 1].id + 1 : 1,
          name: '',
          numTeachers: 1,
          chosenTeachers: [],
          classNameError: {
            toShow: 'none',
            mess: ''
          }
        }];
        return {
          classes: tempData
        };
      });
    };

    this.chooseTeacher = e => {
      let index = e.name;
      let value = e.value;
      let selectKey = e.selectKey;
      let id = e.id;
      this.setState(prevState => {
        let tempData = [...prevState.classes];
        tempData[index].chosenTeachers[selectKey] = {
          id: id,
          name: value
        };
        return {
          classes: tempData
        };
      });
    };

    this.handleChange = e => {
      if (e.target.name === 'schoolName') {
        this.setState({
          schoolName: e.target.value
        });
      } else if (e.target.name === 'schoolCity') {
        this.setState({
          schoolCity: e.target.value
        });
      } else {
        let [fieldChangeName, classChangeIndex] = e.target.name.split('_');
        let classNameValue = e.target.value;
        this.setState(prevState => {
          let tempData = [...prevState.classes];
          tempData[parseInt(classChangeIndex)][fieldChangeName] = classNameValue;
          return {
            classes: tempData
          };
        });
      }
    };

    this.addTeacherToClass = classIndex => {
      this.setState(prevState => {
        let tempData = [...prevState.classes];
        tempData[classIndex].chosenTeachers.push({
          id: -1 * tempData[classIndex].chosenTeachers.length,
          name: 'בחר...'
        }); //id -1 did not exist and he wont show him

        return {
          classes: tempData
        };
      });
    };

    this.removeTeacherFromClass = (classIndex, teacherIndex) => {
      this.setState(prevState => {
        let tempData = [...prevState.classes];
        tempData[classIndex].chosenTeachers.splice(teacherIndex, 1);
        return {
          classes: tempData
        };
      });
    };

    this.removeClass = classIndex => {
      this.setState(prevState => {
        let tempData = [...prevState.classes];
        let removedClassroom = tempData.splice(classIndex, 1);
        prevState.removedClasses.push(removedClassroom);
        return {
          classes: tempData,
          removedClasses: prevState.removedClasses
        };
      });
    };

    this.saveData = async e => {
      e.preventDefault();
      let allOk = true;
      /* data validetion  */
      // ----------school name validation-------------------

      let nameSchoolMess = Object(_tools_ValidationFunctions__WEBPACK_IMPORTED_MODULE_11__["nameValidation"])(this.state.schoolName);

      if (nameSchoolMess.length !== 0) {
        this.setState(prevState => {
          prevState.schoolNameError.toShow = "inline-block";
          prevState.schoolNameError.mess = nameSchoolMess;
          return {
            schoolNameError: prevState.schoolNameError
          };
        });
        allOk = false;
      } else {
        this.setState({
          schoolNameError: {
            toShow: "none",
            mess: ""
          }
        });
        allOk = true;
      } // ----------school city validation-------------------


      let citySchoolMess = Object(_tools_ValidationFunctions__WEBPACK_IMPORTED_MODULE_11__["nameValidation"])(this.state.schoolCity);

      if (citySchoolMess.length !== 0) {
        this.setState(prevState => {
          prevState.schoolCityError.toShow = "inline-block";
          prevState.schoolCityError.mess = citySchoolMess;
          return {
            schoolCityError: prevState.schoolCityError
          };
        });
        allOk = false;
      } else {
        this.setState({
          schoolCityError: {
            toShow: "none",
            mess: ""
          }
        });
        allOk = true;
      } // ----------classes name validation-------------------


      for (let i = 0; i < this.state.classes.length; i++) {
        let nameClassMess = Object(_tools_ValidationFunctions__WEBPACK_IMPORTED_MODULE_11__["classNameValidation"])(this.state.classes[i].name);

        if (nameClassMess.length !== 0) {
          this.setState(prevState => {
            prevState.classes[i].classNameError.toShow = "inline-block";
            prevState.classes[i].classNameError.mess = nameClassMess;
            return {
              classes: prevState.classes
            };
          });
          allOk = false;
        } else {
          this.setState(prevState => {
            prevState.classes[i].classNameError.toShow = "none";
            prevState.classes[i].classNameError.mess = "";
            return {
              classes: prevState.classes
            };
          });
          allOk = true;
        }
      } //after all the validetion we need to send the data to sql


      if (allOk) {
        console.log('this.state: ', this.state);

        try {
          let {
            data
          } = await axios.post("/api/school/editSchool", {
            info: {
              id: this.props.schools.chosenSchool.id,
              schoolName: this.state.schoolName,
              schoolCity: this.state.schoolCity,
              classes: this.state.classes,
              removedClasses: this.state.removedClasses,
              existClasses: this.state.existClasses
            }
          });
          console.log('data: ', data); // if (data) {
          //   this.props.schools.addSchool({
          //     city: this.state.schoolCity,
          //     name: this.state.schoolName,
          //     id: data.id,
          //   })
          // this.props.history.goBack(); // after saving go back
        } catch (err) {
          this.props.errorMsg.setErrorMsg('שגיאה בשרת, בית הספר לא נשמר, נסו שוב.');
        }
      }
    };

    this.state = {
      schoolNameError: {
        toShow: "none",
        mess: ""
      },
      schoolName: "",
      schoolCityError: {
        toShow: "none",
        mess: ""
      },
      schoolCity: "",
      //List of all the classes in the school. The numTeachers represent the number of teachers in the class.
      classes: [],
      removedClasses: [],
      existClasses: []
    };
  }

  componentDidMount() {
    if (this.props.schools.chosenSchool.classrooms === undefined) {
      this.props.errorMsg.setErrorMsg('הייתה שגיאה בשרת, אנא נסו שנית');
    } else {
      this.setState({
        schoolName: this.props.schools.chosenSchool.name,
        schoolCity: this.props.schools.chosenSchool.city,
        classes: this.props.schools.chosenSchool.classrooms,
        existClasses: this.props.schools.chosenSchool.classrooms
      });
    }
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "withMenu",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_superAdmin_ArrowNavBar_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 9
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      className: "formData",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 220,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      for: "schoolName",
      className: "labelFields",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 11
      }
    }, "\u05E9\u05DD \u05D1\u05D9\u05EA \u05E1\u05E4\u05E8:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      class: "error",
      style: {
        display: this.state.schoolNameError.toShow
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 224,
        columnNumber: 11
      }
    }, this.state.schoolNameError.mess), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "inputFields",
      value: this.state.schoolName //The input will show schoolName.
      ,
      name: "schoolName",
      onChange: this.handleChange //In charge of on the set state of schoolName.
      ,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      for: "schoolCity",
      className: "labelFields",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237,
        columnNumber: 11
      }
    }, "\u05E2\u05D9\u05E8:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "error",
      style: {
        display: this.state.schoolCityError.toShow
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 240,
        columnNumber: 11
      }
    }, this.state.schoolCityError.mess), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "inputFields",
      defaultValue: this.state.schoolCity //The input will show schoolCity.
      ,
      name: "schoolCity",
      onBlur: this.handleChange //In charge of on the set state of schoolCity.
      ,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "labelFields",
      for: "schoolClasses",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 253,
        columnNumber: 11
      }
    }, "\u05DB\u05D9\u05EA\u05D5\u05EA:"), //Pass on all the classes in the list and make them the class component (with the name and the teacher's selects).
    this.state.classes.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 260,
        columnNumber: 15
      }
    }, "\u05DC\u05D1\u05D9\u05EA \u05E1\u05E4\u05E8 \u05D6\u05D4 \u05D0\u05D9\u05DF \u05DB\u05D9\u05EA\u05D5\u05EA") : this.state.classes.map((classData, classIndex) => {
      //The component get the class data as props.classData.
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_superAdmin_SchoolClassData_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        key: classData.id,
        canAddExistTeacher: true,
        classData: classData,
        classIndex: classIndex,
        addTeacherToClass: this.addTeacherToClass,
        handleChange: this.handleChange,
        chooseTeacher: this.chooseTeacher,
        removeTeacherFromClass: this.removeTeacherFromClass,
        removeClass: this.removeClass,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 265,
          columnNumber: 21
        }
      });
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "editSchoolAddClass",
      type: "button",
      onClick: this.addClassToSchool //Add class to the list.
      ,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 11
      }
    }, "\u05D4\u05D5\u05E1\u05E3 \u05DB\u05D9\u05EA\u05D4"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "spacerFromSaveButton",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 287,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "saveButtonBackground",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 288,
        columnNumber: 11
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "deletButton",
      onClick: this.deleteSchool,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 289,
        columnNumber: 13
      }
    }, "\u05DE\u05D7\u05E7 \u05D1\u05D9\u05EA \u05E1\u05E4\u05E8"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "saveButton",
      onClick: this.saveData,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 290,
        columnNumber: 13
      }
    }, "\u05E9\u05DE\u05D5\u05E8"))));
  }

}

const mapContextToProps = {
  schools: _stores_schools_store_js__WEBPACK_IMPORTED_MODULE_7__["schoolsContext"],
  errorMsg: _stores_error_store_js__WEBPACK_IMPORTED_MODULE_8__["errorMsgContext"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_hilma_tools__WEBPACK_IMPORTED_MODULE_9__["withContext"])(mapContextToProps)(Object(mobx_react__WEBPACK_IMPORTED_MODULE_10__["observer"])(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(EditSchool))));

/***/ })

})
//# sourceMappingURL=main.ee84eac599788ab32b05.hot-update.js.map