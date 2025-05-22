// src/types/index.ts

export interface TicketData {
  cost: number;
  quantity: number;
  maxLimit: number;
}

export interface DrawData {
  roundNumber: number;
  isLatest: boolean;
  drawDate: string;
  winningNumbers: number[];
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
}

export interface ContractInfo {
  address: string;
  nextDraw: string;
  userTickets: number;
}

export interface StepInfo {
  step: number;
  title: string;
  description: string;
}

export interface UserHistoryItem {
  roundId: bigint;
  startTime: bigint;
  endTime: bigint;
  totalAmountSpent: bigint;
  totalTicketCount: bigint;
  winningTicketCount: bigint;
}
