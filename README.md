# AlloPhoto AI - Mobile App

A complete Expo React Native mobile application for AlloPhoto AI, featuring AI-powered image processing tools with a modern dark theme and intuitive user interface.

## Features

- 🎨 **8 AI-Powered Tools**: Image enhancement, background removal, art generation, compression, format conversion, auto-adjustment, cartoonization, and colorization
- 🔐 **Authentication**: Complete auth flow with AsyncStorage persistence
- 💳 **Pricing Plans**: Free, Pro, and Max subscription tiers
- 📱 **Responsive Design**: Optimized for all mobile screen sizes
- 🌙 **Dark Theme**: Beautiful purple gradient design matching the web version
- 📸 **Image Picker**: Native file upload using Expo ImagePicker
- ⚡ **Performance**: Smooth animations and loading states

## Tech Stack

- **Expo SDK 52** with TypeScript
- **Expo Router** for navigation (tabs + stack)
- **React Native Reanimated** for animations
- **Expo Linear Gradient** for beautiful gradients
- **AsyncStorage** for data persistence
- **Axios** for API integration
- **Expo Image Picker** for file uploads
- **Lucide React Native** for icons

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on device/simulator:**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` to open in browser

## Project Structure

```
app/
├── _layout.tsx              # Root layout with auth provider
├── (tabs)/                  # Tab navigation
│   ├── _layout.tsx         # Tab bar configuration  
│   ├── index.tsx           # Home screen
│   ├── tools.tsx           # Tools grid
│   ├── pricing.tsx         # Pricing plans
│   └── profile.tsx         # User profile
├── signin.tsx              # Authentication screen
└── tool-details.tsx        # Individual tool interface

components/
├── ToolCard.tsx            # Tool card component
└── PricingCard.tsx         # Pricing plan card

contexts/
└── AuthContext.tsx         # Authentication context

data/
├── tools.ts               # Tools data and configuration
└── pricing.ts             # Pricing plans data

api/
└── index.ts               # API client and methods

utils/
└── imageUtils.ts          # Image processing utilities
```

## Key Features

### Navigation
- **Bottom Tabs**: Primary navigation between Home, Tools, Pricing, and Profile
- **Stack Navigation**: For authentication and tool detail screens
- **Deep Linking**: Support for routing between screens

### Authentication
- **Login/Logout**: Complete auth flow with form validation
- **Persistence**: User data saved with AsyncStorage
- **Protected Routes**: Profile screen requires authentication
- **Mock API**: Demo authentication (replace with real backend)

### Tools
- **8 AI Tools**: Complete set of image processing capabilities
- **File Upload**: Native image picker integration
- **Processing States**: Loading indicators and error handling
- **Results Display**: Preview processed images with download options

### Design
- **Dark Theme**: Consistent dark UI matching the web version
- **Purple Gradients**: Brand colors throughout the interface
- **Responsive Cards**: Adaptive layouts for different screen sizes
- **Smooth Animations**: Subtle transitions and hover states

## API Integration

The app is structured to work with a REST API. Update the base URL in `api/index.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-url.com',
  // ... other config
});
```

## Environment Setup

For production deployment, you'll need to configure:

1. **API URLs**: Update base URL in API configuration
2. **Authentication**: Integrate with your auth provider
3. **Image Processing**: Connect to your AI processing backend
4. **Payments**: Integrate subscription handling (recommend RevenueCat)

## Building for Production

1. **Create development build:**
   ```bash
   npx expo install --fix
   npx expo prebuild
   ```

2. **Build for app stores:**
   ```bash
   npx eas build --platform all
   ```

3. **Submit to stores:**
   ```bash
   npx eas submit
   ```

## Notes

- All screens are fully functional with demo content
- Image processing is simulated (replace with real API calls)
- Authentication uses mock data (integrate with real backend)
- Pricing subscriptions show alerts (integrate with payment provider)
- Dark theme with purple/blue gradients matches web design
- Responsive design works across all mobile screen sizes

## Support

For issues or questions about the mobile app implementation, please refer to the Expo documentation or contact the development team.