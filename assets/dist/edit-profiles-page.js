/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/edit-profiles-page.scss":
/*!*************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/edit-profiles-page.scss ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!***********************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/edit-profiles-page.js ***!
  \***********************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_profiles_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-profiles-page.scss */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/edit-profiles-page.scss");

jQuery(document).ready(function () {
  (function ($) {
    const addNewButton = $(".wrap .page-title-action").first();
    const importModalButton = $('<button class="page-title-action">Import WSU Profiles</button>');
    const modalContainerPlaceholder = $(`<div id="edit-profiles-page-modal-placeholder" style="display:none;"></div>`);
    const modalContent = `
            <div class="form-wrap edit-profiles-page-modal">
                <div class="notice notice-error notice-alt inline hidden">
                    <p class="error"></p>
                </div>
                <div class="form-field">
                    <label for="profile-nids">List profile nids to import. One per line.</label>
                    <textarea id="profile-nids" class="profile-nids" rows="5" placeholder="butch.cougar"></textarea>
                </div>
                <p class="submit">
                    <button type="button" name="submit" id="submit" class="button button-primary">Import Profiles</button>
                    <span class="spinner"></span>
                </p>
            </div>`;
    let modalContainer;
    function injectModalContent(container, content) {
      container.html(content);
      $(document.body).append(container);
    }
    function injectImportButton(btn) {
      addNewButton.after(btn);
    }
    async function submitImportForm(e) {
      const spinner = modalContainer.find(".spinner");
      const notice = modalContainer.find(".notice");
      const noticeMessage = modalContainer.find(".error");
      const submitButton = modalContainer.find("#submit");
      const profileNidsTextarea = modalContainer.find("#profile-nids");
      const nids = profileNidsTextarea.val().split("\n").map(e => e.trim()).join("\\n");
      notice.addClass("hidden");
      noticeMessage.text("");
      if (nids.trim() !== "") {
        spinner.addClass("is-active");
        submitButton.prop("disabled", true);
        const response = await fetch("/wp-json/people-directory-api/v1/import-profiles", {
          method: "POST",
          body: new URLSearchParams({
            nids: nids
          })
        });
        if (response.ok) {
          profileNidsTextarea.val("");
          location.reload();
        } else {
          const data = await response.json();
          spinner.removeClass("is-active");
          notice.removeClass("hidden");
          noticeMessage.text(data.message);
          submitButton.prop("disabled", false);
        }
      } else {
        notice.removeClass("hidden");
        noticeMessage.text("The nids field cannot be empty.");
        submitButton.prop("disabled", false);
      }
    }
    function bindEvents() {
      importModalButton.on("click", function (e) {
        tb_show("Import WSU Profiles", "#TB_inline?inlineId=edit-profiles-page-modal-placeholder&width=300");
        modalContainer = $(".edit-profiles-page-modal").first();
        modalContainer.find("#submit").on("click", submitImportForm);
        checkOrgSetting();
      });
    }
    function checkOrgSetting() {
      const notice = modalContainer.find(".notice");
      const noticeMessage = modalContainer.find(".error");
      const submitButton = modalContainer.find("#submit");
      notice.addClass("hidden");
      noticeMessage.html("");
      if (!editProfilePageData.universityOrganization) {
        notice.removeClass("hidden");
        noticeMessage.html(`An organization slug must be selected on the <a href="/wp-admin/options-general.php?page=people_directory">People Directory settings page</a> before importing profiles.`);
        submitButton.prop("disabled", true);
      }
    }
    function init() {
      injectModalContent(modalContainerPlaceholder, modalContent);
      injectImportButton(importModalButton);
      bindEvents();
    }
    init();
  })(jQuery);
});
}();
/******/ })()
;
//# sourceMappingURL=edit-profiles-page.js.map