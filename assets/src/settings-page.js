import _groupBy from "lodash/groupBy";
import "./settings-page.scss";

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
			tagDescription: createForm.find("#tag-description"),
		};
		const listProfilesButton = $("#list-profiles-btn");
		const importProfilesButton = $("#import-profiles-btn");
		const importButtonSpinner = $(".wsu-import-submit__container .spinner");
		const profileNidsTextarea = $("#profile-nids");
		const unpublishProfilesCheckbox = $("#unpublish-profiles");

		const apiEndpoint = window.location.hostname.includes(".local")
			? "http://peopleapi.local/wp-json/peopleapi/v1/"
			: "https://people.wsu.edu/wp-json/peopleapi/v1/";
		let groupedOrgs;

		const notificationClasses = {
			error: "notice-error notice-alt",
			success: "notice-success",
		};

		function buildOptionsString(options, value = "", space = "") {
			const currentOrg = orgSelectControl.attr("data-value");

			options.forEach((option) => {
				value += `<option value="${option.slug}" ${
					currentOrg === option.slug && "selected"
				}>${space.replace(/ /g, "\u00a0") + option.name}</option>`;

				if (groupedOrgs[option.term_id]) {
					value = buildOptionsString(
						groupedOrgs[option.term_id],
						value,
						space + "   "
					);
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
			const response = await fetch(
				apiEndpoint + "get-all-terms?taxonomy=wsuwp_university_org"
			);

			if (response.ok) {
				const data = await response.json();

				if (Array.isArray(data)) {
					groupedOrgs = _groupBy(data, "parent");
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
					tag_description: formFields.tagDescription.val(),
				}),
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
			const nids = profileNidsTextarea
				.val()
				.split("\n")
				.map((e) => e.trim())
				.join("\\n");
			const unpublishProfiles = unpublishProfilesCheckbox.is(":checked");

			resetNotification(notice);

			if (nids.trim() !== "") {
				importProfilesButton.prop("disabled", true);
				importButtonSpinner.addClass("is-active");

				const response = await fetch(
					SETTINGS_PAGE_DATA.siteUrl +
						"/wp-json/people-directory-api/v1/import-profiles",
					{
						method: "POST",
						body: new URLSearchParams({
							nids: nids,
							unpublishProfiles: unpublishProfiles,
						}),
					}
				);

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

			importProfilesButton.prop("disabled", false);
			importButtonSpinner.removeClass("is-active");
		}

		function bindEvents() {
			createFormToggle.on("click", function (e) {
				createForm.show();
				return false;
			});

			createForm.find("#submit").on("click", submitCreateForm);

			importProfilesButton.on("click", importProfiles);

			listProfilesButton.on("click", function (e) {
				window.location.href +=
					(window.location.href.indexOf("?") > -1 ? "&" : "?") +
					"list-profiles=true";
			});
		}

		function init() {
			updateOrgSelectControls();
			bindEvents();
		}

		init();
	})(jQuery);
});
