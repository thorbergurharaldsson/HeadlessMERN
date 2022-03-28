import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ text, options, onSelect }) => {
  const [isActive, setIsActive] = useState();

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={styles.buttonBrowse}
        aria-label={text}
        onClick={() => setIsActive(!isActive)}
      >
        {text}

        {isActive && (
          <DropdownMenu
            setIsActive={setIsActive}
            options={options}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};

const DropdownMenu = ({ setIsActive, options, onSelect }) => {
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsActive(false);
    },
  });
  return (
    <div className={styles.dropdownMenu} ref={ref}>
      {options.map((option, index) => (
        <div
          className={styles.dropdownButton}
          key={index}
          onClick={() => onSelect(option.id)}
        >
          <h5>{option.text}</h5>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
