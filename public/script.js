document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert('Regsiter button clicked!');

  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    ticketType: document.getElementById("ticketType").value,
};


  try {
      const response = await fetch("/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message); // shpw success message

      if (response.ok) {
          alert(result.message);
          document.getElementById("registrationForm").reset();
          
      } else {
          alert("Error: " + result.message);
      }
  } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong! Please try again later.");
  }
});
