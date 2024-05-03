import React from "react";

const CustomTextArea = (props) => {
  return (
    <div className="my-4">
      <label
        htmlFor={props.id}
        className="block text-md font-medium text-gray-700"
      >
        {props.label}
      </label>
      <textarea
        id={props.id}
        name={props.name}
        className="mt-1 p-2 block w-full h-36 border-2 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      />
    </div>
  );
};

export default CustomTextArea;
