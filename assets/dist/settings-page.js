/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/settings-page.scss":
/*!********************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/settings-page.scss ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/settings-page.js ***!
  \******************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-page.scss */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/settings-page.scss");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


jQuery(document).ready(function () {
  (function ($) {
    const settingsPageBody = $(".settings_page_people_directory");
    const notice = settingsPageBody.find(".notice");
    const noticeMessage = notice.find(".message");
    const orgSelectControl = $("#university-org-select");
    const createFormToggle = $("#university-org-create-toggle");
    const createForm = $("#university-org-create-form");
    const formFields = {
      tagName: createForm.find("#tag-name"),
      tagSlug: createForm.find("#tag-slug"),
      tagParent: createForm.find("#parent"),
      tagDescription: createForm.find("#tag-description")
    };
    const importProfilesButton = $("#import-profiles-btn");
    const profileNidsTextarea = $("#profile-nids");
    const apiEndpoint = window.location.hostname.includes(".local") ? "http://peopleapi.local/wp-json/peopleapi/v1/" : "https://people.wsu.edu/wp-json/peopleapi/v1/";
    let groupedOrgs;
    const notificationClasses = {
      error: "notice-error notice-alt",
      success: "notice-success"
    };
    function buildOptionsString(options) {
      let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      let space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      const currentOrg = orgSelectControl.attr("data-value");
      options.forEach(option => {
        value += `<option value="${option.slug}" ${currentOrg === option.slug && "selected"}>${space.replace(/ /g, "\u00a0") + option.name}</option>`;
        if (groupedOrgs[option.term_id]) {
          value = buildOptionsString(groupedOrgs[option.term_id], value, space + "   ");
        }
      });
      return value;
    }
    function showNotification(type, message) {
      notice.removeClass("hidden");
      notice.addClass(notificationClasses[type]);
      noticeMessage.text(message);
    }
    function resetNotification(notification) {
      notification.addClass("hidden");
      notification.removeClass("notice-error notice-alt notice-success");
      noticeMessage.text("");
    }
    async function updateOrgSelectControls() {
      const response = await fetch(apiEndpoint + "get-all-terms?taxonomy=wsuwp_university_org");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          groupedOrgs = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.groupBy)(data, "parent");
          const optionsString = buildOptionsString(groupedOrgs[0]);
          orgSelectControl.append(optionsString);
          formFields.tagParent.append(optionsString);
        }
      }
    }
    async function submitCreateForm(e) {
      resetNotification(notice);
      const response = await fetch(apiEndpoint + "create-organization", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: new URLSearchParams({
          tag_name: formFields.tagName.val(),
          tag_slug: formFields.tagSlug.val(),
          tag_parent: formFields.tagParent.val(),
          tag_description: formFields.tagDescription.val()
        })
      });
      const data = await response.json();
      if (!response.ok) {
        showNotification("error", data.message);
        return;
      }

      // update opptions
      orgSelectControl.attr("data-value", data.slug);
      updateOrgSelectControls();

      // reset
      formFields.tagName.val("");
      formFields.tagSlug.val("");
      formFields.tagDescription.val("");
      createForm.hide();
    }
    async function importProfiles(e) {
      const nids = profileNidsTextarea.val().split("\n").map(e => e.trim()).join("\\n");
      resetNotification(notice);
      if (nids.trim() !== "") {
        const response = await fetch("/wp-json/people-directory-api/v1/import-profiles", {
          method: "POST",
          body: new URLSearchParams({
            nids: nids
          })
        });
        if (response.ok) {
          const data = await response.json();
          profileNidsTextarea.val("");
          showNotification("success", data.message);
        } else {
          const data = await response.json();
          showNotification("error", data.message);
        }
      } else {
        showNotification("error", "The nids field cannot be empty.");
      }
    }
    function bindEvents() {
      createFormToggle.on("click", function (e) {
        createForm.show();
        return false;
      });
      createForm.find("#submit").on("click", submitCreateForm);
      importProfilesButton.on("click", importProfiles);
    }
    function init() {
      updateOrgSelectControls();
      bindEvents();
    }
    init();
  })(jQuery);
});
}();
/******/ })()
;
//# sourceMappingURL=settings-page.js.map