"use strict";

const Store          = require('flux/utils').Store;

const AppDispatcher  = require('../dispatcher/dispatcher')
    , ErrorConstants = require('../constants/error_constants');

let _errors = {};
let _form = "";

const ErrorStore = new Store(AppDispatcher);

function setErrors(payload){
  _errors = payload.errors;
  _form = payload.form;
  ErrorStore.__emitChange();
}

function clearErrors(){
  _errors = {};
  _form = "";
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      setErrors(payload);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      clearErrors();
      break;
  }
};

ErrorStore.formErrors = function (form) {
  if (form !== _form) {
    return {};
  }

  const result = {};
  for (let field in _errors) {
    if (_errors.hasOwnProperty(field)) {
      result[field] = Array.from(_errors[field]);
    }
  }

  return result;
};

ErrorStore.form = function() {
  return _form;
};

module.exports = ErrorStore;
