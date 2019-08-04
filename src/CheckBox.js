import React from "react";
import useId from "./utils.js";

const styles = {
    checkBox: {
        paddingTop: "10px",
    },
};

export default function CheckBox(props) {
    const id = useId();
    return (
        <div className="custom-control custom-checkbox" style={styles.checkbox}>
            <input
                type="checkbox"
                className="custom-control-input"
                id={id.current}
                onChange={e => props.onChange(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor={id.current}>
                <b>
                    {props.flag.name}
                </b>
                <br />
                <small>
                    {props.flag.explanation}
                </small>
            </label>
        </div>
    );
}
