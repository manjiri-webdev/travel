function updateUserInfo() {
    const userInfoDiv = document.getElementById('userInfo');
    let content = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //loaction variable and update in content
            const lat = position.coords.latitude.toFixed(4);
            const lng = position.coords.longitude.toFixed(4);
            content += `<p><strong>Your Location:</strong><br>Latitude: ${lat}, Longitude: ${lng}</p>`;

            //Current time variable and update in content
            const currentTime = new Date().toLocaleString();
            content += `<p><strong>Local Time:</strong><br>${currentTime}</p>`;

            userInfoDiv.innerHTML = content;

            // Update the map with the user's location
            var embedUrl = "https://maps.google.com/maps?q=" + lat + "," + lng + "&z=14&output=embed";
            document.getElementById("mapFrame").src = embedUrl;

        }, function (error) {
            console.log("Error obtaining location: ", error);
            content += `<p><strong>Warning:</strong> Unable to determine your location (${error.message}). Using fallback location.</p>`;
            const currentTime = new Date().toLocaleString();
            content += `<p><strong>Local Time:</strong><br>${currentTime}</p>`;
            userInfoDiv.innerHTML = content;
            // Fallback map (e.g., Mumbai City)
            document.getElementById("mapFrame").src = "https://maps.google.com/maps?q=19.0825555,72.8789412&z=12&output=embed";
        });
    }
    else {
        content = `<p><strong>Your Location:</strong><br>Geolocation is not supported by your browser. Using fallback location.</p>`;
        const currentTime = new Date().toLocaleString();
        content += `<p><strong>Local Time:</strong><br>${currentTime}</p>`;
        userInfoDiv.innerHTML = content;
        document.getElementById("mapFrame").src = "https://maps.google.com/maps?q=19.0825555,72.8789412&z=12&output=embed";
    }
}
// Call the function when the page loads
updateUserInfo();

function handleContactSubmission(event) {
    event.preventDefault();

    // Get form values
    const contactData = {
        name: document.getElementById('contactname').value,
        email: document.getElementById('contactemail').value,
        phone: document.getElementById('contactnum').value,
        message: document.getElementById('contactMessage').value,
        submissionDate: new Date().toISOString(),
        status: 'Pending'
    };

    // Get existing contact submissions or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];

    // Add new submission
    existingSubmissions.push(contactData);

    // Save back to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));

    // Reset form
    event.target.reset();

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    return false;
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

var subbtn = document.getElementById("btn-subscribe")
subbtn.addEventListener('click',function(){
    window.alert("Thank you! Successfully Subscribe");
});