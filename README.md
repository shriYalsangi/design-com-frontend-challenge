# hCardBuilder

hCardBuilder is a simple Vue.js application that allows users to create and download business cards (hCards) in real-time. The app features components for uploading an avatar, displaying a preview of the card, and downloading the card as a PNG image.

## Technologies Used

- **Vue.js**: JavaScript framework for building user interfaces
- **Pinia**: State management for Vue.js
- **html-to-image**: Library to convert HTML elements to images
- **Vue Toastification**: Toast notifications for user feedback
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **Vite**: Build tool and development server

## Components

- **AvatarUpload**: Handles avatar image uploads and emits the image data.
- **HCardForm**: Collects user input for the hCard, including name, address, and contact details.
- **HCardPreview**: Displays a live preview of the hCard as users fill in their information.
- **HCardDownload**: Allows users to download the generated hCard as a PNG file.

## Features

- Real-time generation of business cards
- Image upload functionality for avatars
- Downloadable hCard in PNG format
- User-friendly interface with toast notifications for feedback

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shriYalsangi/design-com-frontend-challenge.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit http://localhost:5173 to see the app in action.

## Usage

- Upload an avatar image by clicking the "Upload Avatar" button.
- Fill out the form with your business card details.
- Preview your card in real-time.
- Click the "Download hCard" button to save your card as a PNG file.

## Testing

The project includes comprehensive unit tests written with Vitest and end-to-end tests using Cypress. These tests ensure the functionality and reliability of the application.

### Running Tests

- **Unit Tests**: Run `npm run test:unit` in the project directory.
- **Cypress Tests**: Open Cypress with `npm run test:e2e:dev` and run the tests in the Cypress UI.
