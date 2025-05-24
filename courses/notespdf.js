// Content for each section
const content = {
    home: `
        <h2>Welcome to the College Library</h2>
        <p>Explore the resources available for your studies.</p>
    `,
    "subject-notes": `
        <h2>Subject Notes</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Mathematics Notes</h5>
                        <p class="card-text">Download comprehensive notes for Mathematics.</p>
                        <a href="path/to/math-notes.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Physics Notes</h5>
                        <p class="card-text">Download detailed notes for Physics.</p>
                        <a href="path/to/physics-notes.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Chemistry Notes</h5>
                        <p class="card-text">Download well-structured notes for Chemistry.</p>
                        <a href="path/to/chemistry-notes.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    "lab-programs": `
        <h2>Lab Programs</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">C Programming Lab</h5>
                        <p class="card-text">Download lab programs for C Programming.</p>
                        <a href="path/to/c-lab.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Java Lab</h5>
                        <p class="card-text">Download lab programs for Java.</p>
                        <a href="path/to/java-lab.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">DBMS Lab</h5>
                        <p class="card-text">Download lab programs for DBMS.</p>
                        <a href="path/to/dbms-lab.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    "question-papers": `
        <h2>Question Papers</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Mathematics Question Papers</h5>
                        <p class="card-text">Download previous year question papers for Mathematics.</p>
                        <a href="path/to/math-papers.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Physics Question Papers</h5>
                        <p class="card-text">Download previous year question papers for Physics.</p>
                        <a href="path/to/physics-papers.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Chemistry Question Papers</h5>
                        <p class="card-text">Download previous year question papers for Chemistry.</p>
                        <a href="path/to/chemistry-papers.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    "study-material": `
        <h2>Study Material</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Mathematics Study Material</h5>
                        <p class="card-text">Download study material for Mathematics.</p>
                        <a href="path/to/math-material.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Physics Study Material</h5>
                        <p class="card-text">Download study material for Physics.</p>
                        <a href="path/to/physics-material.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Chemistry Study Material</h5>
                        <p class="card-text">Download study material for Chemistry.</p>
                        <a href="path/to/chemistry-material.pdf" class="btn btn-primary" download>Download</a>
                    </div>
                </div>
            </div>
        </div>
    `,
};

// Function to load content dynamically
function loadContent(target) {
    const dynamicContent = document.getElementById("dynamic-content");
    dynamicContent.innerHTML = content[target] || "<p>Content not found.</p>";
}

// Add event listeners to navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.getAttribute("data-target");
        loadContent(target);
    });
});

// Load home content by default
loadContent("home");