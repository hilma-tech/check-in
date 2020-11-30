export class FieldDto {
  key: number;
  name: string;
  selection: string;
  value: any;
  order: number;
  errorMessage: any;
}
export class SaveFieldDto {
  data: [
    {
      name: string;
      selection: string;
      value: [{ id: number; value: string },];
      order: number;
    },
  ];
  id: number;
}
