import React from "react";
import "./Category.css";
import CheckBox from "./CheckBox.js";
import ValueField from "./ValueField.js";

const styles = {
    activated: {
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },

    category: {
        border: "1px solid gray",
        marginTop: "10px",
        padding: '10px',
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
        transition: "opacity 0.2s ease-in",
    },

    deactivated: {
        opacity: 0.5,
    },

    'deactivated:hover': {
        cursor: "pointer",
        /*box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3),*/
        opacity: 1,
    },
};

export default function Category(props) {
    const checkBoxes = props.category.optionalArgs.map((arg, index) => {
        if (arg.isValue) {
            return (
                <ValueField
                    field={arg}
                    key={index}
                    onChange={val => props.setOption(arg.longForm, val)}
                />
            );
        } else {
            return (
                <CheckBox
                    flag={arg}
                    key={index}
                    onChange={val => props.setOption(arg.longForm, val)}
                />
            );
        }
    });

    const activeStyle = props.active ? styles.activated : styles.deactivated;

    const className = `${props.active ? "activated" : "deactivated"}`;

    return (
        <div className="col-lg-3">
            <div className={className} style={styles.category} onClick={props.onClick}>
                <h3>
                    {props.category.name}
                </h3>
                <div className="text-muted">
                    {props.category.explanation}
                </div>
                <div>
                    {checkBoxes}
                </div>
            </div>
        </div>
    );
}
