import {
    BaseControl,
    TextControl,
    ToggleControl,
    Button,
    Popover,
} from "@wordpress/components";
import { useState, useEffect, useRef } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import {
    InnerBlocks,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";
// import { useCopyToClipboard } from "@wordpress/compose";

import MultiTextControl from "../../controls/multi-text-control";

import "./styles.scss";

const CSSNAMESPACE = "wsu-gutenberg-people-directory-profile";

export default function Edit({
    className,
    clientId,
    attributes,
    setAttributes,
    ...props
}) {
    const { editPost } = useDispatch("core/editor");
    const [showCopied, setShowCopied] = useState(false);

    const { defaultPostTitle, defaultPostMeta } = useSelect((select) => {
        const editor = select("core/editor");
        return {
            defaultPostTitle: editor.getEditedPostAttribute("title"),
            defaultPostMeta: editor.getEditedPostAttribute("meta"),
        };
    });

    const { photoPreview, hasResolvedPhoto, isCustomPhoto } = useSelect(
        (select) => {
            // return fallback photo if a custom one is not selected
            if (!defaultPostMeta.wsuwp_photo) {
                return {
                    photoPreview: defaultPostMeta._wsuwp_fallback_photo,
                    hasResolvedPhoto: true,
                    isCustomPhoto: false,
                };
            }

            // load custom selected photo
            const selectedPhoto = select("core").getMedia(
                defaultPostMeta.wsuwp_photo
            );

            const hasResolvedPhoto = select("core/data").hasFinishedResolution(
                "core",
                "getMedia",
                [defaultPostMeta.wsuwp_photo]
            );

            if (hasResolvedPhoto) {
                return {
                    photoPreview: selectedPhoto
                        ? selectedPhoto.source_url
                        : defaultPostMeta._wsuwp_fallback_photo,
                    hasResolvedPhoto: true,
                    isCustomPhoto: selectedPhoto ? true : false,
                };
            }

            // return empty until we have a photo resolution
            return {
                photoPreview: "",
                hasResolvedPhoto: false,
                isCustomPhoto: false,
            };
        },
        [defaultPostMeta]
    );

    const [postTitle, setPostTitle] = useState(defaultPostTitle);
    const [postMeta, setPostMeta] = useState({
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
        photo: defaultPostMeta.wsuwp_photo,
    });

    // const copyNid = useCopyToClipboard(
    //     defaultPostMeta._wsuwp_nid,
    //     function (ref) {
    //         setShowCopied(() => true);
    //     }
    // );

    function updateMetaField(key, value) {
        setPostMeta((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    useEffect(() => {
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
                wsuwp_photo: postMeta.photo,
            },
        });
    }, [postMeta]);

    // update post title
    useNonMountEffect(() => {
        const firstName =
            postMeta.first_name || defaultPostMeta._wsuwp_fallback_first_name;
        const middleName =
            postMeta.middle_name || defaultPostMeta._wsuwp_fallback_middle_name;
        const lastName =
            postMeta.last_name || defaultPostMeta._wsuwp_fallback_last_name;
        const fullName = `${lastName}, ${firstName} ${middleName}`.trim();

        setPostTitle(fullName);
        editPost({ title: fullName });
    }, [postMeta.first_name, postMeta.middle_name, postMeta.last_name]);

    return (
        <>
            <div className={CSSNAMESPACE}>
                <div className={`${CSSNAMESPACE}__header`}>
                    {postTitle && (
                        <h1 className={`${CSSNAMESPACE}__post-title`}>
                            {postTitle}
                        </h1>
                    )}
                    {defaultPostMeta._wsuwp_nid && (
                        <div className={`${CSSNAMESPACE}__nid`}>
                            {showCopied && (
                                <Popover
                                    className={`${CSSNAMESPACE}__nid-copy-notice`}
                                    placement="top-end"
                                >
                                    Copied!
                                </Popover>
                            )}
                            <TextControl
                                className={`${CSSNAMESPACE}__nid-input`}
                                value={defaultPostMeta._wsuwp_nid}
                                disabled
                            />
                            <Button
                                // ref={copyNid}
                                className={`${CSSNAMESPACE}__nid-copy-btn`}
                                label="Copy"
                                icon="admin-page"
                            ></Button>
                        </div>
                    )}
                </div>

                <div className={`${CSSNAMESPACE}__editor`}>
                    <div className={`${CSSNAMESPACE}__editor-left-column`}>
                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <div className={`${CSSNAMESPACE}__photo-field`}>
                                {hasResolvedPhoto && photoPreview && (
                                    <img
                                        className={`${CSSNAMESPACE}__photo`}
                                        src={photoPreview}
                                    />
                                )}
                            </div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        updateMetaField("photo", media.id)
                                    }
                                    allowedTypes={["image"]}
                                    multiple={false}
                                    gallery={false}
                                    value={postMeta.photo}
                                    render={({ open }) => (
                                        <BaseControl>
                                            <Button
                                                isPrimary={true}
                                                onClick={open}
                                                className={`${CSSNAMESPACE}__photo-upload-btn`}
                                            >
                                                {photoPreview
                                                    ? "Change Photo"
                                                    : "Select Photo"}
                                            </Button>

                                            {isCustomPhoto ? (
                                                <Button
                                                    isDestructive={true}
                                                    onClick={() =>
                                                        updateMetaField(
                                                            "photo",
                                                            0
                                                        )
                                                    }
                                                    className={`${CSSNAMESPACE}__photo-remove-btn`}
                                                    text="Remove Photo"
                                                />
                                            ) : null}
                                        </BaseControl>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>

                    <div className={`${CSSNAMESPACE}__editor-right-column`}>
                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="First Name"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_first_name
                                }
                                onChange={(value) =>
                                    updateMetaField("first_name", value)
                                }
                                value={postMeta.first_name}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Middle Name"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_middle_name
                                }
                                onChange={(value) =>
                                    updateMetaField("middle_name", value)
                                }
                                value={postMeta.middle_name}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Last Name"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_last_name
                                }
                                onChange={(value) =>
                                    updateMetaField("last_name", value)
                                }
                                value={postMeta.last_name}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Display Name"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_display_name
                                }
                                onChange={(value) =>
                                    updateMetaField("display_name", value)
                                }
                                value={postMeta.display_name}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <MultiTextControl
                                label="Title(s)"
                                onChange={(value) =>
                                    updateMetaField("title", value)
                                }
                                insertText="Add another title"
                                isFallbackData={postMeta.title.length === 0}
                                placeholder="Enter job title"
                                values={
                                    postMeta.title.length
                                        ? postMeta.title
                                        : defaultPostMeta._wsuwp_fallback_title
                                }
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Phone Number"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_phone
                                }
                                onChange={(value) =>
                                    updateMetaField("phone", value)
                                }
                                value={postMeta.phone}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Email"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_email
                                }
                                onChange={(value) =>
                                    updateMetaField("email", value)
                                }
                                value={postMeta.email}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Office"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_office
                                }
                                onChange={(value) =>
                                    updateMetaField("office", value)
                                }
                                value={postMeta.office}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Address"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_address
                                }
                                onChange={(value) =>
                                    updateMetaField("address", value)
                                }
                                value={postMeta.address}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <TextControl
                                label="Website"
                                className={`${CSSNAMESPACE}__text-control`}
                                placeholder={
                                    defaultPostMeta._wsuwp_fallback_website ||
                                    "Enter website URL"
                                }
                                onChange={(value) =>
                                    updateMetaField("website", value)
                                }
                                value={postMeta.website}
                            />
                        </div>

                        <div className={`${CSSNAMESPACE}__edit-field`}>
                            <MultiTextControl
                                label="Degree(s)"
                                onChange={(value) =>
                                    updateMetaField("degree", value)
                                }
                                insertText="Add another degree"
                                isFallbackData={postMeta.degree.length === 0}
                                placeholder="Enter degree"
                                values={
                                    postMeta.degree.length
                                        ? postMeta.degree
                                        : defaultPostMeta._wsuwp_fallback_degree
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className={`${CSSNAMESPACE}__bio-container`}>
                    <div className={`${CSSNAMESPACE}__bio-header`}>
                        <h2>Biography</h2>

                        <ToggleControl
                            label="Use custom bio"
                            className={`${CSSNAMESPACE}__bio-type-toggle`}
                            checked={attributes.hasCustomBio}
                            onChange={() =>
                                setAttributes({
                                    hasCustomBio: !attributes.hasCustomBio,
                                })
                            }
                        />
                    </div>

                    {attributes.hasCustomBio ? (
                        <InnerBlocks
                            template={[
                                [
                                    "core/paragraph",
                                    { placeholder: "Enter biography content." },
                                ],
                            ]}
                            allowedBlocks={[
                                "core/paragraph",
                                "core/heading",
                                "core/list",
                                "core/quote",
                                "wsuwp/button",
                                "core/separator",
                                "wsuwp/row",
                                "core/image",
                                "core/gallery",
                            ]}
                            templateLock={false}
                        />
                    ) : defaultPostMeta._wsuwp_fallback_bio.trim() === "" ? (
                        <p>
                            <i>No content to display.</i>
                        </p>
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: defaultPostMeta._wsuwp_fallback_bio,
                            }}
                        ></div>
                    )}
                </div>
            </div>
        </>
    );
}

const useNonMountEffect = (effect, dependencies) => {
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) {
            const unmount = effect();
            return () => unmount && unmount();
        } else {
            mounted.current = true;
        }
    }, dependencies);

    // Reset on unmount for the next mount.
    useEffect(() => {
        return () => (mounted.current = false);
    }, []);
};
