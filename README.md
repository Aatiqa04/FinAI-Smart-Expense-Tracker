# FinAI - Smart Expense Tracker

A modern, AI-powered expense tracking application built with React and TypeScript. Features intelligent financial analysis, spending predictions, and personalized savings recommendations powered by OpenAI.

## Features

- **Dashboard** - Visual overview of income, expenses, and net balance with interactive charts
- **Transaction Management** - Add, view, and manage income/expense entries
- **AI Insights** - Get intelligent analysis of spending patterns and savings suggestions
- **Executive Reports** - Generate detailed AI-powered financial audit reports
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **OpenAI API** - AI-powered insights and reports
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## Project Structure

```
src/
├── components/
│   ├── AIInsights.tsx        # AI financial advisor panel
│   ├── Dashboard.tsx         # Charts and spending overview
│   ├── ExpenseForm.tsx       # Add transaction form
│   ├── FormattedReport.tsx   # Markdown report renderer
│   ├── FormModal.tsx         # Modal wrapper for forms
│   ├── HealthSynopsis.tsx    # Report generation card
│   ├── MobileHeader.tsx      # Mobile navigation header
│   ├── RecentHistory.tsx     # Recent transactions list
│   ├── ReportView.tsx        # Full report display
│   ├── Sidebar.tsx           # Desktop navigation
│   ├── SidebarLink.tsx       # Navigation link component
│   ├── SummaryCard.tsx       # Summary stat cards
│   └── TransactionsView.tsx  # Full transaction ledger
├── services/
│   └── aiService.ts          # OpenAI API integration
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── formatters.ts         # Text formatting utilities
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FinAI-Smart-Expense-Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your API key in `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## AI Features

### AI Insights
Analyzes your transaction history to provide:
- Spending pattern summary
- Next month predictions
- Actionable savings suggestions
- Financial health score (0-100)

### Executive Reports
Generates detailed markdown reports including:
- Executive summary
- Spending analysis by category
- Income efficiency metrics
- Strategic recommendations

## License

MIT
