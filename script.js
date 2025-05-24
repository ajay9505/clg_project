// Sample Event Data (Replace with your actual data or fetch from an API)
const events = [
    {
      date: "2025-11-15",
      title: "Annual Cultural Fest",
      description: "Join us for a day of music, dance, and fun!",
    },
    {
      date: "2025-11-20",
      title: "Tech Symposium",
      description: "Explore the latest in technology and innovation.",
    },
    {
      date: "2025-11-25",
      title: "Sports Day",
      description: "Cheer for your favorite teams and enjoy exciting matches.",
    }
  ];

  // Function to display events
  function displayEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; // Clear existing content

    events.forEach((event, index) => {
      const eventItem = document.createElement('div');
      eventItem.classList.add('event-item');

      eventItem.innerHTML = `
        <div class="event-date">${event.date}</div>
        <div class="event-details">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </div>
        <div class="event-actions">
          <button class="details-btn" onclick="showEventDetails(${index})">Details</button>
        </div>
      `;

      eventList.appendChild(eventItem);
    });
  }

  // Function to show event details in a modal
  function showEventDetails(index) {
    const event = events[index];
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');

    // Populate modal with event details
    modalTitle.textContent = event.title;
    modalDate.textContent = `Date: ${event.date}`;
    modalDescription.textContent = event.description;

    // Show the modal
    modal.style.display = 'flex';
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
  }

  // Call the function to display events
  displayEvents();