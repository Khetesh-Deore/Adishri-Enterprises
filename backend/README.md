# Adishri Enterprises - Backend API

Backend CMS API for Adishri Enterprises website.

## Tech Stack
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Storage)

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `CLOUDINARY_*` - Your Cloudinary credentials
- `JWT_SECRET` - Change for production

### 3. Seed Admin User
```bash
npm run seed
```

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout | Private |
| PUT | `/api/auth/change-password` | Change password | Private |

### Hero Section
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/hero` | Get hero content | Public |
| PUT | `/api/hero` | Update hero | Private |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Private |
| PUT | `/api/products/:id` | Update product | Private |
| DELETE | `/api/products/:id` | Delete product | Private |

### About
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/about` | Get about content | Public |
| PUT | `/api/about` | Update about | Private |

### Gallery
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gallery` | Get all images | Public |
| POST | `/api/gallery` | Add image | Private |
| DELETE | `/api/gallery/:id` | Delete image | Private |
| PUT | `/api/gallery/reorder` | Reorder images | Private |

### Contact
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/contact` | Get contact info | Public |
| PUT | `/api/contact` | Update contact | Private |

### Settings
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/settings` | Get site settings | Public |
| PUT | `/api/settings` | Update settings | Private |

### Upload
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/upload` | Upload single image | Private |
| POST | `/api/upload/multiple` | Upload multiple images | Private |
| DELETE | `/api/upload/:publicId` | Delete image | Private |

## Default Admin Credentials
- Email: admin@adishrienterprises.com
- Password: Admin@123

⚠️ Change these in production!
