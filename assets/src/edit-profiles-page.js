import "./edit-profiles-page.scss";

jQuery(document).ready(function () {
    (function ($) {
        const addNewButton = $(".wrap .page-title-action").first();
        const importModalButton = $(
            '<button class="page-title-action">Import WSU Profiles</button>'
        );
        const modalContainerPlaceholder = $(
            `<div id="edit-profiles-page-modal-placeholder" style="display:none;"></div>`
        );
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
            const nids = profileNidsTextarea
                .val()
                .split("\n")
                .map((e) => e.trim())
                .join("\\n");

            notice.addClass("hidden");
            noticeMessage.text("");

            if (nids.trim() !== "") {
                spinner.addClass("is-active");
                submitButton.prop("disabled", true);

                const response = await fetch(
                    EDIT_PROFILE_PAGE_DATA.siteUrl +
                        "/wp-json/people-directory-api/v1/import-profiles",
                    {
                        method: "POST",
                        body: new URLSearchParams({
                            nids: nids,
                        }),
                    }
                );

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
                tb_show(
                    "Import WSU Profiles",
                    "#TB_inline?inlineId=edit-profiles-page-modal-placeholder&width=300"
                );

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

            if (!EDIT_PROFILE_PAGE_DATA.universityOrganization) {
                notice.removeClass("hidden");
                noticeMessage.html(
                    `An organization slug must be selected on the <a href="/wp-admin/options-general.php?page=people_directory">People Directory settings page</a> before importing profiles.`
                );

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
