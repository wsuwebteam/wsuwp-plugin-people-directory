/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/edit.js":
/*!************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/edit.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _controls_multi_text_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/multi-text-control */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/controls/multi-text-control.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.scss */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/styles.scss");








const CSSNAMESPACE = "wsu-gutenberg-people-directory-profile";
function Edit(_ref) {
  let {
    className,
    clientId,
    attributes,
    setAttributes,
    ...props
  } = _ref;
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)("core/editor");
  const [showCopied, setShowCopied] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    defaultPostTitle,
    defaultPostMeta
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const editor = select("core/editor");
    return {
      defaultPostTitle: editor.getEditedPostAttribute("title"),
      defaultPostMeta: editor.getEditedPostAttribute("meta")
    };
  });
  const {
    photoPreview,
    hasResolvedPhoto,
    isCustomPhoto
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    // return fallback photo if a custom one is not selected
    if (!defaultPostMeta.wsuwp_photo) {
      return {
        photoPreview: defaultPostMeta._wsuwp_fallback_photo,
        hasResolvedPhoto: true,
        isCustomPhoto: false
      };
    }

    // load custom selected photo
    const selectedPhoto = select("core").getMedia(defaultPostMeta.wsuwp_photo);
    const hasResolvedPhoto = select("core/data").hasFinishedResolution("core", "getMedia", [defaultPostMeta.wsuwp_photo]);
    if (hasResolvedPhoto) {
      return {
        photoPreview: selectedPhoto ? selectedPhoto.source_url : defaultPostMeta._wsuwp_fallback_photo,
        hasResolvedPhoto: true,
        isCustomPhoto: selectedPhoto ? true : false
      };
    }

    // return empty until we have a photo resolution
    return {
      photoPreview: "",
      hasResolvedPhoto: false,
      isCustomPhoto: false
    };
  }, [defaultPostMeta]);
  const [postTitle, setPostTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultPostTitle);
  const [postMeta, setPostMeta] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    first_name: defaultPostMeta.wsuwp_first_name,
    middle_name: defaultPostMeta.wsuwp_middle_name,
    last_name: defaultPostMeta.wsuwp_last_name,
    display_name: defaultPostMeta.wsuwp_display_name,
    title: defaultPostMeta.wsuwp_title,
    office: defaultPostMeta.wsuwp_office,
    address: defaultPostMeta.wsuwp_address,
    phone: defaultPostMeta.wsuwp_phone,
    email: defaultPostMeta.wsuwp_email,
    degree: defaultPostMeta.wsuwp_degree,
    website: defaultPostMeta.wsuwp_website,
    photo: defaultPostMeta.wsuwp_photo
  });
  const copyNid = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useCopyToClipboard)(defaultPostMeta._wsuwp_nid, function (ref) {
    setShowCopied(() => true);
  });
  function updateMetaField(key, value) {
    setPostMeta(prevState => ({
      ...prevState,
      [key]: value
    }));
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timeout = setTimeout(() => {
      setShowCopied(() => false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showCopied]);

  // update post meta
  useNonMountEffect(() => {
    editPost({
      meta: {
        wsuwp_first_name: postMeta.first_name,
        wsuwp_middle_name: postMeta.middle_name,
        wsuwp_last_name: postMeta.last_name,
        wsuwp_display_name: postMeta.display_name,
        wsuwp_title: postMeta.title,
        wsuwp_office: postMeta.office,
        wsuwp_address: postMeta.address,
        wsuwp_phone: postMeta.phone,
        wsuwp_email: postMeta.email,
        wsuwp_degree: postMeta.degree,
        wsuwp_website: postMeta.website,
        wsuwp_photo: postMeta.photo
      }
    });
  }, [postMeta]);

  // update post title
  useNonMountEffect(() => {
    const firstName = postMeta.first_name || defaultPostMeta._wsuwp_fallback_first_name;
    const middleName = postMeta.middle_name || defaultPostMeta._wsuwp_fallback_middle_name;
    const lastName = postMeta.last_name || defaultPostMeta._wsuwp_fallback_last_name;
    const fullName = `${lastName}, ${firstName} ${middleName}`.trim();
    setPostTitle(fullName);
    editPost({
      title: fullName
    });
  }, [postMeta.first_name, postMeta.middle_name, postMeta.last_name]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: CSSNAMESPACE
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__header`
  }, postTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: `${CSSNAMESPACE}__post-title`
  }, postTitle), defaultPostMeta._wsuwp_nid && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__nid`
  }, showCopied && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    className: `${CSSNAMESPACE}__nid-copy-notice`,
    placement: "top-end"
  }, "Copied!"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    className: `${CSSNAMESPACE}__nid-input`,
    value: defaultPostMeta._wsuwp_nid,
    disabled: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    ref: copyNid,
    className: `${CSSNAMESPACE}__nid-copy-btn`,
    label: "Copy",
    icon: "admin-page"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__editor`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__editor-left-column`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__photo-field`
  }, hasResolvedPhoto && photoPreview && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: `${CSSNAMESPACE}__photo`,
    src: photoPreview
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
    onSelect: media => updateMetaField("photo", media.id),
    allowedTypes: ["image"],
    multiple: false,
    gallery: false,
    value: postMeta.photo,
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        isPrimary: true,
        onClick: open,
        className: `${CSSNAMESPACE}__photo-upload-btn`
      }, photoPreview ? "Change Photo" : "Select Photo"), isCustomPhoto ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        isDestructive: true,
        onClick: () => updateMetaField("photo", 0),
        className: `${CSSNAMESPACE}__photo-remove-btn`,
        text: "Remove Photo"
      }) : null);
    }
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__editor-right-column`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "First Name",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_first_name,
    onChange: value => updateMetaField("first_name", value),
    value: postMeta.first_name
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Middle Name",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_middle_name,
    onChange: value => updateMetaField("middle_name", value),
    value: postMeta.middle_name
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Last Name",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_last_name,
    onChange: value => updateMetaField("last_name", value),
    value: postMeta.last_name
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Display Name",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_display_name,
    onChange: value => updateMetaField("display_name", value),
    value: postMeta.display_name
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controls_multi_text_control__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Title(s)",
    onChange: value => updateMetaField("title", value),
    insertText: "Add another title",
    isFallbackData: postMeta.title.length === 0,
    placeholder: "Enter job title",
    values: postMeta.title.length ? postMeta.title : defaultPostMeta._wsuwp_fallback_title
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Phone Number",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_phone,
    onChange: value => updateMetaField("phone", value),
    value: postMeta.phone
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Email",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_email,
    onChange: value => updateMetaField("email", value),
    value: postMeta.email
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Office",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_office,
    onChange: value => updateMetaField("office", value),
    value: postMeta.office
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Address",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_address,
    onChange: value => updateMetaField("address", value),
    value: postMeta.address
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Website",
    className: `${CSSNAMESPACE}__text-control`,
    placeholder: defaultPostMeta._wsuwp_fallback_website || "Enter website URL",
    onChange: value => updateMetaField("website", value),
    value: postMeta.website
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__edit-field`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controls_multi_text_control__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Degree(s)",
    onChange: value => updateMetaField("degree", value),
    insertText: "Add another degree",
    isFallbackData: postMeta.degree.length === 0,
    placeholder: "Enter degree",
    values: postMeta.degree.length ? postMeta.degree : defaultPostMeta._wsuwp_fallback_degree
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__bio-container`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${CSSNAMESPACE}__bio-header`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Biography"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: "Use custom bio",
    className: `${CSSNAMESPACE}__bio-type-toggle`,
    checked: attributes.hasCustomBio,
    onChange: () => setAttributes({
      hasCustomBio: !attributes.hasCustomBio
    })
  })), attributes.hasCustomBio ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
    template: [["core/paragraph", {
      placeholder: "Enter biography content."
    }]],
    allowedBlocks: ["core/paragraph", "core/heading", "core/list", "core/quote", "wsuwp/button", "core/separator", "wsuwp/row", "core/image", "core/gallery"],
    templateLock: false
  }) : defaultPostMeta._wsuwp_fallback_bio.trim() === "" ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, "No content to display.")) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: defaultPostMeta._wsuwp_fallback_bio
    }
  }))));
}
const useNonMountEffect = (effect, dependencies) => {
  const mounted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mounted.current) {
      const unmount = effect();
      return () => unmount && unmount();
    } else {
      mounted.current = true;
    }
  }, dependencies);

  // Reset on unmount for the next mount.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => mounted.current = false;
  }, []);
};

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/index.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/index.js ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/save.js");



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("wsuwp/people-directory-profile", {
  title: "Profile",
  icon: "admin-users",
  category: "text",
  attributes: {
    hasCustomBio: {
      type: "boolean",
      default: false
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/save.js":
/*!************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/save.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  InnerBlocks
} = wp.blockEditor;
const profileSave = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null);
};
/* harmony default export */ __webpack_exports__["default"] = (profileSave);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/controls/multi-text-control.js":
/*!********************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/controls/multi-text-control.js ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const CSSNAMESPACE = "wsu-gutenberg-people-directory-multi-text-control";
const MultiTextControl = props => {
  let {
    label,
    values,
    onChange,
    isFallbackData,
    placeholder,
    insertText
  } = props;
  const attr = isFallbackData ? "placeholder" : "value";
  values = values.length === 0 ? [""] : values;
  function handleChange(index, newValue) {
    const newValues = [...values];
    newValues[index] = newValue;
    onChange(newValues);
  }
  function insertValue() {
    onChange([...values, ""]);
  }
  function removeValue(index) {
    onChange(values.filter((el, idx) => idx !== index));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    class: "components-base-control__label"
  }, label), values.length ? values.map((v, index) => {
    const opt = {};
    opt[attr] = v;
    if (v === "") {
      opt["placeholder"] = placeholder;
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: `${CSSNAMESPACE}__value`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      key: index,
      onChange: newValue => handleChange(index, newValue)
    }, opt)), values.length > 1 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isDestructive: true,
      isSmall: true,
      className: `${CSSNAMESPACE}__remove-btn`,
      icon: "no-alt",
      onClick: () => removeValue(index)
    }));
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    placeholder: placeholder,
    onChange: newValue => handleChange(0, newValue)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: `${CSSNAMESPACE}__insert-btn`,
    text: insertText,
    variant: "secondary",
    onClick: insertValue
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (MultiTextControl);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/styles.scss":
/*!****************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/styles.scss ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

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
/*!*******************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/profile-editor.js ***!
  \*******************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/profile */ "../../../../../../../../../repos/wsu/wsuwp-plugin-people-directory/assets/src/blocks/profile/index.js");

}();
/******/ })()
;
//# sourceMappingURL=profile-editor.js.map