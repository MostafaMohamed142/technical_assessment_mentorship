import { useState, useRef, useEffect } from "react";
Object.defineProperty(exports, "__esModule", { value: true });

var Dropdown = function (_a) {
    var Label = _a.Label, defaultValue = _a.defaultValue, options = _a.options, onSelection = _a.onSelection, className = _a.className;
    var _b = (0, useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = (0, useState)(defaultValue ? defaultValue.label : "Select an option"), selectedValue = _c[0], setSelectedValue = _c[1];
    var dropdownRef = (0, useRef)(null);
    (0, useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            return function () {
                window.removeEventListener('click', handleClickOutside);
            };
        };
        document.addEventListener('click', handleClickOutside);
    }, []);
    var toggleDropdown = function () {
        setIsOpen(!isOpen);
    };
    var handleOptionSelect = function (option) {
        setSelectedValue(option.label);
        setIsOpen(false);
        if (onSelection) {
            onSelection(option);
        }
    };
    return (<div className={"dropdown ".concat(className)} ref={dropdownRef}>
        <button className="btn btn-secondary" onClick={toggleDropdown}>
          {Label || selectedValue}
        </button>
        {isOpen && (<ul className="list-unstyled">
            {options.map(function (option, index) { return (<li key={index} className="dropdown-item pe-auto" onClick={function () { return handleOptionSelect(option); }}>
                {option.label}
              </li>); })}
          </ul>)}
      </div>);
};
const _default = Dropdown;
export { _default as default };
