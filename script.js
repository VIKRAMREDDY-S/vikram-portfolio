* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}

/* NAVBAR */
nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  position: sticky;
  top: 0;
  background: rgba(0,0,0,0.5);
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: white;
}

/* HERO */
.hero {
  text-align: center;
  padding: 100px 20px;
}

.hero h1 {
  font-size: 3rem;
}

.hero button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background: #38bdf8;
  color: black;
  cursor: pointer;
  border-radius: 5px;
}

/* SECTION */
.section {
  padding: 60px 20px;
  text-align: center;
}

/* CARD */
.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  border-radius: 15px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-10px);
}

/* GRID */
.grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* FOOTER */
footer {
  text-align: center;
  padding: 20px;
}
