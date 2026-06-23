export interface Link {
  shortCode: string;
  originalUrl: string;
}

export interface ClickData {
  date: string;
  clickCount: number;
}

export interface UrlItem {
  originalUrl: string;
  shortCode: string | null;
  createdAt: string | null;
}

export interface UrlResponse {
  data: UrlItem[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface AnalyticalResonse {
  data: ClickData[];
}

export interface UrlListProps {
  selectedLink: UrlItem | null;
  setSelectedLink: (link: UrlItem) => void;
}

export interface AnalyticDashboardProps {
  selectedLink: UrlItem | null;
}

export interface analyticsDataProps {
  analyticsData: ClickData[];
}

