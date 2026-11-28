# CareBridge – A Two-Way Donation Platform

**CareBridge** is a donation platform where people can both request financial assistance and donate to others. Help seekers submit requests, admins verify and approve them, and donors contribute according to their ability.

It connects people who need help with those who are willing to give, making the donation process more accessible, organized, and trustworthy.

🌐 **Live Demo:** [CareBridge](https://care-bridge-zeta.vercel.app/)


## ✨ Core Features

### 1. Help Request Management
- Users can submit financial assistance requests based on their needs.
- Provide request details and supporting documents.
- Track the status of submitted requests.
- Manage personal help requests.

### 2. Admin Verification & Approval
- Review submitted help requests.
- Verify request information and supporting documents.
- Approve or reject requests.
- Manage users, donations, and campaigns.

### 3. Donation System
- Explore verified help requests.
- Choose requests to support.
- Donate any amount according to personal ability.
- View personal donation history.
- Track contributions to different requests.

### 4. Campaign Management
- Organize donation campaigns for different causes.
- Reach people in different locations.
- Allow donors to discover and support campaigns.
- Manage campaign information and activities.

### 5. Role-Based Dashboards

CareBridge provides separate dashboards based on user roles.

- **User (Help Seeker):** Submit help requests, manage requests, and track their status.
- **Donor:** Explore approved requests, make donations, and view donation history.
- **Admin:** Manage users, review requests, oversee donations, and manage campaigns.

### 6. Dashboard Analytics & Tracking
- View relevant statistics and activities.
- Monitor help requests and donation records.
- Track request statuses.
- Access role-specific dashboard information.

## 🔄 How CareBridge Works

CareBridge follows a simple verification-based donation process:

1. **Request Help:** A user submits a financial assistance request with the necessary details.
2. **Admin Verification:** The administrator reviews the request and checks the provided information.
3. **Approval:** Once verified, the request is approved and made available to donors.
4. **Donation:** Donors explore approved requests and contribute according to their ability.
5. **Financial Support:** The collected donations are directed towards the approved help seeker.

This process helps donors support reviewed requests with greater confidence.

## 🛡️ Trust & Transparency

Trust is at the heart of CareBridge.

Every help request goes through an administrative review process before becoming available to donors. This helps reduce fraudulent requests and creates a more dependable environment for both help seekers and donors.

CareBridge aims to make community support more transparent by keeping donation activities and request information organized.

## 🚀 Future Plans

CareBridge will continue to grow with features focused on accessibility, communication, and community engagement.

- **Volunteer Management:** Introduce a volunteer role to help organize campaigns and coordinate community support activities.
- **Real-Time Chat:** Enable direct communication between relevant users for better coordination.
- **Voice-Based Form Submission:** Allow users to fill out help request forms using voice input, especially those who have difficulty typing.
- **Expanded Campaigns:** Organize campaigns across different locations and communities.
- **Improved Accessibility:** Make the platform easier to use for people with different technical abilities.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend Framework | Next.js, React |
| Programming Language | TypeScript, JavaScript |
| Styling | Tailwind CSS |
| UI Components | HeroUI |
| Icons | React Icons |
| Charts & Analytics | Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Better Auth |
| Payment Integration | SSLCommerz |
| Version Control | Git, GitHub |
| Deployment | Vercel |

## 📂 Project Repository

**Backend Repository:** [View Server Repository](YOUR_SERVER_REPOSITORY_URL)

---

**CareBridge – Connecting People Who Need Help With People Who Care.**

## ⚙️ Local Setup

Follow these steps to run CareBridge locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS)
- npm
- Git
- MongoDB Atlas account or local MongoDB

### 1. Clone the Repositories

Clone the main project:

```bash
git clone https://github.com/Eva-004/care-bridge-server.git
```

Clone the backend:

```bash
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Install Dependencies

Open both project directories in separate terminals and run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the main project directory and configure the required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=carebridge
```

Add any additional authentication, payment, and service credentials required by your implementation.

### 4. Run the Backend

Navigate to the backend directory and start the development server:

```bash
npm run dev
```

### 5. Run the Main Application

Navigate to the main project directory and start Next.js:

```bash
npm run dev
```

### 6. Open in Browser

Visit the following URL:

```text
http://localhost:3000
```

CareBridge should now be running locally.