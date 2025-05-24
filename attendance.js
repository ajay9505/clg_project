// Admin Login Function
async function admin() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById("adminPage").classList.add("hidden");
        document.getElementById("attendanceSystem").classList.remove("hidden");
    } else {
        alert("Invalid User ID or Password");
    }
}


// Load students based on selection
function loadStudents() {
    const department = document.getElementById("department").value;
    const program = document.getElementById("program").value;
    const year = document.getElementById("year").value;

    fetch(`http://localhost:3000/get-students?department=${department}&program=${program}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#attendanceTable tbody");
            tableBody.innerHTML = "";

            data.forEach(students => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${students.id}</td>
                    <td>${students.name}</td>
                    <td>
                        <select class="status">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </td>
                    <td><button onclick="removeRow(this)">Remove</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading students:", error));
}

// Remove student row
function removeRow(button) {
    button.parentElement.parentElement.remove();
}

// Save attendance to database
function saveAttendance() {
    const date = document.getElementById("date").value;
    if (!date) {
        alert("Please select a date.");
        return;
    }

    const rows = document.querySelectorAll("#attendanceTable tbody tr");
    const attendanceData = [];

    rows.forEach(row => {
        const student_id = row.cells[0].textContent;
        const student_name = row.cells[1].textContent;
        const status = row.querySelector(".status").value;
        const department = document.getElementById("department").value;
        const program = document.getElementById("program").value;
        const year = document.getElementById("year").value;

        attendanceData.push({ student_id, student_name, department, program, year, date, status });
    });

    fetch("http://localhost:3000/save-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error saving attendance:", error));
}

// View attendance history
function viewAttendanceHistory() {
    fetch("http://localhost:3000/attendance-history")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#historyTable tbody");
            tableBody.innerHTML = "";

            data.forEach(record => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.date}</td>
                    <td>${record.student_id}</td>
                    <td>${record.student_name}</td>
                    <td>${record.status}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading history:", error));
}

// Clear all attendance records
function clearAttendance() {
    if (confirm("Are you sure you want to delete all attendance records?")) {
        fetch("http://localhost:3000/clear-attendance", {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            document.querySelector("#historyTable tbody").innerHTML = ""; // Clear history table in UI
        })
        .catch(error => console.error("Error clearing attendance:", error));
    }
}


// Print attendance history
function printAttendanceHistory() {
    const printContents = document.getElementById("attendanceHistory").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}




