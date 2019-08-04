import React from "react";
import useId from "./utils.js";

const styles = {
    formGroup: {
        marginBottom: "5px"
    },

    valueField: {
        paddingTop: "10px",
        marginBottom: 0,
    },  
};

export default function ValueField(props) {
    const id = useId();
    return (
        <div styles={styles.valueField}>
            <div styles={styles.formGroup}>
                <label htmlFor={id.current}>
                    <b>
                        {props.field.name}
                    </b>
                    <br />
                    <small>
                        {props.field.explanation}
                    </small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id={id.current}
                    placeholder={props.field.placeholder}
                    onChange={e => props.onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
