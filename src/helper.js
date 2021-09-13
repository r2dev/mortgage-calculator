import { useState, useCallback } from "react";

function useFloatInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [displayValue, setDisplayValue] = useState(defaultValue);

  const handleValueChange = useCallback((event) => {
    const re = /^([1-9][0-9]*)\.?[0-9]*$/;
    const reZero = /^0\..[0-9]*$/;
    const rawValue = event.target.value;
    if (
      rawValue === "" ||
      rawValue === "0" ||
      rawValue === "0." ||
      re.test(rawValue) ||
      reZero.test(rawValue)
    ) {
      let value = parseFloat(rawValue);
      if (isNaN(value)) {
        value = 0;
      }
      setValue(value);
      setDisplayValue(rawValue);
    }
  }, []);
  return [value, displayValue, handleValueChange];
}

function useUnsignedIntegerInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [displayValue, setDisplayValue] = useState(defaultValue);

  const handleValueChange = useCallback((event) => {
    const re = /^(0|[1-9][0-9]*)$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      let value = parseInt(event.target.value, 10);
      if (isNaN(value)) {
        value = 0;
      }
      setValue(value);
      setDisplayValue(event.target.value);
    }
  }, []);

  return [value, displayValue, handleValueChange];
}

function useSelectValue(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const handleSelectChange = useCallback(
    (event) => {
      let value = event.target.value;

      let numberValue = parseInt(value, 10);
      if (isNaN(numberValue)) {
        setValue(defaultValue);
      } else {
        setValue(numberValue);
      }
    },
    [defaultValue]
  );
  return [value, handleSelectChange];
}

export { useSelectValue, useUnsignedIntegerInput, useFloatInput };
