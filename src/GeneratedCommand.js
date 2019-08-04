import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import $ from "jquery";

import { Textfit } from "react-textfit";

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
        userDelect: "all",
        display: "flex",
        background: "white",
        width: "100%",
        /*box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3),*/
    },

    sticky: {
        top: "-4px",
        left: "-2px",
        right: "-2px",
        background: "white",
        position: "fixed",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        zIndex: 9999,
    },
};

export default function GeneratedCommand(props) {
    const [copyText, setCopyText] = useState("Copy");

    const sensor = useRef();
    const ref = useRef();

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

    function stickTop() {
        const windowTop = $(window).scrollTop();
        const { top } = $(sensor.current).offset();
        if (windowTop > top) {
            $(sensor.current).height($(ref.current).outerHeight());
            $(ref.current).css(styles.sticky);
        } else {
            $(ref.current).removeAttr("style");
            $(sensor.current).height(0);
        }
    }

    $(window).scroll(stickTop);

    return (
        <>
            <div ref={sensor} />
            <div className="row" ref={ref}>
                <div className="col">
                    <div style={styles.generatedCommand}>
                        <div style={styles.command}>
                            <Textfit mode="single" forceSingleModeWidth={false} max={28}>
                                <code>
                                    {generated}
                                </code>
                            </Textfit>
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
                                <button className="btn btn-primary" style={styles.copyButton} type="button">
                                    <span>{copyText}</span>
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
