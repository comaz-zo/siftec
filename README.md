# SIF360 & SIFTEC

This repository contains two applications—**SIF360** and **SIFTEC**—developed for the management and monitoring of forest resources, particularly within the context of the Tenuta Presidenziale di Castelporziano project. Both applications are GIS-based tools supporting sustainable forest management practices.

---

## Project Overview

- **SIFTEC:** 
  SIFTEC is a web-based GIS application designed for comprehensive forest management. It enables visualization, analysis, and reporting of forestry data using interactive maps and dashboards. Its primary goal is to support decision-making in sustainable forest management by integrating spatial data, inventory data, and management plans.

- **SIF360:**  
  SIF360 is a specialized module focused on technical forest management tasks. It includes tools for inventory data collection, processing, and reporting. SIFTEC complements SIF360 by providing advanced features for data entry, validation, and technical analysis.

---

## Technologies Used

- **JavaScript** (front-end logic, interactive maps)
- **CSS** (styling and layout)
- **PHP** (back-end services, API endpoints)
- **Other** (various supporting scripts, plugins)

Both applications likely leverage GIS libraries (such as Leaflet or OpenLayers) and may use standard web technologies for user interaction.

---

## Repository Structure

```
/
├── sif360/   # SIF360 application source code
├── siftec/   # SIFTEC application source code
├── README.md
...
```

---

## Installation

> **Prerequisites:**  
> - Node.js (for JavaScript dependencies, if a package.json is present)  
> - PHP (web server, version 7.x+ recommended)  
> - Web server (e.g., Apache or Nginx)  
> - (Optional) GIS server or spatial database, if required

### 1. Clone the Repository

```bash
git clone https://github.com/comaz-zo/siftec.git
cd siftec
```

### 2. Install Dependencies

- **For JavaScript Front-end**  
  If a `package.json` file exists:

  ```bash
  cd sif360     # or cd siftec
  npm install
  ```

- **For PHP Back-end**  
  Ensure your web server is configured to serve PHP files from the `sif360` and `siftec` directories.

### 3. Configure Environment

- Update configuration files as needed (e.g., database connections, API endpoints, GIS server URLs).
- Refer to any `.env.example` or `config.sample.js` files in each subfolder for guidance.

### 4. Run the Applications

- **Local Development:**
  - For JavaScript front-end:  
    ```bash
    npm start
    ```
  - For PHP:  
    Place the folder in your web server's root directory and access via browser:
    ```
    http://localhost/sif360/
    http://localhost/siftec/
    ```

---

## Usage

- **SIF360:**  
  Access the application in your browser. Use the map interface and dashboards to explore forest data, generate reports, and interact with spatial layers.

- **SIFTEC:**  
  Use the specialized tools for technical data entry, processing, and exporting forestry reports.

---

