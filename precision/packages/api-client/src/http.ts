export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    const fullUrl = `${this.baseUrl}${url}`;
    if (!params) return fullUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    return queryString ? `${fullUrl}?${queryString}` : fullUrl;
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const fullUrl = this.buildUrl(url, options?.params);
    const response = await fetch(fullUrl, {
      ...options,
      method: 'GET',
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    const fullUrl = this.buildUrl(url, options?.params);
    const response = await fetch(fullUrl, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    const fullUrl = this.buildUrl(url, options?.params);
    const response = await fetch(fullUrl, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const fullUrl = this.buildUrl(url, options?.params);
    const response = await fetch(fullUrl, {
      ...options,
      method: 'DELETE',
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      // Avoid redirect loops if we are already on the login screen or attempting to log in
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/login') &&
        !response.url.includes('/api/auth/login')
      ) {
        window.location.href = '/login';
      }
    }

    if (!response.ok) {
      let errorMessage = 'Falha na requisição HTTP';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // Fallback se a resposta não for JSON ou falhar no parser
      }
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  }
}

export const http = new HttpClient();
