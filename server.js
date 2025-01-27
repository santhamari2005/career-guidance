// Import required modules
const express = require('express');
const path = require('path');

const app = express();  // Create an Express app

// Middleware to serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data (POST requests)
app.use(express.urlencoded({ extended: true }));

// POST route to process career recommendations based on skills
app.post('/recommend', (req, res) => {
    const skills = req.body.skills.split(',').map(skill => skill.trim());  // Parse the skills
    const recommendations = getRecommendations(skills);
    res.json({ recommendations });  // Send back the recommendations as a JSON response
});

// Function to get career recommendations based on user skills
function getRecommendations(skills) {
    const careerData = {
        Programming: ['Software Developer', 'Data Scientist', 'Web Developer'],
        Creativity: ['Graphic Designer', 'Animator', 'Illustrator'],
        Marketing: ['SEO Specialist', 'Digital Marketer', 'Content Creator'],
        Design: ['UI/UX Designer', 'Web Designer', 'Product Designer'],
    };

    const result = [];

    // Normalize user input (convert to lowercase and split by commas)
    skills = skills.map(skill => skill.toLowerCase().trim());  // Ensures multiple skills are handled

    // Loop through careerData and check if any skills match
    for (const skill in careerData) {
        // Convert skill category to lowercase for case-insensitive comparison
        const lowerCaseSkill = skill.toLowerCase();
        // Check if the input skills match any of the categories
        if (skills.some(inputSkill => lowerCaseSkill.includes(inputSkill))) {
            result.push(...careerData[skill]);  // Add the matching careers
        }
    }

    // Return the result or a message if no matches were found
    return result.length > 0 ? result : ['No careers found for these skills.'];
}

// Start the server on port 3000
app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000');
});
