# LyveCRM

### Enterprise-Grade Multi-Tenant SaaS MVP

LyveCRM is a high-performance Minimum Viable Product (MVP) designed to demonstrate a robust multi-tenant lead management ecosystem. Built with industrial scalability in mind, this MVP focuses on secure data isolation, role-based access, and automated reliability, moving beyond simple conceptual modeling to a market-ready foundation.

---

## Technical Architecture

### 1. Multi-Tenant Framework
* Strict Data Isolation: Engineered to ensure that tenant data (Customers, Tasks, Users) remains strictly encapsulated within their respective company environments.
* Role-Based Access Control (RBAC):
    * Platform Owner: Global system health monitoring and SaaS-wide analytics.
    * Company Admin: Tenant-level management, team invitations, and pipeline configuration.
    * Standard User: Individual task execution and personal workspace management.

### 2. Modern Tech Stack
* Framework: Next.js (TypeScript) for a unified server-side and client-side experience.
* Styling: Tailwind CSS & Glassmorphism UI for a minimalist, professional aesthetic.
* Animations: Framer Motion for smooth, high-fidelity UI transitions.
* Components: shadcn/ui and Lucide-React.

### 3. Automated Quality Assurance (MVP Guard)
* 250+ Line Playwright Audit: A comprehensive end-to-end testing suite that simulates the entire lifecycle of all three user roles.
* Automated Regressions: Validates cross-tenant security, CRUD operations, and complex UI state transitions.
* Real-time Audit Logs: Integrated terminal logging within test executions for maximum transparency during development and testing phases.

---

## Project Structure

```text
LyveCRM/
├── app/                # Next.js App Router (React/TS)
├── components/         # Reusable UI & Framer Motion components
├── tests/              # Playwright Automated Audit Suite (250+ lines)
│   ├── auth/           # Login, Signout, and RBAC logic
│   ├── dashboard/      # Layout, Data, and Content verification
│   └── core/           # CRUD operations & Multi-tenancy isolation
├── public/             # Branding assets and iconography
└── config/             # Multi-tenant environment variables 
```
---
## Installation and Setup

### Prerequisites
* **Node.js**: (Latest LTS version recommended)
* **Package Manager**: npm or yarn

### Installation
```bash
# Clone the repository
git clone [https://github.com/yourusername/LyveCRM.git](https://github.com/yourusername/LyveCRM.git)

# Navigate into the project directory
cd LyveCRM

# Install dependencies
npm install
```
---
## Running the Development Server
```
# Start the Next.js local development server
npm run dev 
```
## Executing the Automated Audit Suite
```
# Run the 250+ line Playwright E2E audit

npx playwright test
```

## Branching Strategy

This project utilizes a professional **Feature Branch Workflow** to maintain code integrity and ensure system stability:

* **main**: Production-ready, stable code. Merges are only permitted after a successful Playwright Audit.
* **develop**: Main integration branch for new features and internal testing.
* **feature/**: Granular branches for specific feature development (e.g., `feature/auth-isolation`).
* **test/**: Dedicated branches for expanding and enhancing the automated testing framework.

---

## License

This project is licensed under the **MIT License**.

### MIT License

Copyright (c) 2026 Jershon Paul Isaac

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Development and Engineering

LyveCRM is architected and maintained as an industrial-scale MVP, prioritizing high-availability and multi-tenant security. The project serves as a foundation for scalable SaaS operations, leveraging automated testing to ensure architectural integrity.

**Developed by Jershon Paul Isaac**
