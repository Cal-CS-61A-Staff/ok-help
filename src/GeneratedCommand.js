import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Textfit } from "react-textfit";

import "./GeneratedCommand.css";

const {useState} = React;

const styles = {
    command: {
        flexGrow: 1,
        fontSize: "24px",
        width: "calc(100% - 110px)",
        lineHeight: "42px",
    },

    copyButton: {
        width: "100px",
        height: "42px",
        marginLeft: "5px",
        verticalAlign: "middle",
        color: "white",
        fontSize: "18px",
        fontFamily: "Calibri, sans-serif",
        float: "right",
    },

    generatedCommand: {
        border: "2px black solid",
        padding: "8px",
        fontFamily: "Inconsolata, monospace",
        textAlign: "center",
        userSelect: "all",
        display: "flex",
     },
};

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
        <div styles={styles.generatedCommand}>
            <div styles={styles.command}>
                <Textfit mode="single" forceSingleModeWidth={false} max={28}>
                    <code>
                        {generated}
                    </code>
                </Textfit>
            </div>
            <div>
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
                    <button className="btn btn-primary" styles={styles.copyButton} type="button">
                        <span>{copyText}</span>
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
}
