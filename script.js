document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById('projects');
    
    // GitHub API endpoint for user repositories
    const githubAPI = 'https://api.github.com/users/Emmanuels-code/repos?sort=created&per_page=6';

    fetch(githubAPI)
        .then(response => response.json())
        .then(repos => {
            if (repos.length === 0) {
                projectsContainer.innerHTML = '<p>No recent projects found.</p>';
                return;
            }
            
            projectsContainer.innerHTML = ''; // Clear loading message
            
            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project');
                
                projectCard.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description ? repo.description : "No description provided."}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            projectsContainer.innerHTML = '<p>Error loading projects.</p>';
        });
});

