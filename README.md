# WardrobeAI

### AI Powered Wardrobe Intelligence

WardrobeAI is a mobile wardrobe management application that uses multimodal AI to analyze clothing images, automatically extract garment attributes, and organize them into a searchable digital closet.

The application combines a React Native frontend with an Express backend and Gemini vision analysis to turn photos of clothing into structured wardrobe data.

---

## ✨ Features

### AI Garment Analysis

Upload a photo of a clothing item and WardrobeAI uses Gemini to identify structured attributes including:

- Category
- Material
- Dominant color
- Pattern
- Fit
- Season
- Style
- Confidence
- Tags

### Digital Closet

Automatically organize analyzed garments into a personal digital wardrobe.

Each garment can be viewed and edited after analysis, allowing users to correct or customize AI generated information.

### Wardrobe Insights

WardrobeAI analyzes the user's closet to provide insights into:

- Category distribution
- Color distribution
- Style distribution
- Seasonal coverage
- Wardrobe composition
- Wardrobe health
- Personalized recommendations

### Profile & Settings

Persistent profile and application settings allow users to customize their wardrobe experience.

---

## 🧠 How It Works

```text
                Clothing Photo
                      │
                      ▼
              React Native App
                      │
                      │ POST /analyze
                      ▼
              Express Backend
                      │
                      ▼
               Gemini Vision
                      │
                      ▼
          Structured JSON Analysis
                      │
                      ▼
             Response Validation
                      │
                      ▼
              Wardrobe Storage
                      │
              ┌───────┴────────┐
              ▼                ▼
            Closet          Insights
