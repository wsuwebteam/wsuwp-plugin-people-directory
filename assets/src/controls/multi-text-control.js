import { TextControl, Button } from "@wordpress/components";
import { useState, useEffect, useRef } from "@wordpress/element";

const CSSNAMESPACE = "wsu-gutenberg-people-directory-multi-text-control";

const MultiTextControl = (props) => {
    let { label, values, onChange, isFallbackData, placeholder, insertText } =
        props;

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

    return (
        <>
            <label class="components-base-control__label">{label}</label>

            {values.length ? (
                values.map((v, index) => {
                    const opt = {};
                    opt[attr] = v;

                    if (v === "") {
                        opt["placeholder"] = placeholder;
                    }

                    return (
                        <div className={`${CSSNAMESPACE}__value`}>
                            <TextControl
                                key={index}
                                onChange={(newValue) =>
                                    handleChange(index, newValue)
                                }
                                {...opt}
                            />
                            {values.length > 1 && (
                                <Button
                                    isDestructive={true}
                                    isSmall={true}
                                    className={`${CSSNAMESPACE}__remove-btn`}
                                    icon="no-alt"
                                    onClick={() => removeValue(index)}
                                />
                            )}
                        </div>
                    );
                })
            ) : (
                <TextControl
                    placeholder={placeholder}
                    onChange={(newValue) => handleChange(0, newValue)}
                />
            )}

            <Button
                className={`${CSSNAMESPACE}__insert-btn`}
                text={insertText}
                variant="secondary"
                onClick={insertValue}
            />
        </>
    );
};

export default MultiTextControl;
