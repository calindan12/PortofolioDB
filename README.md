Această aplicație web este concepută pentru ca un administrator să gestioneze portofoliile artiștilor digitali. Administratorul are control deplin pentru a înregistra noi artiști, a adăuga și a gestiona lucrările lor și pentru a supraveghea tot conținutul portofoliului pentru o prezentare profesională.

Funcționalități
- Înregistrarea artiștilor noi
- Adăugarea lucrărilor pentru fiecare artist
- Actualizarea și ștergerea lucrărilor
- Vizualizarea lucrărilor în galerie și în detaliu

Instalare și Configurare
- NestJS și NPM
- MongoDB pentru stocarea datelor
- Opțional, Postman pentru testarea directă a API-urilor
- Clonează proiectul
  git clone https://github.com/calindan12/PortofolioDB.git
- Navighează în directorul proiectului
  cd tema
- Instalează pachetele necesare pentru backend și frontend
  cd proiect
  npm install
   cd ../artist-portofolio
  npm install
  
Configurarea Mediului (.env)
- STR_MONGO = mongodb+srv://calin01:Federer1@cluster0.372l6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
- Pornirea Aplicației
  cd proiect
  npm start
  cd artist-portofolio/src/app
  npm start
  Frontend: http://localhost:4200


Endpoints API Principale
În backend, următoarele rute sunt disponibile pentru API-ul principal:

Artiști:
POST /api/artists - Creare artist

Lucrări:
POST /api/works - Creare lucrare
GET /api/works - Afișare toate lucrările
GET /api/works/:id - Afișare detalii lucrare
PUT /api/works/:id - Actualizare lucrare
DELETE /api/works/:id - Ștergere lucrare




