# SunglassAI - Brand Discovery Dashboard

A modern React application for discovering and managing sunglasses brands, built with TypeScript and Vite.

## 🚀 Features

- **Brand Discovery**: Browse through curated sunglasses brands (Ray-Ban, Oakley, Persol, Maui Jim, Warby Parker, Tom Ford)
- **Brand Management**: Add brands to your collection and manage them
- **Search & Filter**: Find brands quickly with built-in search functionality
- **User Authentication**: Secure login system powered by Supabase
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with custom components

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Authentication**: Supabase
- **Styling**: Custom CSS (no external UI libraries)
- **Icons**: Unicode emoji icons for simplicity

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Samantha-Durrant/sunglassai.git
   cd sunglassai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase (optional for demo):
   - Create a Supabase project
   - Update the credentials in `utils/supabase/info.tsx`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

1. **Login**: Use any email and password for demo purposes
2. **Discover Brands**: Navigate to the "Brands" tab and click "Discover Brands"
3. **Add Brands**: Click the "Add Brand" button on any brand card
4. **Manage Collection**: View your added brands in the "My Brands" tab
5. **Search**: Use the search bar to filter brands

## 📁 Project Structure

```
src/
├── App.final.tsx          # Main application component
├── main.tsx              # Application entry point
├── styles/
│   └── minimal.css       # Custom styling
└── utils/
    └── supabase/
        └── info.tsx      # Supabase configuration
```

## 🌟 Brand Data

The app includes detailed information for 6 major sunglasses brands:

- **Ray-Ban** - Classic/Fashion ($150-$300)
- **Oakley** - Performance/Sports ($100-$400)
- **Persol** - Luxury ($200-$500)
- **Maui Jim** - Luxury/Performance ($200-$400)
- **Warby Parker** - Fashion/Affordable ($95-$145)
- **Tom Ford** - Luxury/Fashion ($300-$800)

## 🚀 Deployment

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Manual Deployment

The `dist/` folder contains the built application ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Live Demo

[View Live Application](https://Samantha-Durrant.github.io/sunglassai)

---

Built with ❤️ using React and TypeScript
