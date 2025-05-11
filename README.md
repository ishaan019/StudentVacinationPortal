
# 🏫 School Vaccination Portal

A full-stack web application to manage student vaccination drives in schools, built with **React.js** (frontend) and **Spring Boot** (backend).

---

## 📁 Project Structure

```
school-vaccination-portal/
├── StudentVaccinationPortal/     # Spring Boot application
└── react-frontend/    # React.js application
```

---

## ✅ Prerequisites

### Backend:
- Java 17+
- Maven
- MySQL (or compatible DB)
- SpringBoot

### Frontend:
- Node.js (v16 or later)
- npm (or yarn)

---

## 🚀 How to Run Locally

### 🔧 Backend (Spring Boot)

#### 1. Navigate to the backend folder - StudentVaccinationPortal
```bash
cd StudentVaccinationPortal
```

#### 2. Create the database
```sql
CREATE DATABASE school_vaccination;
```

#### 3. Configure `application.properties`
Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/school_vaccination
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

#### 4. Run the backend server
```bash
mvn clean install
./mvnw spring-boot:run
```

> Backend runs at: `http://localhost:8082`

---

### 🌐 Frontend (React.js)

#### 1. Navigate to the frontend folder - react-frontend
```bash
cd react-frontend
```

#### 2. Install dependencies
```bash
npm install
npm install bootstrap --save
npm install axios --save
npm install react-router-dom --save
npm install react-toastify
npm install bootstrap @popperjs/core
npm install xlsx file-saver jspdf jspdf-autotable
npm install react-icons
```

#### 3. Start the development server
```bash
npm run dev
```

> Frontend runs at: `http://localhost:3000`

---

## 🧪 Sample Features

- ✅ Simulated login/authentication
- 📊 Dashboard with vaccination stats
- 🎓 Student and school management
- 💉 Vaccination drive scheduling
- 📥 CSV import
- 🔍 Date validation & business rules

---

## 📬 API Base URL

```
http://localhost:8082/
```

---

## 📄 License

Ishaan Pasricha

---

## 🤝 Contributions

Pull requests and feature suggestions are welcome!
