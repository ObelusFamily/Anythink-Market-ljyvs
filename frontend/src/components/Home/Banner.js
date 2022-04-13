import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import debounce from "lodash.debounce";
import agent from "../../agent";

const logoStyle = {
  width: "100%",
};

const Banner = (props) => {
  const [showSearch, setShowSearch] = useState(false);

  const debouncedSearchHandler = debounce((text) => searchHandler(text), 300);
  let searchText = null;

  let searchHandler = (text) => {
    const lowerText = text.toLowerCase();

    if (!searchText && lowerText.length < 3) {
      return;
    }

    if (searchText && lowerText.length < 3) {
      searchText = null;
      props.onClear();
      return;
    }

    searchText = lowerText;
    props.onSearch(
      lowerText,
      (page) => agent.Items.bySearch(lowerText, page),
      agent.Items.bySearch(lowerText)
    );
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" style={logoStyle} />
        <div className="row">
          <div
            className="col"
            style={{ fontWeight: "500", fontSize: "1.3rem" }}
          >
            <span>A place to</span>
            <span
              id="get-part"
              style={{ cursor: "pointer", paddingLeft: "4px" }}
              onClick={() => setShowSearch(!showSearch)}
            >
              get
            </span>
            {showSearch && (
              <span
                style={{
                  paddingLeft: "4px",
                  fontWeight: "300",
                  fontSize: "1rem",
                }}
              >
                <input
                  id="search-box"
                  style={{ width: "20vw" }}
                  type="search"
                  autoComplete="off"
                  onChange={(event) =>
                    debouncedSearchHandler(event.target.value)
                  }
                  placeholder="What is it you truly desire?"
                />
              </span>
            )}
            <span style={{ paddingLeft: "4px" }}>the cool stuff.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
