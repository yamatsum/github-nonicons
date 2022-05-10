import { observe } from "selector-observer";
import * as fileIcons from "file-icons-js";

const DEFAULT_ICON = "text-icon";

chrome.storage.sync.get("isColor", ({ isColor }) => {
  function injectGithub(item) {
    const isFile = item.querySelector(".octicon-file");
    const name = item.querySelector(".js-navigation-open").textContent;
    const icon = document.createElement("span");

    if (isFile) {
      let className = fileIcons.getClass(name) || DEFAULT_ICON;

      if (isColor) {
        className = fileIcons.getClassWithColor(name) || DEFAULT_ICON;
      }

      icon.classList.add("octicon-file", "gfi", ...className.split(" "));
      if (item.querySelector("svg")) {
        item.querySelector("svg").replaceWith(icon);
      }
    }
  }

  observe(".js-navigation-container > .js-navigation-item", {
    add: injectGithub,
  });
});
