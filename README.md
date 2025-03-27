# Cloud Attendance System

Welcome to the Cloud Attendance System—a cloud-based solution designed to simplify attendance tracking with real-time updates and role-based access. This system is perfect for schools and organizations looking to manage attendance seamlessly, with a design that works beautifully on mobile devices.

---

## Table of Contents

* [Overview & Technical Documentation](#overview--technical-documentation)
* [System Architecture & Implementation](#system-architecture--implementation)
* [Core Features](#core-features)

---

## Overview & Technical Documentation

The Cloud Attendance System provides an intuitive interface for both students and administrators. It utilizes real-time data synchronization and serverless functions to deliver a responsive and secure experience. This document outlines the system's architecture, features, and technical details.

### Technology Stack

- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS, Shadcn UI for components
- **Backend**: Netlify Functions
- **Database**: Firebase Realtime Database (RTDB)
- **Deployment**: Netlify

---

## System Architecture & Implementation

The system leverages serverless architecture and real-time databases to minimize infrastructure overhead and deliver instant updates. Key components include:

### Authentication & Role Management

- **Signup, Login, and Logout**: Secure authentication processes.
- **Role-Based Access**: Differentiates views so that users and admins see the dashboard relevant to their roles.
- **User Data Storage**: Registration data (email, name, role with default as student) is stored in RTDB.

### Attendance Marking

- **Mark Attendance**: Users select a class on the dashboard and click the "Mark Attendance" button, which records the current timestamp.
- **Confirmation Message**: Provides feedback on successful attendance marking.

### Dashboard Functionality

- **For Users**: Displays a table with past attendance records including date, time, and class details.
- **For Admins**: Shows all attendance records with additional filters (e.g., by email, class).

### API & Backend Processes

- **Netlify Functions**: Handle backend logic such as adding user data, determining roles, recording attendance, and retrieving attendance history.
- **Firebase-admin Integration**: Used to securely interact with the RTDB on the backend.

---

## Core Features

- **Authentication**: 
  - Secure login and signup functionalities.
  - Role-based redirection ensures users and admins access the appropriate dashboard.
  
- **Attendance Marking**:
  - Real-time attendance recording with timestamp.
  - Confirmation feedback for each attendance submission.
  
- **Attendance Dashboard**:
  - **User Dashboard**: Displays personal attendance history.
  - **Admin Dashboard**: Shows comprehensive attendance records with filtering options (by class, email).
  
- **UI Components**:
  - Built reusable components using Shadcn UI and Tailwind CSS for a consistent and responsive design across dashboards and attendance features.

