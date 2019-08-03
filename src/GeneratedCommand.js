import React from "react";

import "./GeneratedCommand.css";

export default function GeneratedCommand(props) {
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
            <code>
                {generated}
            </code>
        </div>
    );
}
