# 📋 Task Management

A Task Management System built with **Laravel 10**, **PEST Testing**, and **Repository-Service Pattern** architecture.

## 🚀 Features

- ✅ **Complete Task CRUD** with states and priorities
<!-- - 🔔 **Notification system** with real-time updates -->
- 👤 **User authentication**
<!-- - 📊 **Dashboard with statistics** and metrics -->
- 🔍 **Filter** by Category
- 📱 **Interface** using Tailwind
- ⚡ **REST API** for external integration
<!-- - 🧪 **Complete testing** with PEST framework -->
- 🏗️ **Service architecture** as requested

## 📋 System Requirements

- **PHP** ≥ 8.1
- **Composer** ≥ 2.0
- **Node.js** ≥ 16.x (for asset compilation)
- **NPM** or **Yarn**
- **PostgreSQL** 15+ or **MySQL** 8.0+

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/filipebsmonteiro/curotec-php-vue-assessment.git
cd curotec-php-vue-assessment
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
# or
yarn install
```
> **Note**: Required for compiling Bootstrap CSS/SASS and frontend assets.

### 4. Configure Environment Variables
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure Database
Edit the `.env` file with your database credentials:

Install docker(https://docs.docker.com/engine/install/)

**For PostgreSQL (default):**
```bash
docker-compose up -d
```

**For MySQL:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_management
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 7. Run Migrations and Seeders
```bash
php artisan migrate --seed
```

### 8. Compile Assets
```bash
# Development
npm run dev

# Production
npm run build
```

### 9. Start the Server
```bash
php artisan serve
```

The application will be available at: **http://localhost:8000**
