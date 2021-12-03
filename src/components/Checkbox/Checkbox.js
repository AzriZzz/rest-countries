import { useState, useEffect } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";

const Checkbox = ({emitChild, defaultChecked, country}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#124a63" : "#fff",
    borderColor: isChecked ? "#124a63" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  const handleChange = (country) => {
    let storageFavourites = [];

    // retrieve data from if exist in localStorage
    if (localStorage.getItem("favourite")) {
      storageFavourites = JSON.parse(localStorage.getItem("favourite"));
    }

    // create a new favourite object
    const newFavourite = {
      ...country,
      favourite: (country.favourite = country.favourite ? false : true),
    };

    setIsChecked(newFavourite.favourite);

    // check whether if exist or not in the storage
    let found = storageFavourites.filter((el) => el.name === newFavourite.name);

    // push into array if not exist in storage and if favourite is true
    if (found.length === 0 && newFavourite.favourite) {
      storageFavourites.push(newFavourite);
    } else {
      storageFavourites = storageFavourites.filter(
        (el) => el.name !== newFavourite.name
      );
    }

    // setBarChart(storageFavourites);
    emitChild(storageFavourites)
    // save into local storage
    localStorage.setItem("favourite", JSON.stringify(storageFavourites));
  };

  useEffect(() => {
    setIsChecked(defaultChecked)
  }, [defaultChecked]);



  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={() => handleChange(country)}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg>
      </label>
    </div>
  );
};

export default Checkbox;
