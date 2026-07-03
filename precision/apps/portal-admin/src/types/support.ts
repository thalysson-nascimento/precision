export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  text: string;
  createdAt: Date | string;
}

export interface CompanyWithChat {
  id: string;
  name: string;
  address?: string;
  number?: string;
  contact?: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  subscriptionEndsAt: Date | string | null;
  supportMessages: Message[];
}
