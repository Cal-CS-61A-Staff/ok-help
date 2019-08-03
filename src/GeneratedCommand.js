import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./GeneratedCommand.css";

export default function GeneratedCommand(props) {
    const [copyText, setCopyText] = useState("Copy");

    let generated = "python3 ok";
    if (props.options) {
        for (const option of props.options.mandatoryArgs) {
            if (option.shortForm) {
                generated += ` -${option.shortForm}`;
            } else {
                generated += ` --${option.longForm}`;
            }
        }
        for (const option of props.options.optionalArgs) {
            if (props.selectedArgs[option.longForm]) {
                if (option.shortForm) {
                    generated += ` -${option.shortForm}`;
                } else {
                    generated += ` --${option.longForm}`;
                }
                if (option.isValue) {
                    generated += ` ${props.selectedArgs[option.longForm]}`;
                }
            }
        }
    }

    return (
        <div className="GeneratedCommand">
            <div className="Command">
                <code>
                    {generated}
                </code>
            </div>
            <div className="CopyButtonContainer">
                <CopyToClipboard
                    text={generated}
                    onCopy={() => {
                        setCopyText("Copied!");
                        setTimeout(() => {
                            setCopyText("Copy");
                        }, 1000);
                        document.activeElement.blur();
                    }}
                >
                    <button className="btn btn-primary CopyButton" type="button">
                        <span>{copyText}</span>
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
}
