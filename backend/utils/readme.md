# Utils Service – Jobvyn

The Utils Service provides utility functionalities for the Jobvyn platform, including **email delivery via Kafka**, **file uploads to Cloudinary**, **AI-powered career guidance**, and **resume analysis**.  
It acts as a support service to other microservices, handling background tasks, external API calls, and AI-driven insights.

---

## Core Functionality

### 1. Mail Service

- Consumes messages from Kafka topic `send-mail` and sends emails via SMTP.
- Supports transactional and notification emails (e.g., password resets, notifications).
- Ensures reliability and asynchronous email delivery.

### 2. Upload Service

- Uploads files (resumes, profile pictures) to Cloudinary.
- Supports updating existing files by referencing `public_id` to free storage space.
- Provides secure URLs for uploaded content to be used across services.

### 3. AI Services

- **Career Guidance**
  - Generates personalized career path suggestions based on user skills.
  - Uses Google Gemini AI for structured, JSON-based recommendations.
- **Resume Analyzer**
  - Provides ATS compatibility score and improvement suggestions for resumes.
  - Analyzes formatting, keywords, structure, readability, and content quality.

---

## Service Flow

1. **Mail Workflow**
   - Other services publish messages to Kafka → Utils Service consumes → Sends email via SMTP.

2. **Upload Workflow**
   - Receives base64 buffer from services → Uploads to Cloudinary → Returns URL and `public_id`.

3. **AI Workflow**
   - Receives input (skills or resume) → Sends request to Gemini AI → Returns structured JSON response.
   - Career guidance and resume analysis are provided asynchronously and can be integrated into user-facing features.

---

## Environment Variables

```
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Kafka_Broker=
SMTP_USER=
SMTP_PASSWORD=
GEMINI_API_KEY=
```

---

## Running Locally

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:${PORT}/api/utils
```

---

## Tech Stack

- **Node.js**
- **Express.js**
- **KafkaJS** (Message Queue for Mail Service)
- **Nodemailer** (SMTP email delivery)
- **Cloudinary** (File storage and CDN)
- **Google Gemini AI** (Career guidance and resume analysis)
- **CORS** and JSON middleware for API consumption

---

**Author:** Arun Kumar
