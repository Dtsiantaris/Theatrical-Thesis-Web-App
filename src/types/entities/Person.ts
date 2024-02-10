export interface Person {
  id: number;
  fullname: string;
  systemID: number;
  birthdate?: string;
  bio?: string;
  description?: string;
  language?: string[];
  weight?: string;
  height?: string;
  eyeColor?: string;
  hairColor?: string;
  roles?: string[];
  images: [
    {
      id: number;
      imageUrl: string;
      personId: number;
    }
  ];
  isClaimed?: boolean;
  claimingStatus: string;
}
