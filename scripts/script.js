// - - - NOTE IDs - - - //
function initializeNotes() {
    const noteButtons = document.querySelectorAll('.note-button');
    const notes = document.querySelectorAll('.note-content');
    const indexList = document.getElementById('index-content');

    let noteCounter = 1; // Counter to generate unique note IDs and numbers

    noteButtons.forEach(button => {
        const noteId = `note${noteCounter}`;

        // Assign IDs to the button and find the corresponding note div
        button.setAttribute('data-note-id', noteId);
        button.textContent = noteCounter;

        // Find and update the corresponding note div
        const noteDiv = Array.from(notes).find(div => div.id === `note[NOTE_ID]`);
        if (noteDiv) {
            // Replace the placeholder ID in the note div
            noteDiv.id = noteId;
            const noteIdSpan = noteDiv.querySelector('.note-id');
            if (noteIdSpan) {
                noteIdSpan.textContent = noteCounter;
            }

            // Add index item
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="#${noteId}">Note ${noteCounter}</a>`;
            indexList.appendChild(listItem);

            noteCounter++; // Increment the counter
        }
    });

    // Update the placeholder in notes that haven't been processed yet
    notes.forEach(noteDiv => {
        if (noteDiv.id === 'note[NOTE_ID]') {
            const noteId = `note${noteCounter}`;
            noteDiv.id = noteId;
            const noteIdSpan = noteDiv.querySelector('.note-id');
            if (noteIdSpan) {
                noteIdSpan.textContent = noteCounter;
            }

            // Add index item for notes that were not included in the initial loop
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="#${noteId}">Note ${noteCounter}</a>`;
            indexList.appendChild(listItem);

            noteCounter++; // Increment the counter
        }
    });

    // Add click event listeners to note buttons
    noteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const noteId = this.getAttribute('data-note-id');
            const noteDiv = document.getElementById(noteId);

            if (noteDiv) {
                noteDiv.classList.toggle('expanded');
            }
        });
    });
}



// - - - INDEX UPDATE AND INTERACTIVE BUTTONS - - - //
// Function to initialize the index
function copyContentIndex() {
    const contentIndex = document.getElementById('contentIndex').innerHTML;
    const indexContent = document.getElementById('index-content');
    indexContent.innerHTML = contentIndex;
}

// Show buttons when the user scrolls down
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const toTopBtn = document.getElementById("toTopBtn");
    const indexBtn = document.getElementById("indexBtn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopBtn.style.display = "block";
        indexBtn.style.display = "block";
    } else {
        toTopBtn.style.display = "none";
        indexBtn.style.display = "none";
        document.getElementById("indexBox").style.display = "none";
    }
}

// Scroll back to the top when the button is clicked
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// Show/hide the index box when the button is clicked
function toggleIndexBox() {
    const indexBox = document.getElementById("indexBox");

    if (indexBox.style.display === "none" || indexBox.style.display === "") {
        copyContentIndex();
        indexBox.style.display = "block";
    } else {
        indexBox.style.display = "none";
    }
}

// Close the index box if clicking outside of it
function handleClickOutside(event) {
    const indexBox = document.getElementById("indexBox");
    const indexBtn = document.getElementById("indexBtn");

    if (indexBox.style.display === "block" && !indexBox.contains(event.target) && !indexBtn.contains(event.target)) {
        indexBox.style.display = "none";
    }
}


// Initializing the index and note ID assignment on page load
document.addEventListener('DOMContentLoaded', () => {
    // Copy the contentIndex to indexBox when the page loads
    copyContentIndex();
    initializeNotes(); // Assign IDs and update notes on page load

    // Add click event listener to the document
    document.addEventListener('click', handleClickOutside);
});
