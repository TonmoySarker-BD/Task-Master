# 🎨 TaskMaster Pro Frontend  
A modern React + Vite frontend for **TaskMaster Pro**, an AI-powered task prioritization tool.

---

## 🚀 Features
- Built with **React 19** + **Vite**
- **Tailwind CSS v4** + **DaisyUI v5** for modern styling
- **React Router v7** for navigation
- **SweetAlert2** for alerts & confirmations
- **React Icons** for UI icons
- Connects to **TaskMaster Pro Backend** for AI-powered task prioritization
- Responsive and minimal design

---

## 📦 Tech Stack
- React 19
- Vite 7
- TailwindCSS 4 + DaisyUI 5
- React Router 7
- SweetAlert2
- React Icons

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/TonmoySarker-BD/Task-Master.git
cd taskmaster
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```
*(Change `http://localhost:3000` to your deployed backend URL when in production)*

### 4. Start the development server
```bash
npm run dev
```

Your app will be running at:  
```
http://localhost:5173
```

---

## 📡 How It Works
1. User enters a list of tasks in the frontend UI.  
2. The frontend sends them to the backend `/prioritize` endpoint.  
3. The backend calls **OpenAI GPT** to prioritize the tasks.  
4. Results are displayed as a clean, categorized task list.  

---

## 📜 Scripts
```bash
npm run dev     # Start dev server
npm run build   # Build production version
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss your idea.

---

## 📄 License
MIT License © 2025 Tonmoy Sarker
