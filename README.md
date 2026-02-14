# Atithi - Premium Restaurant Website

This is a Next.js project for the Atithi Family Restaurant, built and prototyped in Firebase Studio.

## Overview

The application serves as a premium, modern website for a high-end restaurant targeting families, professionals, and highway travelers. It features a sleek, dark-themed UI, animated hero sections, and AI-powered restaurant recommendations.

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React, Tailwind CSS, ShadCN UI
- **Styling**: `globals.css` with CSS variables for theming.
- **Generative AI**: Google's Gemini model via Genkit.
- **Fonts**: Google Fonts (Poppins)

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

- `src/app/`: Main application source, including pages and layouts.
- `src/components/`: Reusable React components.
  - `sections/`: Components for each major section of the landing page.
  - `ui/`: Core UI elements from ShadCN.
- `src/ai/`: Contains Genkit flows for AI-powered features.
- `src/lib/`: Utility functions and static data.
- `public/`: Static assets.
- `CHANGELOG.md`: A log of all programmatic changes made to the application.
