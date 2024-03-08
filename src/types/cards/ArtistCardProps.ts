export interface ArtistCardProps {
  id: number; // Assuming it's a string, update the type accordingly if it's different
  fullname: string;
  systemId: number;
  isDetails?: boolean;
  images: [
    {
      id: number;
      imageUrl: string;
      personId: number;
    }
  ];
  roles?: string[];
  isClaimed?: boolean;
  width?: number;
}
