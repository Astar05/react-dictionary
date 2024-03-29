import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data);
  }

  function handlePhotoResponse(response) {
    setPhotos(response.data.photos);
  }

  function search(event) {
    event.preventDefault();

    // documentation: https://www.shecodes.io/learn/apis/dictionary
    let apiKey = "6be440o67f270ba2473tb46ca5f05a1b";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);

    // documentation: https://www.shecodes.io/learn/apis/images
    let photoapiKey = `dda9a648t200432eo3334f85db57e348`;
    let photoapiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${photoapiKey}`;

    axios.get(photoapiUrl).then(handlePhotoResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input type="search" onChange={handleKeywordChange} autoFocus={true} />
        <input type="submit" value="Search" />
      </form>

      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}
