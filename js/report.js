const API = "https://backend-5aed.onrender.com";


document.getElementById("reportForm").onsubmit = async (e) => {
  e.preventDefault();

  const data = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    lat: 3.1390,
    lng: 101.6869
  };

  await fetch(`${API}/report`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  alert("Report sent!");
  
};
