document.getElementById('skills-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    const skills = document.getElementById('skills').value;  // Get the skills from the input field

    // Send the skills to the backend using a POST request
    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `skills=${encodeURIComponent(skills)}`
    })
    .then(response => response.json())
    .then(data => {
        // Display the career recommendations on the webpage
        const recommendations = data.recommendations;
        const list = document.getElementById('recommendations');
        list.innerHTML = '';  // Clear any previous recommendations

        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            list.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
