/**
 * Generates a p element for the note html element
 * @param {string} content The content of the text element
 * @returns {HTMLElement} The html element for the text content
 */
export function createNoteText(content) {
  const noteText = document.createElement("p");
  noteText.innerText = content ?? "New note";
  noteText.className = "note-text";
  return noteText;
}

/**
 * Callback for clicking buttons on the note blocks
 *
 * @callback onClickCallback
 * @param {string} noteId
 */

/**
 * Generates a button for the note html element
 * @param {string} iconName The name of the icon for the button
 * @param {onClickCallback} onClick The callback to use when clicked
 * @returns {HTMLElement} The html element for the button
 */
export function createNoteButton(iconName, onClick) {
  const button = document.createElement("button");
  button.onclick = onClick ?? (() => console.log("Note button invalid"));
  button.classList.add("note-button");
  button.classList.add(iconName ?? "edit");

  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.innerText = iconName ?? "edit";
  button.appendChild(icon);
  return button;
}
