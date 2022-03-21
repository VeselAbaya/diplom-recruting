export interface ICandidate {
  maxRateValue: number;
  english: string;
  workSchedule: string;
  experience: number;
  message: string;
  relation: {
    startDate: string,
    type: string
  };
}
