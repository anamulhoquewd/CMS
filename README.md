<<<<<<< HEAD
# cms
CMS - UI — A clean and responsive frontend interface built with Next.js and Tailwind CSS to manage catering businesses. Includes role-based dashboards for admins and managers.  CMS - API — A RESTful API built with Node.js, Hono, and MongoDB to handle authentication, user roles, orders, customers, and payments for catering services.
=======
# CMS - Catering Management System

A simple yet powerful CMS application built for home catering businesses.  
Though created for **learning purposes**, this project solves real-world challenges faced by small catering service providers.

---

## Description

This application aims to help manage the day-to-day operations of a **home catering service**, which typically relies on **repeat customers**. Managing customer data, tracking orders, and updating delivery statuses manually can be a hassle.

This CMS app introduces features to streamline the process and reduce human error.

### Key Features

- **Active/Inactive Customers:**  
  Easily mark customers as active or inactive. Orders are automatically generated only for active customers each day.

- **Default Settings for New Customers:**  
  When adding a new customer, the system sets default:

  - Food items (Lunch & Dinner)
  - Quantity
  - Price

- **Automatic Daily Orders:**  
  Orders are created every day for all active customers. Admins can still update or delete orders as needed.

- **Performance Tracking:**  
  Track daily order quantities and analyze business performance over time.

- **Role Management:**  
  Add multiple Admins or Managers to handle daily operations.

### Ongoing Development

As this is a project for learning purposes, it will continue to evolve. I plan to:

- Add more features to enhance the user experience.
- Integrate with a payment gateway for online payments.
- Improve performance through optimization
- Refactor the codebase for better maintainability
- Improving UI/UX
- Writing tests

---

## Installation

Follow the steps below to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/anamulhoquewd/cms.git
```

### 2. Navigate to the Project Directory

```bash
cd CMS
```

### 3. Install Dependencies

```bash
npm install
# or
yarn
```

### 4. Configure Environment Variables

Create a .env file in the root directory and add necessary variables (refer to .env.example if available).

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Hono](https://hono.dev/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodmailer](https://nodemailer.com/)
- [Node Cron](https://www.npmjs.com/package/node-cron)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Date-fns](https://date-fns.org/)
- [Axios](https://axios-http.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [React Table](https://tanstack.com/table/v8/)
- [Icons](https://lucide.dev/)

---

## Author

- **Name**: Anamul Hoque
- **Email**: [anamulhoquewd@gmail.com](mailto:anamulhoquewd@gmail.com)
- **GitHub**: [anamulhoque](https://github.com/anamulhoquewd)

---

## Contributions

Currently, this is a solo project. But if you’d like to contribute or suggest features, feel free to open an issue or a pull request.

---

**_Thank you for visiting this project and I hope you find it useful!_**
>>>>>>> master
