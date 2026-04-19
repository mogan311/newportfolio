// Step 1: Get all elements with class "mainbox"
var boxes = document.querySelectorAll('.mainbox');

// Step 2: Go through each box one by one
boxes.forEach(function(box) {

    // Step 3: When the box is clicked
    box.addEventListener('click', function() {

        // Step 4: Find the parent and add/remove "active" class
        box.parentElement.classList.toggle('active');

    });

});




// Grab the Buttons
var btnAcademic = document.querySelector('.academic');
var btnDevops = document.querySelector('.devops');

// Grab the Containers
var containerAcademic = document.getElementById('academic-container');
var containerDevops = document.getElementById('devops-container');

// Listen for clicks on the Academic Button
btnAcademic.addEventListener('click', () => {
    // 1. Show Academic, Hide DevOps
    containerAcademic.classList.remove('hidden');
    containerDevops.classList.add('hidden');
    
    // 2. Change button colors (Moves the 'active' class)
    btnAcademic.classList.add('active');
    btnDevops.classList.remove('active');
});

// Listen for clicks on the DevOps Button
btnDevops.addEventListener('click', () => {
    // 1. Show DevOps, Hide Academic
    containerDevops.classList.remove('hidden');
    containerAcademic.classList.add('hidden');
    
    // 2. Change button colors (Moves the 'active' class)
    btnDevops.classList.add('active');
    btnAcademic.classList.remove('active');
});

// Force the Academic button to "click" itself the moment the page loads
btnAcademic.click();

// --- SMART STICKY NAVBAR LOGIC ---

let lastScrollTop = 0; // Keeps track of where you were
var navbar = document.querySelector('.options'); // Grabs your navbar

window.addEventListener('scroll', function() {
    // Get the current scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
    navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    
    // Update the last position for the next movement
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh

    const btn = document.getElementById('send-button');
    btn.innerText = 'Sending...';

    // 1. Package the data exactly how Python expects it
    const formData = {
        user_name: document.querySelector('input[name="user_name"]').value,
        user_email: document.querySelector('input[name="user_email"]').value,
        user_phone: document.querySelector('input[name="user_phone"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    // 2. Send the data to your local Python server
    fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // 3. Handle the response from Python
        if (data.status === 'success') {
            alert('Message Sent Successfully!');
            document.getElementById('contact-form').reset();
        } else {
            alert('Server error: Could not send message.');
        }
    })
    .catch(error => {
        alert('Could not connect to the backend server. Is Python running?');
    })
    .finally(() => {
        btn.innerText = 'SEND';
    });
});


