// 1. SELECT EVERYTHING WE NEED
const form = document.getElementById('eventForm');
const list = document.getElementById('eventContainer');
const clearBtn = document.getElementById('clearAllBtn');
const sampleBtn = document.getElementById('addSampleBtn');
const keyDisplay = document.getElementById('keyPressed');

// 2. ADD AN EVENT (Form Handling)
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from refreshing

    // Get the values from the inputs
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    // Create a new "Card" using a template string
    const card = document.createElement('div');
    card.className = 'event-item';
    card.innerHTML = `
        <h3>${title}</h3>
        <p>Date: ${date} | <b>${category}</b></p>
        <button class="delete-btn">Delete</button>
    `;

    // Add it to the list and clear the form
    list.appendChild(card);
    form.reset();
    
    // Remove the "No events" message if it's there
    if(list.querySelector('.empty-msg')) list.querySelector('.empty-msg').remove();
});

// 3. DELETE AN EVENT (Event Delegation)
// We listen to the WHOLE list, then check if a Delete button was clicked
list.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});

// 4. CLEAR ALL BUTTON
clearBtn.onclick = function() {
    list.innerHTML = '<p class="empty-msg">No events yet.</p>';
};

// 5. SAMPLE EVENTS BUTTON
sampleBtn.onclick = function() {
    const sample = document.createElement('div');
    sample.className = 'event-item';
    sample.innerHTML = `<h3>Sample Meeting</h3><p>2024-12-01</p><button class="delete-btn">Delete</button>`;
    list.appendChild(sample);
    if(list.querySelector('.empty-msg')) list.querySelector('.empty-msg').remove();
};

// 6. KEYBOARD TRACKING
window.onkeydown = function(e) {
    keyDisplay.innerText = e.key;
};