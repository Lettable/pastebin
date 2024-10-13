# Zube - PasteBin Project

Zube is a simple PasteBin web application built with Next.js using MongoDB to store the data. It allows users to create and edit text snippets through a file-based routing system without authentication. Each snippet is assigned a unique ID, which can be used to retrieve or update the content.

## Features
- Create, edit, and update text content.
- Store pastes in MongoDB with a unique ID.
- Retrieve pastes using the generated ID through the URL.
- Built using Next.js with the new App Router and file-based routing.
- Styled with Tailwind CSS for a modern and responsive interface.
  
## How It Works
1. User saves a text snippet.
2. The application generates a unique `id` and redirects the user to a URL like `/paste?id=670bc10a612fb37068467120`.
3. The user can view, edit, and update the content associated with this `id`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lettable/pastebin.git
   cd pastebin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your MongoDB URI:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<appname>.<serveraddy>.mongodb.net/zube
   NODE_ENV=production
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Create a new paste by entering content into the editor and saving it.
2. The app will generate a unique `id` and redirect you to a URL in the format:

   ```
   /paste?id=<unique-id>
   ```

3. Use this URL to view, edit, or update the paste at any time.

## Technologies Used

- **Next.js**: A React framework for building web applications.
- **MongoDB**: A NoSQL database to store pastes.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Monaco Editor**: A rich code editor (optional, if used in the project).

## Folder Structure

```
.
├── src
│   ├── app
│   │   ├── api/             # API routes
│   │   ├── paste/           # Route to view and edit pastes
│   │   │   └── page.jsx     # Page to view and edit pastes
│   │   ├── layout.jsx       # Main layout for the application
│   │   └── page.jsx         # Page to create new pastes
│   └── components/
│       └── ui/              # ShadCN UI components
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## License

This project is licensed under the MIT License.
