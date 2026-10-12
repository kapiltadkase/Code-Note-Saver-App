# Code & Notes Saver

A lightweight, React-based web application designed to help developers and students quickly save, manage, and retrieve code snippets, text, and notes without the need for a backend database. 

## 🚀 Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete your notes or code snippets seamlessly.
* **Persistent Storage:** Utilizes the browser's `LocalStorage` to save your data persistently, meaning your pastes remain even if you refresh or close the tab.
* **Smart Search & Filtering:** Quickly find specific notes using the real-time search bar that filters based on the paste title.
* **One-Click Copy:** Integrated clipboard functionality allows you to copy code snippets instantly with a single click.
* **Dynamic Routing:** Smooth navigation between the home/creation page, list view, and individual paste view pages.
* **Toast Notifications:** Interactive success and error popups for user actions (creation, deletion, copying) for better UX.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Routing:** React Router v6 (`react-router-dom`)
* **Styling:** Tailwind CSS
* **Notifications:** React Hot Toast
* **Storage:** Browser LocalStorage API
