import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import Save from "./save";

registerBlockType("wsuwp/people-directory-profile", {
    title: "Profile",
    icon: "admin-users",
    category: "text",
    attributes: {
        hasCustomBio: {
            type: "boolean",
            default: false,
        },
    },
    edit: Edit,
    save: Save,
});
