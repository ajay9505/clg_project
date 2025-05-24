document.addEventListener("DOMContentLoaded", function () {
fetch("http://localhost:3000/result-student_info") // Fetch data from Node.js API
        .then(response => response.json())
        .then(data => {
            //show data to result table
            const results = data.result;
            const students = data.student_info;

            let table = document.getElementById("result");
            results.forEach(result => {
                let row = table.insertRow();
                row.insertCell(0).textContent = result.serial_no;
                row.insertCell(1).textContent = result.semester_part;
                row.insertCell(2).textContent = result.subject_code;
                row.insertCell(3).textContent = result.result;
            });
            //show data to profile
            const student_info = document.getElementById("student_info");
            students.forEach(student => {
                const studentDiv= document.createElement("div");
                studentDiv.innerHTML =`
          <p><strong>Roll Number : </strong>${student.roll_no}</p><br>      
          <p><strong>Name : </strong>${student.name}</p><br>
          <p><strong>Date of Birth : </strong>${student.dob}</p><br>
          <p><strong>Registration Number : </strong>${student.reg_no}</p><br>
          <p><strong>program : </strong>${student.program}</p><br>
          <p><strong>year : </strong>${student.year}</p><br>
          <p><strong>Departmet : </strong>${student.department}</p><br>
          <p><strong>Admitted Date : </strong>${student.admission_date}</p><br>
          <p><strong>Academic Year : </strong>${student.academic_year}</p><br>
          <p><strong>Mobile : </strong>${student.mobile_no}</p><br>
          <p><strong>Father Name : </strong>${student.father_name}</p><br>
          <p><strong>Current sem : </strong>${student.current_sem}</p>`;
                student_info.appendChild(studentDiv);
            })
        })
        .catch(error => console.error("Error fetching data:", error));
});

// Login Function
const API_URL = "http://localhost:3000";
async function login() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("attendanceSystem").classList.remove("hidden");
    } else {
        alert("Invalid User ID or Password");
    }
}
// Print attendance history
function printresult() {
    const printContents = document.getElementById("printresult").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
