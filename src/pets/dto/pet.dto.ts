export class CreateCatDto {
  breed: string;
  age: number;
  gender: string;
  weight: number;
  description: string;
  images: string[];
  availableForAdoption: boolean;
}
